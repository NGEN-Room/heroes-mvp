from backend.heroes.fwaming_dwagon.hero import HERO

def test_hero_has_name():
    assert HERO["name"] != ""

def has_health():
    assert HERO["hp"] <= 1


