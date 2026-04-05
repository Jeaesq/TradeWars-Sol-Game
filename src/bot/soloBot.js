import { getCurrentPhase } from '../engine/gameState.js';

function findOwnedFleet(state, playerId) {
  return state.fleets.find((f) => f.ownerId === playerId && !f.moved);
}

function findAdjacentUnownedNode(state, fromNode) {
  const adjacent = state.map.routes
    .filter((r) => r.from === fromNode || r.to === fromNode)
    .map((r) => (r.from === fromNode ? r.to : r.from));

  return adjacent.find((nodeId) => !state.ownership[nodeId]);
}

export function chooseBotAction(state, playerId) {
  const phase = getCurrentPhase(state);
  const player = state.players.find((p) => p.id === playerId);

  if (phase === 'MOVEMENT') {
    const fleet = findOwnedFleet(state, playerId);
    if (fleet) {
      const target = findAdjacentUnownedNode(state, fleet.nodeId);
      if (target) {
        return { type: 'MOVE_FLEET', playerId, fleetId: fleet.id, toNodeId: target };
      }
    }
  }

  if (phase === 'BUILD') {
    const ownNode = Object.entries(state.ownership).find(([, owner]) => owner === playerId)?.[0];
    if (ownNode && player.resources.credits >= (state.rules.build.fleet.credits ?? 999)) {
      return { type: 'BUILD', playerId, buildType: 'fleet', nodeId: ownNode };
    }
  }

  if (phase === 'CARD' && player.hand.length > 0) {
    return { type: 'PLAY_CARD', playerId, cardId: player.hand[0].id };
  }

  return { type: 'END_PHASE' };
}
