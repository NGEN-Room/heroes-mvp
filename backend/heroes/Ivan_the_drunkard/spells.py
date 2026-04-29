def sober_up():
    'drunkness' == 'sober'
    #drunkard sobers up


SPELLS = [
        {"id": "sober_up",
        "name": "sober up",
        "mpCost": 2,
        "speed": 4,
        "range": 'self',
        "kind": "action",
        "effect": sober_up}
        
]