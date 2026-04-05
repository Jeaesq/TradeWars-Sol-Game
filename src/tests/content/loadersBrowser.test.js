import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleInBrowser } from '../../content/loaders.browser.js';

test('browser bundle loader uses absolute /data paths', async () => {
  const seen = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    seen.push(url);
    return {
      ok: true,
      async json() {
        if (String(url).includes('base.cards')) return { cards: [] };
        if (String(url).includes('sol.map')) return { nodes: [], routes: [] };
        if (String(url).includes('resources')) return { resources: [], starting: {} };
        if (String(url).includes('economy')) return { income: {} };
        if (String(url).includes('build_costs')) return { build: {} };
        if (String(url).includes('combat')) return { combat: {} };
        if (String(url).includes('victory')) return { victory: {} };
        if (String(url).includes('standard_1v1')) return { players: [], startingFleets: [] };
        return {};
      }
    };
  };

  await loadContentBundleInBrowser();

  globalThis.fetch = originalFetch;

  assert.equal(seen.length, 8);
  for (const path of seen) {
    assert.equal(String(path).startsWith('/data/'), true);
  }
});
