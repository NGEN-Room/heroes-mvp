from copy import deepcopy

from backend.engine.core_abilities import CORE_ACTIONS
from backend.heroes.loader import load_heroes


class HeroRegistry:
    def __init__(self):
        self._heroes = load_heroes()

    @property
    def heroes(self):
        return self._heroes

    def list_heroes(self):
        return [
            {"id": hero["id"], "name": hero["name"], "characterName": hero["character"]["name"]}
            for hero in self._heroes.values()
        ]

    def get_hero(self, hero_id):
        if hero_id not in self._heroes:
            raise KeyError(f"Unknown hero '{hero_id}'")

        hero = deepcopy(self._heroes[hero_id])
        hero["actions"] = [deepcopy(ability) for ability in CORE_ACTIONS] + [deepcopy(ability) for ability in hero.get("actions", [])]
        hero["spells"] = [deepcopy(ability) for ability in hero.get("spells", [])]
        return hero

    def get_ability(self, hero_id, ability_id):
        hero = self.get_hero(hero_id)
        for ability in [*hero["actions"], *hero["spells"]]:
            if ability["id"] == ability_id:
                return ability
        raise KeyError(f"Unknown ability '{ability_id}' for hero '{hero_id}'")
