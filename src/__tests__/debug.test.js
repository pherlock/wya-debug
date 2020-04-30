import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Debug from '..';

describe('Debug', () => {
	let vm;
	it('basic', () => {
		expect(typeof Debug).to.equal('object');

		vm = createComponent(Debug, {});
		expect(typeof vm).to.equal('object');
	});
});
