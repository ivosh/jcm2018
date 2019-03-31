export const createDohlaseniFilterChange = actionPrefix => () => ({
  type: `${actionPrefix}_DOHLASENI_FILTER_CHANGE`
});

export const createPrihlaseniFilterChange = actionPrefix => () => ({
  type: `${actionPrefix}_PRIHLASENI_FILTER_CHANGE`
});

export const createShowPoznamky = actionPrefix => () => ({ type: `${actionPrefix}_SHOW_POZNAMKY` });
export const createHidePoznamky = actionPrefix => () => ({ type: `${actionPrefix}_HIDE_POZNAMKY` });
