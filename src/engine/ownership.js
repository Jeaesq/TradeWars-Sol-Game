export function claimNode(state, playerId, nodeId) {
  state.ownership[nodeId] = playerId;
}

export function recomputeRouteControl(state) {
  state.routeControl = {};
  for (const route of state.map.routes) {
    const left = state.ownership[route.from];
    const right = state.ownership[route.to];
    const key = `${route.from}->${route.to}`;
    if (left && left === right) {
      state.routeControl[key] = left;
      continue;
    }

    const fleetsOnFrom = state.fleets.filter((f) => f.nodeId === route.from);
    const fleetsOnTo = state.fleets.filter((f) => f.nodeId === route.to);
    const owners = new Set([...fleetsOnFrom, ...fleetsOnTo].map((f) => f.ownerId));
    if (owners.size === 1) {
      state.routeControl[key] = [...owners][0];
    } else {
      state.routeControl[key] = null;
    }
  }
}
