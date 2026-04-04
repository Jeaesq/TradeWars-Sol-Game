# Trade Wars: Sol

Trade Wars: Sol is a turn-based two-player strategy game set in a colonized Solar System. This repository now includes a local-first, data-driven v1 scaffold with a pure rules engine and browser UI.

## v1 architecture

- `data/`: cards, resources, map, rules, scenarios (JSON)
- `src/content/`: loaders + validators for content files
- `src/engine/`: deterministic game systems (turns, movement, combat, economy, build, cards, scoring)
- `src/bot/`: solo bot heuristic action selector
- `src/ui/`: local-first browser app with autosave
- `src/tests/`: content/engine/bot tests

## Run locally

```bash
npm test
npm run start
# then open http://localhost:4173
```

## Current status

Implemented v1 systems:
- Game state model
- Turn engine and phase enforcement
- Movement and combat
- Ownership and trade routes
- Income and build rules
- Card play flow
- Solo bot opponent
- Basic map/action UI with local save
