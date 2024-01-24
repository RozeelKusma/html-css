import { describe, expect, test } from 'vitest';

import { omit, pick, split } from './index';
const testObj = {
	key1: 1,
	key2: 2,
	key3: 3,
};
describe('test the utility function for objects', () => {
	test('omit() should omit given specified key from the object', () => {
		expect(omit(testObj, ['key1'])).toStrictEqual({
			key2: 2,
			key3: 3,
		});
		expect(omit(testObj, ['key1', 'key2'])).toStrictEqual({
			key3: 3,
		});
	});
	test('pick() should pick specified key from the object', () => {
		expect(pick(testObj, ['key1'])).toStrictEqual({
			key1: 1,
		});
		expect(pick(testObj, ['key1', 'key2'])).toStrictEqual({
			key1: 1,
			key2: 2,
		});
	});
	test('split() should split specified  object from specified key into array of object', () => {
		expect(split(testObj, ['key2'])).toStrictEqual([{ key2: 2 }, { key1: 1, key3: 3 }]);
		expect(split(testObj, ['key1', 'key2'])).toStrictEqual([{ key2: 2, key1: 1 }, { key3: 3 }]);
	});
});
