import { expect, test } from 'vitest';

import { pathToUrl } from './router';

test('pathToUrl()', () => {
	expect(pathToUrl('/api/path1/:id?')).toBe('/api/path1');
	expect(pathToUrl('/api/path2/:id', { id: 5 })).toBe('/api/path2/5');
});
