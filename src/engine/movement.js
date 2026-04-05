function isAdjacent(map, from, to) {
  return map.routes.some(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
}

export function moveFleet(state, playerId, fleetId, toNodeId) {
  const fleet = state.fleets.find((f) => f.id === fleetId && f.ownerId === playerId);
  if (!fleet) throw new Error('Fleet not found');
  if (fleet.moved) throw new Error('Fleet already moved this turn');
  if (!isAdjacent(state.map, fleet.nodeId, toNodeId)) throw new Error('Destination is not adjacent');
  fleet.nodeId = toNodeId;
  fleet.moved = true;
  state.log.push({ type: 'MOVE', playerId, fleetId, toNodeId });
}

export function resetFleetMovement(state, playerId) {
  for (const fleet of state.fleets) {
    if (fleet.ownerId === playerId) fleet.moved = false;
  }
}
