import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setUcastnici, registrovatUcastnika} from '../src/ucastnici';

const ucastnik = (jmeno, prijmeni, rocnik, kategorie) => {
    return Map({jmeno, prijmeni, rocnik, kategorie});
};

describe('účastníci', () => {
	describe('setUcastnici', () => {
		const testZaloziUcastniky = (ucastnici) => {
            const state = Map();
            const nextState = setUcastnici(state, ucastnici);
            expect(nextState).to.equal(Map({
            	'ucastnici':
            	    List.of(ucastnik('Ivo', 'Raisr'),
            	    	    ucastnik('Lenka', 'Raisrová'))
            }));
		}

		it('založí účastníky (immutable)', () => {
			testZaloziUcastniky(List.of(ucastnik('Ivo', 'Raisr'),
				                        ucastnik('Lenka', 'Raisrová')));
		});

		it('založí účastníky (plain JS)', () => {
			testZaloziUcastniky([ucastnik('Ivo', 'Raisr'),
				                 ucastnik('Lenka', 'Raisrová')]);
		});
	});
});