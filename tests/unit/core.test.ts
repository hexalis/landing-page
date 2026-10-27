import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localizedPath } from '../../src/lib/routes.ts';
test('localized paths keep default unprefixed and trailing slashes', () => {
  assert.equal(localizedPath('es'), '/'); assert.equal(localizedPath('en'), '/en/');
  assert.equal(localizedPath('en', '/equipo/'), '/en/equipo/');
});
