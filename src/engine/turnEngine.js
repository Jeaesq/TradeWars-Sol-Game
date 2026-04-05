import { PHASES } from './phases.js';
import { drawOne } from './cards.js';
import { collectIncome } from './economy.js';
import { resolveCombats } from './combat.js';
import { recomputeRouteControl } from './ownership.js';
import { scoreAllPlayers } from './scoring.js';
import { getActivePlayer } from './gameState.js';
import { resetFleetMovement } from './movement.js';

export function runPhaseStart(state) {
  const player = getActivePlayer(state);
  const phase = PHASES[state.phaseIndex];

  if (phase === 'DRAW') drawOne(player);
  if (phase === 'INCOME') collectIncome(state, player.id);
  if (phase === 'COMBAT') resolveCombats(state);
  if (phase === 'SCORING') {
    recomputeRouteControl(state);
    scoreAllPlayers(state);
  }
}

export function nextPhase(state) {
  state.phaseIndex += 1;
  if (state.phaseIndex >= PHASES.length) {
    state.phaseIndex = 0;
    state.activePlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    if (state.activePlayerIndex === 0) state.round += 1;
    resetFleetMovement(state, state.players[state.activePlayerIndex].id);
  }

  if (state.round > state.maxRounds && !state.winnerId) {
    const sorted = [...state.players].sort((a, b) => b.vp - a.vp);
    state.winnerId = sorted[0].id;
  }

  runPhaseStart(state);
}
