from backend.heroes.magic_man.actions import ACTIONS
from backend.heroes.magic_man.spells import SPELLS

HERO = {
    'id': 'Drunkard',
    'name': 'Ivan the drunkard',
    'drunkness': 'drunk',
    'character': {
        'name': 'Ivan Sakrad',
        'age': 36,
        'class': {'className': 'Drunk_Monk'},
        'baseStats': {'hp': 85, 'mp': 12, 'ap':30},
        'rawStats': {'brawn': 11, 'brain': 4, 'speed': 7},
    },
    'actions': ACTIONS,
    'spells': SPELLS

}