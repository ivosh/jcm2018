export const createDohlaseniFilterChange = (actionPrefix) => () => ({
  type: `${actionPrefix}_DOHLASENI_FILTER_CHANGE`,
});

export const createPrihlaseniFilterChange = (actionPrefix) => () => ({
  type: `${actionPrefix}_PRIHLASENI_FILTER_CHANGE`,
});

export const createHideAkceMenu = (actionPrefix) => () => ({
  type: `${actionPrefix}_HIDE_AKCE_MENU`,
});
export const createShowAkceMenu = (actionPrefix) => (id) => ({
  type: `${actionPrefix}_SHOW_AKCE_MENU`,
  id,
});
