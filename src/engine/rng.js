export function createRng(seed = 123456789) {
  let state = seed >>> 0;
  return function nextInt(maxExclusive) {
    state = (1664525 * state + 1013904223) >>> 0;
    return state % maxExclusive;
  };
}
