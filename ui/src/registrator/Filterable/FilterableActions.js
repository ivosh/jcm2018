export const kategorieVykonuFilterChange = (actionPrefix, typKategorie) => ({
  type: `${actionPrefix}_KATEGORIE_VYKONU_FILTER_CHANGE`,
  typKategorie
});

export const textFilterChange = (actionPrefix, textFilter) => ({
  type: `${actionPrefix}_TEXT_FILTER_CHANGE`,
  textFilter
});
