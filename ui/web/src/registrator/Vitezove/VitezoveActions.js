export const kategorieFilterChange = kategorie => ({
  type: 'VITEZOVE_KATEGORIE_FILTER_CHANGE',
  kategorieFilter: kategorie // typ
});

export const kategorieSubFilterChange = kategorie => ({
  type: 'VITEZOVE_KATEGORIE_SUB_FILTER_CHANGE',
  kategorieSubFilter: kategorie // id
});
