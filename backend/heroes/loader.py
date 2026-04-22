from importlib import import_module
from pkgutil import iter_modules

import backend.heroes.big_Tom


def load_heroes():
    heroes = {}

    for module_info in iter_modules(backend.heroes.big_Tom.__path__):
        if not module_info.ispkg or module_info.name == "loader":
            continue

        hero_module = import_module(f"backend.heroes.{module_info.name}.hero")
        hero = getattr(hero_module, "HERO")
        heroes[hero["id"]] = hero

    return heroes
