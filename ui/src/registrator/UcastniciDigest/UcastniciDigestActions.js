export const kategorieVykonuFilterChange = typKategorie => ({
  type: 'UCASTNICI_DIGEST_KATEGORIE_VYKONU_FILTER_CHANGE',
  typKategorie
});

export const textFilterChange = textFilter => ({
  type: 'UCASTNICI_DIGEST_TEXT_FILTER_CHANGE',
  textFilter
});

export const sortDirChange = sortColumn => ({
  type: 'UCASTNICI_DIGEST_SORT_DIR_CHANGE',
  sortColumn
});
