function resolvePair(state, attacker, defender) {
  const bonusMax = state.rules.combat.randomBonusMax + 1;
  const attackerPower = attacker.attack + state.rng(bonusMax);
  const defenderPower = defender.defense + state.rules.combat.defenderAdvantage + state.rng(bonusMax);

  if (attackerPower > defenderPower) {
    state.fleets = state.fleets.filter((f) => f.id !== defender.id);
    const winner = state.players.find((p) => p.id === attacker.ownerId);
    winner.destroyedEnemyFleets += 1;
    state.log.push({ type: 'COMBAT', winnerId: attacker.ownerId, loserFleetId: defender.id, nodeId: attacker.nodeId });
    return;
  }

  state.fleets = state.fleets.filter((f) => f.id !== attacker.id);
  const winner = state.players.find((p) => p.id === defender.ownerId);
  winner.destroyedEnemyFleets += 1;
  state.log.push({ type: 'COMBAT', winnerId: defender.ownerId, loserFleetId: attacker.id, nodeId: defender.nodeId });
}

export function resolveCombats(state) {
  const byNode = new Map();
  for (const fleet of state.fleets) {
    const list = byNode.get(fleet.nodeId) ?? [];
    list.push(fleet);
    byNode.set(fleet.nodeId, list);
  }

  for (const [, fleets] of byNode.entries()) {
    const owners = [...new Set(fleets.map((f) => f.ownerId))];
    if (owners.length < 2) continue;

    const [ownerA, ownerB] = owners;
    const fleetA = fleets.find((f) => f.ownerId === ownerA);
    const fleetB = fleets.find((f) => f.ownerId === ownerB);
    if (fleetA && fleetB) resolvePair(state, fleetA, fleetB);
  }
}
