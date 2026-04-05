import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleFromFs } from '../../content/loaders.node.js';
import { createInitialState, getCurrentPhase } from '../../engine/gameState.js';
import { runPhaseStart, nextPhase } from '../../engine/turnEngine.js';

test('phase advancement cycles through turn order', () => {
  const state = createInitialState(loadContentBundleFromFs(), 1);
  runPhaseStart(state);
  const initialPlayer = state.players[state.activePlayerIndex].id;
  for (let i = 0; i < 8; i += 1) {
    nextPhase(state);
  }
  assert.notEqual(state.players[state.activePlayerIndex].id, initialPlayer);
  assert.equal(getCurrentPhase(state), 'DRAW');
});
