import { createRng } from './rng.js';
import { PHASES } from './phases.js';

function makeDeck(cards) {
  return cards.cards.map((card) => ({ ...card }));
}

function drawCards(player, amount) {
  for (let i = 0; i < amount; i += 1) {
    if (player.deck.length === 0 && player.discard.length > 0) {
      player.deck = player.discard.splice(0);
    }
    if (player.deck.length > 0) {
      player.hand.push(player.deck.shift());
    }
  }
}

export function createInitialState(bundle, seed = 42) {
  const players = bundle.scenario.players.map((p) => ({
    id: p.id,
    name: p.name,
    isBot: Boolean(p.bot),
    resources: { ...bundle.resources.starting },
    vp: 0,
    hand: [],
    deck: makeDeck(bundle.cards),
    discard: [],
    destroyedEnemyFleets: 0
  }));

  const fleets = bundle.scenario.startingFleets.map((fleet, index) => ({
    id: `F${index + 1}`,
    ownerId: fleet.ownerId,
    nodeId: fleet.nodeId,
    attack: fleet.attack,
    defense: fleet.defense,
    movement: fleet.movement,
    moved: false
  }));

  const ownership = Object.fromEntries(bundle.map.nodes.map((n) => [n.id, null]));
  for (const p of bundle.scenario.players) {
    ownership[p.startNode] = p.id;
  }

  const rng = createRng(seed);

  const state = {
    seed,
    rng,
    round: 1,
    maxRounds: bundle.scenario.roundLimit,
    activePlayerIndex: 0,
    phaseIndex: 0,
    players,
    map: bundle.map,
    rules: {
      economy: bundle.economy.income,
      build: bundle.build.build,
      combat: bundle.combat.combat,
      victory: bundle.victory.victory
    },
    ownership,
    routeControl: {},
    fleets,
    log: [],
    winnerId: null
  };

  for (const player of players) {
    drawCards(player, bundle.scenario.startingHandSize ?? 3);
  }

  return state;
}

export function getActivePlayer(state) {
  return state.players[state.activePlayerIndex];
}

export function getCurrentPhase(state) {
  return PHASES[state.phaseIndex];
}

export function cloneState(state) {
  return structuredClone(state);
}
