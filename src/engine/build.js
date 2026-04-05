import { claimNode } from './ownership.js';

function canAfford(player, cost) {
  return Object.entries(cost).every(([resource, amount]) => (player.resources[resource] ?? 0) >= amount);
}

function payCost(player, cost) {
  for (const [resource, amount] of Object.entries(cost)) {
    player.resources[resource] -= amount;
  }
}

export function buildAtNode(state, playerId, type, nodeId) {
  const player = state.players.find((p) => p.id === playerId);
  const cost = state.rules.build[type];
  if (!cost) throw new Error(`Unknown build type ${type}`);
  if (!canAfford(player, cost)) throw new Error('Insufficient resources');

  if (type === 'colony' || type === 'station') {
    const owner = state.ownership[nodeId];
    if (owner && owner !== playerId) throw new Error('Node is controlled by enemy');
    payCost(player, cost);
    claimNode(state, playerId, nodeId);
    state.log.push({ type: 'BUILD', playerId, buildType: type, nodeId });
    return;
  }

  if (type === 'fleet') {
    if (state.ownership[nodeId] !== playerId) throw new Error('Fleets can only be built in owned nodes');
    payCost(player, cost);
    const id = `F${state.fleets.length + 1}`;
    state.fleets.push({ id, ownerId: playerId, nodeId, attack: 2, defense: 2, movement: 2, moved: true });
    state.log.push({ type: 'BUILD', playerId, buildType: type, nodeId, fleetId: id });
    return;
  }

  throw new Error(`Unsupported build type ${type}`);
}
