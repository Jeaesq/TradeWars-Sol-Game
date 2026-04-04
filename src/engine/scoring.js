export function scorePlayer(state, playerId) {
  const player = state.players.find((p) => p.id === playerId);
  const victory = state.rules.victory;

  const nodesControlled = Object.values(state.ownership).filter((owner) => owner === playerId).length;
  const routesControlled = Object.values(state.routeControl).filter((owner) => owner === playerId).length;

  player.vp =
    nodesControlled * victory.vpPerNode +
    routesControlled * victory.vpPerTradeRoute +
    player.destroyedEnemyFleets * victory.vpPerDestroyedFleet;

  if (player.vp >= victory.vpToWin) {
    state.winnerId = playerId;
  }
}

export function scoreAllPlayers(state) {
  for (const player of state.players) {
    scorePlayer(state, player.id);
  }
}
