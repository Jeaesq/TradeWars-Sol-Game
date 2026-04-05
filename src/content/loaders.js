import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

export function loadJsonFromFile(relativePath) {
  const fullPath = path.resolve(repoRoot, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw);
}

export async function loadJsonInBrowser(relativePath) {
  const response = await fetch(relativePath);
  if (!response.ok) {
    throw new Error(`Failed to load ${relativePath}: ${response.status}`);
  }
  return response.json();
}

export function loadContentBundleFromFs() {
  return {
    cards: loadJsonFromFile('data/cards/base.cards.json'),
    map: loadJsonFromFile('data/map/sol.map.json'),
    resources: loadJsonFromFile('data/resources/resources.json'),
    economy: loadJsonFromFile('data/rules/economy.json'),
    build: loadJsonFromFile('data/rules/build_costs.json'),
    combat: loadJsonFromFile('data/rules/combat.json'),
    victory: loadJsonFromFile('data/rules/victory.json'),
    scenario: loadJsonFromFile('data/scenarios/standard_1v1.json')
  };
}

export async function loadContentBundleInBrowser() {
  return {
    cards: await loadJsonInBrowser('./data/cards/base.cards.json'),
    map: await loadJsonInBrowser('./data/map/sol.map.json'),
    resources: await loadJsonInBrowser('./data/resources/resources.json'),
    economy: await loadJsonInBrowser('./data/rules/economy.json'),
    build: await loadJsonInBrowser('./data/rules/build_costs.json'),
    combat: await loadJsonInBrowser('./data/rules/combat.json'),
    victory: await loadJsonInBrowser('./data/rules/victory.json'),
    scenario: await loadJsonInBrowser('./data/scenarios/standard_1v1.json')
  };
}
