import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleFromFs } from '../../content/loaders.node.js';
import { createInitialState } from '../../engine/gameState.js';
import { chooseBotAction } from '../../bot/soloBot.js';

test('bot returns actionable command', () => {
  const state = createInitialState(loadContentBundleFromFs(), 4);
  state.activePlayerIndex = 1;
  state.phaseIndex = 2;
  const action = chooseBotAction(state, 'P2');
  assert.ok(action.type);
});
