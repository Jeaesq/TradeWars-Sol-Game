function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateBundle(bundle) {
  assert(Array.isArray(bundle.map?.nodes), 'Map nodes must be an array');
  assert(Array.isArray(bundle.map?.routes), 'Map routes must be an array');
  assert(Array.isArray(bundle.cards?.cards), 'Cards must be an array');
  assert(Array.isArray(bundle.resources?.resources), 'Resources list must be an array');
  assert(bundle.economy?.income, 'Economy rules missing income block');
  assert(bundle.build?.build, 'Build rules missing build block');
  assert(bundle.combat?.combat, 'Combat rules missing combat block');
  assert(bundle.victory?.victory, 'Victory rules missing victory block');
  assert(Array.isArray(bundle.scenario?.players), 'Scenario players must be an array');
  assert(Array.isArray(bundle.scenario?.startingFleets), 'Scenario fleets must be an array');

  const nodeIds = new Set(bundle.map.nodes.map((node) => node.id));
  for (const route of bundle.map.routes) {
    assert(nodeIds.has(route.from), `Unknown route.from node: ${route.from}`);
    assert(nodeIds.has(route.to), `Unknown route.to node: ${route.to}`);
  }
}
