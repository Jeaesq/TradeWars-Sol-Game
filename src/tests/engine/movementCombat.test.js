import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleFromFs } from '../../content/loaders.js';
import { createInitialState } from '../../engine/gameState.js';
import { applyAction } from '../../engine/reducer.js';
import { resolveCombats } from '../../engine/combat.js';

test('fleet moves only in movement phase and combat resolves', () => {
  const state = createInitialState(loadContentBundleFromFs(), 2);
  applyAction(state, { type: 'END_PHASE' });
  applyAction(state, { type: 'END_PHASE' });
  applyAction(state, { type: 'MOVE_FLEET', playerId: 'P1', fleetId: 'F1', toNodeId: 'mars' });

  assert.equal(state.fleets.find((f) => f.id === 'F1').nodeId, 'mars');

  resolveCombats(state);
  assert.equal(state.fleets.length, 1);
});
