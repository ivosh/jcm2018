import {Map} from 'immutable';
import {expect} from 'chai';

import {noveUdaje, setJmeno, setPrijmeni} from '../src/udaje';

const mojeUdaje = () => {
	return noveUdaje('Ivo', 'Raisr', '7.8.1978', '37',
	    'Oldřichov v Hájích', '46331', '732 975 613', 'ivosh@ivosh.net');
};

describe('údaje', () => {
    describe('noveUdaje()', () => {
        it('vše ze stringů', () => {
            const udaje = mojeUdaje();
            expect(udaje).to.equal(
            	Map({'jmeno': 'Ivo', 'prijmeni': 'Raisr', 'narozeni': '7.8.1978',
            	     'adresa': '37', 'obec': 'Oldřichov v Hájích', 'psc': '46331',
            	     'telefon': '732 975 613', 'email': 'ivosh@ivosh.net'}));
        });
    });

    describe('setJmeno()', () => {
    	it('Ivo -> Ivoš', () => {
    		const state = mojeUdaje();
    		const nextState = setJmeno(state, 'Ivoš');
    		expect(nextState.get('jmeno')).to.equal('Ivoš');
    	});
    });

    describe('setPrijmeni()', () => {
    	it('Raisr -> Lejzr', () => {
    		const state = mojeUdaje();
    		const nextState = setPrijmeni(state, 'Lejzr');
    		expect(nextState.get('prijmeni')).to.equal('Lejzr');
    	});
    });
});