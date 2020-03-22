export const createKategorieFilterChange = (actionPrefix) => (typKategorie) => ({
  type: `${actionPrefix}_KATEGORIE_FILTER_CHANGE`,
  typKategorie,
});

export const createTextFilterChange = (actionPrefix) => (textFilter) => ({
  type: `${actionPrefix}_TEXT_FILTER_CHANGE`,
  textFilter,
});
