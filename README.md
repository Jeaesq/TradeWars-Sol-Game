# Trade Wars: Sol

Trade Wars: Sol is a turn-based two-player strategy game set in a colonized Solar System. Players compete for victory points by controlling colonies, stations, and trade routes, while using fleets and cards to disrupt one another.

This repository starts with:
- a concise game spec in `docs/GAME_SPEC.md`
- repo instructions for Codex in `AGENTS.md`
- modular, data-driven starter content in `data/`

## Initial design goals
- Quick playable core
- Strong solo support via a bot opponent
- Data-driven content so cards, map nodes, routes, resources, and scenarios can evolve without rewriting the UI
- Clean separation between game engine, content, and presentation

## Planned v1
- Fixed Solar System duel map
- Two-player hotseat play
- Solo play against a basic bot
- Fleets, colonies, stations, and trade routes
- Turn-based income, movement, combat, building, and scoring
- Small starter card set

## Suggested future structure
- `docs/` for rules and roadmap
- `data/` for cards, map, rules, and scenarios
- `src/engine/` for core game logic
- `src/content/` for loaders and validation
- `src/ui/` for interface components

## Next step for Codex
Codex should read `AGENTS.md` and `docs/GAME_SPEC.md`, propose an implementation plan for v1, and then scaffold a local-first web app with a pure rules engine and data-driven content loading.
