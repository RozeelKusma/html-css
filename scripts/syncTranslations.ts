/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as fs from 'fs';
import { join } from 'path';
import prettier from 'prettier';
import english from '../public/locales/en/translation.json';
import { traverseTranslations } from './traverseTranslations';
import { get, set } from '../src/utilities/object-utils';

const paths = traverseTranslations();

export interface IHash {
	[locale: string]: number;
}

const missingKeys: IHash = {};

fs.readdirSync(join(__dirname, '../public/locales')).forEach((locale) => {
	if (locale === 'en') {
		return;
	}
	const filename = join(__dirname, '../public/locales', locale, 'translation.json');

	let data: any;

	try {
		data = JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
	} catch (err: any) {
		throw new Error(`${locale}: ${err.message}`);
	}

	paths.forEach((p) => {
		if (get(data, p, undefined) === undefined) {
			set(data, p, get(english, p, undefined));
		}
	});

	fs.writeFileSync(
		filename,
		prettier.format(JSON.stringify(data), {
			parser: 'json',
		}),
	);
});

console.log('NEW TRANSLATIONS REQUIRED:');
console.log(missingKeys);
