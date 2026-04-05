export async function loadJsonInBrowser(absolutePath) {
  const response = await fetch(absolutePath);
  if (!response.ok) {
    throw new Error(`Failed to load ${absolutePath}: ${response.status}`);
  }
  return response.json();
}

export async function loadContentBundleInBrowser() {
  return {
    cards: await loadJsonInBrowser('/data/cards/base.cards.json'),
    map: await loadJsonInBrowser('/data/map/sol.map.json'),
    resources: await loadJsonInBrowser('/data/resources/resources.json'),
    economy: await loadJsonInBrowser('/data/rules/economy.json'),
    build: await loadJsonInBrowser('/data/rules/build_costs.json'),
    combat: await loadJsonInBrowser('/data/rules/combat.json'),
    victory: await loadJsonInBrowser('/data/rules/victory.json'),
    scenario: await loadJsonInBrowser('/data/scenarios/standard_1v1.json')
  };
}
