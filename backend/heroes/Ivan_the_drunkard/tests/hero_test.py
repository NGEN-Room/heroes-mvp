from backend.heroes.Ivan_the_drunkard.hero import HERO

def test_hero_has_name():
    assert HERO["name"] != ""

def test_hero_has_health():
    assert HERO['hp'] > 0

def test_drunkard_drunk():
    assert HERO['drunkness'] == 'drunk'