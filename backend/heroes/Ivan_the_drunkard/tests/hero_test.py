import hero.py
def hero_has_name():
    assert hero.HERO["name"] != ""

def hero_has_health():
    assert hero.HERO['hp'] > 0

def drunkard_drunk():
    assert hero.HERO['drunkness'] == 'drunk'