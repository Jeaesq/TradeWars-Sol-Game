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

## Deploy to Cloud Run / source-repo pipelines

This repo includes deployment files for both buildpack-style and Docker builds:

- `server.js` listens on `PORT` and serves static app/data assets.
- `Dockerfile` builds a production container image.
- `Procfile` declares start command for source/buildpack workflows.
- `cloudbuild.yaml` supports explicit Cloud Build Docker image creation.
- `.gcloudignore` keeps source upload smaller and cleaner.

Example source deploy:

```bash
gcloud run deploy tradewars-sol \
  --source . \
  --region us-west1 \
  --allow-unauthenticated
```

Example Docker deploy:

```bash
gcloud builds submit --config cloudbuild.yaml --substitutions _IMAGE=us-west1-docker.pkg.dev/$PROJECT_ID/tradewars-sol/tradewars-sol:manual

gcloud run deploy tradewars-sol \
  --image us-west1-docker.pkg.dev/$PROJECT_ID/tradewars-sol/tradewars-sol:manual \
  --region us-west1 \
  --allow-unauthenticated
```

If repository-connected deploys fail with
`developerconnect.gitRepositoryLinks.fetchReadToken`,
that is an IAM/Developer Connect permission issue before build starts.
