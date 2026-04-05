import { loadContentBundleInBrowser } from '../content/loaders.js';
import { validateBundle } from '../content/validators.js';
import { createInitialState, getActivePlayer, getCurrentPhase } from '../engine/gameState.js';
import { applyAction } from '../engine/reducer.js';
import { chooseBotAction } from '../bot/soloBot.js';

const SAVE_KEY = 'tradewars-sol-v1-state';

function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function restoreRng(state) {
  // deterministic fallback in UI hydration
  state.rng = (max) => Math.floor(Math.random() * max);
}

function render(root, state) {
  const player = getActivePlayer(state);
  const phase = getCurrentPhase(state);

  const nodeRows = state.map.nodes
    .map((node) => `<li>${node.id} (${node.type}) owner: ${state.ownership[node.id] ?? 'none'}</li>`)
    .join('');

  const fleetRows = state.fleets
    .map((fleet) => `<li>${fleet.id} ${fleet.ownerId} @ ${fleet.nodeId}</li>`)
    .join('');

  const handRows = player.hand
    .map((card) => `<button data-card='${card.id}' class='play-card'>Play ${card.name}</button>`)
    .join('');

  root.innerHTML = `
    <h1>Trade Wars: Sol (v1 local-first)</h1>
    <p>Round ${state.round} / ${state.maxRounds}</p>
    <p>Active Player: ${player.name} (${player.id}) | Phase: ${phase}</p>
    <p>Winner: ${state.winnerId ?? 'none'}</p>

    <h2>Resources</h2>
    <p>${state.players.map((p) => `${p.id}: ${JSON.stringify(p.resources)} VP=${p.vp}`).join(' | ')}</p>

    <h2>Map Nodes</h2>
    <ul>${nodeRows}</ul>

    <h2>Fleets</h2>
    <ul>${fleetRows}</ul>

    <h2>Actions</h2>
    <button id='end-phase'>End Phase</button>
    <button id='build-fleet'>Build Fleet (owned node)</button>
    ${handRows || '<p>No cards in hand</p>'}

    <h2>Log</h2>
    <pre>${state.log.slice(-8).map((e) => JSON.stringify(e)).join('\n')}</pre>
  `;

  root.querySelector('#end-phase')?.addEventListener('click', () => dispatch({ type: 'END_PHASE' }));
  root.querySelector('#build-fleet')?.addEventListener('click', () => {
    const ownNode = Object.entries(state.ownership).find(([, owner]) => owner === player.id)?.[0];
    if (!ownNode) return;
    dispatch({ type: 'BUILD', playerId: player.id, buildType: 'fleet', nodeId: ownNode });
  });

  root.querySelectorAll('.play-card').forEach((button) => {
    button.addEventListener('click', () => {
      dispatch({ type: 'PLAY_CARD', playerId: player.id, cardId: button.dataset.card });
    });
  });

  function dispatch(action) {
    try {
      applyAction(state, action);
      const active = getActivePlayer(state);
      if (active.isBot && !state.winnerId) {
        const botAction = chooseBotAction(state, active.id);
        applyAction(state, botAction);
      }
      saveState({ ...state, rng: undefined });
      render(root, state);
    } catch (error) {
      alert(error.message);
    }
  }
}

export async function startApp() {
  const root = document.querySelector('#app');
  const saved = loadState();
  let state;

  if (saved) {
    state = saved;
    restoreRng(state);
  } else {
    const bundle = await loadContentBundleInBrowser();
    validateBundle(bundle);
    state = createInitialState(bundle);
  }

  render(root, state);
}
