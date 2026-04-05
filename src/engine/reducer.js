import { getActivePlayer, getCurrentPhase } from './gameState.js';
import { moveFleet } from './movement.js';
import { buildAtNode } from './build.js';
import { playCard } from './cards.js';
import { nextPhase } from './turnEngine.js';

export function applyAction(state, action) {
  if (state.winnerId) return state;

  const player = getActivePlayer(state);
  const phase = getCurrentPhase(state);

  if (action.type === 'END_PHASE') {
    nextPhase(state);
    return state;
  }

  if (action.playerId !== player.id) {
    throw new Error('Not active player turn');
  }

  if (action.type === 'MOVE_FLEET') {
    if (phase !== 'MOVEMENT') throw new Error('Move is only allowed in movement phase');
    moveFleet(state, player.id, action.fleetId, action.toNodeId);
    return state;
  }

  if (action.type === 'BUILD') {
    if (phase !== 'BUILD') throw new Error('Build is only allowed in build phase');
    buildAtNode(state, player.id, action.buildType, action.nodeId);
    return state;
  }

  if (action.type === 'PLAY_CARD') {
    if (phase !== 'CARD') throw new Error('Card play is only allowed in card phase');
    playCard(state, player.id, action.cardId);
    return state;
  }

  throw new Error(`Unknown action ${action.type}`);
}
