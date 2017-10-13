const initialState = {
	'running': false,
	'base': null
};

const stopkyReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'STOPKY_START':
		return {
			...state,
			'running': true,
			'base': new Date()
		};
	case 'STOPKY_STOP':
		return {
			...state,
			'running': false
		};
	default:
	    return state;
	}
}

export default stopkyReducer;