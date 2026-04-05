# Trade Wars: Sol

Trade Wars: Sol is a turn-based two-player strategy game set in a colonized Solar System. This repository includes a local-first, data-driven v1 scaffold with a pure rules engine and browser UI.

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
npm start
# then open http://localhost:8080
```

## Deploy to Google Cloud Run

This repository now includes Cloud Run-ready defaults:
- `server.js` listens on `PORT` and serves static app/data assets.
- `Dockerfile` builds a production image.

Example deploy (Dockerfile path):

```bash
gcloud run deploy tradewars-sol \
  --source . \
  --region us-west1 \
  --allow-unauthenticated
```

If you deploy from a connected repository and see:
`developerconnect.gitRepositoryLinks.fetchReadToken` permission denied,
that is an IAM/Developer Connect configuration issue before build steps run.
Grant the calling service account permission on the Developer Connect repository link/connection and rerun.

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
