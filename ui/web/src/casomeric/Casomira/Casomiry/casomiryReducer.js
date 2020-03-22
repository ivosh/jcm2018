const casomiry = [
  { casomira: 'maraton', accessKey: 'm' },
  { casomira: 'půlmaraton', accessKey: 'p' },
  { casomira: 'cyklo', accessKey: 'c' },
  { casomira: 'koloběžka', accessKey: 'k' },
];

const initialState = {
  maraton: true,
  půlmaraton: true,
  cyklo: true,
  koloběžka: true,
};

const casomiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CASOMIRY_REMOVE_CASOMIRA':
      return { ...state, [action.casomira]: false };
    default:
      return state;
  }
};

export default casomiryReducer;

export const getCasomiry = (state) => casomiry.filter((casomira) => state[casomira.casomira]);
