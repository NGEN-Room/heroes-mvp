# Heroes Banquet

This project is now split into:

- `src/`: a Next.js frontend
- `backend/`: a Python backend that owns match state, turn resolution, and hero loading

The frontend no longer imports the battle engine directly. It talks to the Python server over HTTP.

## Backend Layout

The backend is now designed so students do not need to edit one shared server file.

```text
backend/
  engine/
    combat.py
    context.py
    core_abilities.py
    match.py
    modifiers.py
    positioning.py
    registry.py
    resources.py
    serialization.py
    server.py
    status.py
  heroes/
    loader.py
    thorn/
      hero.py
      actions.py
      spells.py
    kaia/
      hero.py
      actions.py
      spells.py
    ...
```

## Adding A New Hero

Create a new folder in `backend/heroes/` and add:

- `hero.py`
- `actions.py`
- `spells.py`

Each hero exports one `HERO` dictionary from `hero.py`.
The loader in `backend/heroes/loader.py` discovers hero folders automatically.

Students should focus on:

- hero stats
- actions
- spells
- hero-specific ability logic

Shared systems should stay in `backend/engine/`.
That means if you later add mechanics like money, cooldowns, queue swapping, age effects, or time manipulation, those can be built once in the engine and then reused by any student hero.

## Run It

Open two terminals in `/Users/piha/development/heroes-mvp`.

Terminal 1:

```bash
python3 backend/server.py
```

Terminal 2:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The frontend expects the backend at `http://127.0.0.1:8000` by default.
If you want a different backend URL, set:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## API

The Python backend exposes:

- `GET /api/health`
- `GET /api/heroes`
- `POST /api/matches`
- `POST /api/matches/:matchId/round`

## Notes

- Match state is currently stored in memory in the Python process.
- The original JavaScript engine files are still in the repo for reference, but the app now runs against the Python backend.
