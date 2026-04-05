import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleFromFs } from '../../content/loaders.js';
import { createInitialState } from '../../engine/gameState.js';
import { collectIncome } from '../../engine/economy.js';
import { buildAtNode } from '../../engine/build.js';
import { playCard } from '../../engine/cards.js';

test('income, build, and card systems update resources', () => {
  const state = createInitialState(loadContentBundleFromFs(), 3);
  const p1 = state.players.find((p) => p.id === 'P1');
  const before = p1.resources.credits;
  collectIncome(state, 'P1');
  assert.ok(p1.resources.credits > before);

  p1.resources.credits = 20;
  p1.resources.metal = 10;
  buildAtNode(state, 'P1', 'fleet', 'earth');
  assert.equal(state.fleets.some((f) => f.ownerId === 'P1' && f.id !== 'F1'), true);

  p1.hand.push({ id: 'market_boom', effect: { bonus_income: 3 } });
  const creditsBeforeCard = p1.resources.credits;
  playCard(state, 'P1', 'market_boom');
  assert.equal(p1.resources.credits, creditsBeforeCard + 3);
});
