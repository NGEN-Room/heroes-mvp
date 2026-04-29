
def stumble(owner, state):
    if 'drunkness' == 'sober':
        ()
    ##talk too Pe Ha
    #drunkard stumbles through attack RNG
    #(higher chance pending on drunkness)
    #check on the que, if there is an attack on Hp percent to hit
    owner 

 
def swig(owner, state):
    state['logs'].append(f'{owner['character']['name']} is drinking') 
    if 'drunkness' == 'drunk':
        'drunkness' == 'drunk LV2'
        owner['hp'] += 10
        state['logs'].append(f'{['character']['name']} is drunk')
    elif 'drunkness' == 'drunk LV2':
        'drunkness' == 'drunk LV3'
        owner['hp'] += 5
        state['logs'].append(f'{['character']['name']} is waisted')   
    elif 'drunkness' == 'drunk LV3':
        'drunkness' == 'sober'
        owner('hp') -= 5 
        state['logs'].append(f'{['character']['name']} threw up')   
    else:
        'drunkness' == 'drunk'
        owner['hp'] += 15 
        state['logs'].append(f'{['character']['name']} is tipsy')
    #takes a swig of whiskey, drunkard get's drunk and heals slightly(less hp recovery pending drunkness)
    # (if swig used too many times before sober_up monk throws up taking damage)

def drunk_barrage(owner, target, state):
    state['logs'].append(f'{['character']['name']} used drunk barrage')
    if 'drunkness' == 'sober':
        for num in range(6):
         state['logs'].append(f'{['character']['name']} drunk barrage hit')
         target -= 7
        else:
            state['logs'].append(f'{['character']['name']} drunk barrage missed')    
    elif 'drunkness' == 'drunk':
        for num in range(1, 6):
          state['logs'].append(f'{['character']['name']} drunk barrage hit')
          target -= 7
        else:
            state['logs'].append(f'{['character']['name']} drunk barrage missed')
    elif 'drunkness' == 'drunk LV2':
        for num in range(2, 6):
          state['logs'].append(f'{['character']['name']} drunk barrage hit')
          target -= 7
        else:
            state['logs'].append(f'{['character']['name']} drunk barrage missed')
    elif 'drunkness' == 'drunk LV2':
        for num in range(3, 6):
          state['logs'].append(f'{['character']['name']} drunk barrage hit')
          target -= 7
        else:
            state['logs'].append(f'{['character']['name']} drunk barrage missed')          
    #drunkard punches between one and five times damage RNG
    #higher chance for both pending on drunkness

def zoom_punch(owner, target, state):
    state['logs'].append(f'{['character']['name']} used zoom punch')
    if 'drunkness' == 'sober':
        for num in range(1, 2):
            if num == 1:
                state['logs'].append(f'{['character']['name']} zoom punch hit')
                target -= 10
    elif 'drunkness'== 'drunk':
        for num in range(1, 5):
            if num == 1 or num == 2:
                state['logs'].append(f'{['character']['name']} zoom punch hit')
                target -= 10
            else:
                state['logs'].append(f'{['character']['name']} zoom punch missed')
    elif 'drunkness' == 'drunk LV2':
        for num in range(1, 13):
            if num == 1 or num == 2 or num == 3:
                state['logs'].append(f'{['character']['name']} zoom punch hit')
                target -= 10
            else:
                state['logs'].append(f'{['character']['name']} zoom punch missed')
    elif 'drunkness' == 'drunk LV3':
        for num in range(1, 11):
            if num == 1:
                state['logs'].append(f'{['character']['name']} zoom punch hit')
                target -= 10
            else:
                state['logs'].append(f'{['character']['name']} zoom punch missed')                   
    #drunkard punches far ahead
    #chance to miss increases on drunkness


ACTIONS = [
    {
      "id": "stumble",
        "name": "stumble",
        "cost": 4,
        "speed": 2,
        "range": 'self',
        "kind": "action",
        "effect": stumble,  
    },
    {
        "id": "swig",
        "name": "swig'oh'mead",
        "cost": 0,
        "speed": 2,
        "range": 'self',
        "kind": "action",
        "effect": swig,
    },
    {
        "id": "drunk_barrage",
        "name": "drunk barrage",
        "cost": 5,
        "speed": 1,
        "range": 1,
        "kind": "action",
        "effect": drunk_barrage,
    },
    {"id": "zoom_punch",
        "name": "zoom punch",
        "cost": 5,
        "speed": 1,
        "range": 3,
        "kind": "action",
        "effect": zoom_punch,}
]

