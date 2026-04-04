# AGENTS.md – Repository Instructions for Codex

## Project Overview
This repository contains Trade Wars: Sol, a turn-based strategy game with a data-driven design. The goal is to keep the game engine generic and define game content (cards, resources, map, routes, scenarios) in external data files.

## Architecture Principles
1. Separate game engine logic from UI.
2. Keep game content in JSON or YAML files under /data.
3. Avoid hardcoding card definitions, map nodes, or resources in UI code.
4. The engine should load content from data files at runtime.
5. Prefer deterministic game logic for testing.
6. Write tests for core rules and scoring.

## Suggested Repository Structure
- docs/ – game rules and design docs
- data/ – cards, resources, map, rules, scenarios
- src/engine/ – core game logic
- src/content/ – loaders and validators
- src/ui/ – interface
- src/bot/ – AI player

## Development Guidelines
- For major features, propose a plan before implementing.
- Do not refactor unrelated files.
- Keep functions small and testable.
- Favor pure functions in the game engine.
- The UI should call the engine, not contain game logic.

## v1 Goal
Implement a playable two-player game with:
- Map
- Fleets
- Ownership
- Trade routes
- Income
- Building
- Cards
- Solo bot

Focus on playability first, then expand systems later.
