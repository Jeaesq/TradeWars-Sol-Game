export function collectIncome(state, playerId) {
  const player = state.players.find((p) => p.id === playerId);
  const incomeRules = state.rules.economy;
  let income = incomeRules.base;

  for (const [nodeId, ownerId] of Object.entries(state.ownership)) {
    if (ownerId !== playerId) continue;
    const node = state.map.nodes.find((n) => n.id === nodeId);
    income += incomeRules.nodeType[node.type] ?? 0;
  }

  for (const ownerId of Object.values(state.routeControl)) {
    if (ownerId === playerId) income += incomeRules.tradeRoute;
  }

  player.resources.credits += income;
  state.log.push({ type: 'INCOME', playerId, amount: income });
  return income;
}
