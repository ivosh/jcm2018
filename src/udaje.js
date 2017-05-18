import {Map} from 'immutable';

export function noveUdaje(jmeno, prijmeni, narozeni, adresa, obec, psc,
	                      telefon = '', email = '') {
	return Map({jmeno, prijmeni, narozeni, adresa, obec, psc, telefon,
		       email});
}

export function setJmeno(udaje, jmeno) {
	return udaje.set('jmeno', jmeno);
}

export function setPrijmeni(udaje, prijmeni) {
	return udaje.set('prijmeni', prijmeni);
}