import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContentBundleFromFs } from '../../content/loaders.js';
import { validateBundle } from '../../content/validators.js';

test('content bundle validates', () => {
  const bundle = loadContentBundleFromFs();
  assert.doesNotThrow(() => validateBundle(bundle));
});
