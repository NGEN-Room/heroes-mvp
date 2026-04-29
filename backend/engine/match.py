import uuid
from copy import deepcopy
import inspect

from backend.engine.combat import battle_log, deal_damage
from backend.engine.context import AbilityContext
from backend.engine.modifiers import apply_modifiers
from backend.engine.positioning import GRID_LIMITS, within_range
from backend.engine.resources import regenerate_resources
from backend.engine.serialization import serialize_match
from backend.engine.status import is_stunned, resolve_statuses


class MatchService:
    def __init__(self, registry):
        self.registry = registry
        self.matches = {}

    def create_match(self, player1_hero_id, player2_hero_id):
        self.registry.get_hero(player1_hero_id)
        self.registry.get_hero(player2_hero_id)

        match_id = str(uuid.uuid4())
        state = {
            "id": match_id,
            "player1": self._spawn_character(player1_hero_id, GRID_LIMITS["min"]),
            "player2": self._spawn_character(player2_hero_id, GRID_LIMITS["max"]),
            "round": 1,
            "history": [],
            "logs": [],
            "flavour": [],
            "grid": deepcopy(GRID_LIMITS),
        }
        self.matches[match_id] = state
        return state

    def get_match(self, match_id):
        return self.matches.get(match_id)

    def check_winner(self, state):
        player1 = state["player1"]
        player2 = state["player2"]
        if player1["hp"] <= 0 and player2["hp"] <= 0:
            return "Draw"
        if player1["hp"] <= 0:
            return player2["character"]["name"]
        if player2["hp"] <= 0:
            return player1["character"]["name"]
        return None

    def queue_and_run_round(self, match_id, player1_queue, player2_queue):
        state = self.get_match(match_id)
        if not state:
            raise KeyError("Match not found")

        for ability_id in player1_queue:
            self.registry.get_ability(state["player1"]["heroId"], ability_id)
        for ability_id in player2_queue:
            self.registry.get_ability(state["player2"]["heroId"], ability_id)

        state["player1"]["queue"] = list(player1_queue)
        state["player2"]["queue"] = list(player2_queue)
        self.run_round(state)
        return state

    def run_round(self, state):
        player1 = state["player1"]
        player2 = state["player2"]
        player1["state"] = state
        player2["state"] = state

        resolve_statuses(player1)
        resolve_statuses(player2)

        combined = []
        max_length = max(len(player1["queue"]), len(player2["queue"]))
        for index in range(max_length):
            if index < len(player1["queue"]):
                ability_id = player1["queue"][index]
                combined.append(
                    {"owner": player1, "target": player2, "ability": self.registry.get_ability(player1["heroId"], ability_id)}
                )
            if index < len(player2["queue"]):
                ability_id = player2["queue"][index]
                combined.append(
                    {"owner": player2, "target": player1, "ability": self.registry.get_ability(player2["heroId"], ability_id)}
                )

        combined.sort(key=lambda item: item["owner"]["modifiedStats"]["speed"] + item["ability"].get("speed", 0), reverse=True)

        for item in combined:
            owner = item["owner"]
            target = item["target"]
            ability = item["ability"]
            ability_name = ability["name"]
            ap_cost = ability.get("apCost", ability.get("cost", 0))
            mp_cost = ability.get("mpCost", 0)

            if is_stunned(owner):
                battle_log(state, f"{owner['character']['name']} is stunned and cannot use {ability_name}.")
                continue

            if not within_range(ability, owner, target):
                battle_log(state, f"{owner['character']['name']}'s {ability_name} fails - target out of range.")
                continue

            if owner["ap"] < ap_cost or owner["mp"] < mp_cost:
                battle_log(state, f"{owner['character']['name']} cannot afford {ability_name}.")
                continue

            previous_hp = target["hp"]
            previous_shield = target.get("shield", 0)

            owner["ap"] -= ap_cost
            owner["mp"] -= mp_cost

            effect = ability.get("effect")
            if callable(effect):
                self._run_effect(effect, state, owner, target)

            hp_loss = max(0, previous_hp - target["hp"])
            shield_loss = max(0, previous_shield - target.get("shield", 0))
            damage_done = hp_loss + shield_loss

            alignment = ability.get("alignment")
            if damage_done > 0 and alignment and alignment in owner["modifiedStats"]:
                boost = owner["modifiedStats"][alignment]
                if boost > 0:
                    alignment_result = deal_damage(target, boost, state, ability_name)
                    damage_done += alignment_result["hp"] + alignment_result["shield"]

            if damage_done > 0:
                battle_log(state, f"{owner['character']['name']} uses {ability_name} for {damage_done} dmg")
            else:
                battle_log(state, f"{owner['character']['name']} uses {ability_name}")

        regenerate_resources(player1)
        regenerate_resources(player2)
        player1["queue"] = []
        player2["queue"] = []
        state["history"].append([entry for entry in state["logs"]])
        state["round"] += 1

        winner = self.check_winner(state)
        if winner:
            battle_log(state, f"{winner} wins the match!")

        return winner

    def serialize(self, state):
        winner = self.check_winner(state)
        hero_lookup = {hero_id: self.registry.get_hero(hero_id) for hero_id in self.registry.heroes}
        return serialize_match(state, hero_lookup, winner)

    def _spawn_character(self, hero_id, starting_position):
        hero = self.registry.get_hero(hero_id)
        modified_template = apply_modifiers(hero["character"])
        return {
            "heroId": hero_id,
            "character": deepcopy(hero["character"]),
            "modifiedStats": modified_template["modifiedStats"],
            "hp": modified_template["modifiedStats"]["hp"],
            "mp": modified_template["modifiedStats"]["mp"],
            "ap": modified_template["modifiedStats"]["ap"],
            "position": starting_position,
            "status": [],
            "shield": 0,
            "queue": [],
        }

    def _run_effect(self, effect, state, owner, target):
        ctx = AbilityContext(state)

        try:
            param_count = len(inspect.signature(effect).parameters)
        except (TypeError, ValueError):
            param_count = 3

        if param_count >= 4:
            effect(ctx, owner, target, state)
            return

        if param_count == 3:
            params = list(inspect.signature(effect).parameters)
            first_name = params[0].lower()
            if first_name == "ctx":
                effect(ctx, owner, target)
            else:
                effect(owner, target, state)
            return

        if param_count == 2:
            effect(owner, target)
            return

        if param_count == 1:
            effect(owner)
            return

        effect()
