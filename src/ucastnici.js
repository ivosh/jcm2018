import {List} from 'immutable';

export function setUcastnici(state, ucastnici) {
	return state.set('ucastnici', List(ucastnici));
}