export const createSortDirChange = actionPrefix => sortColumn => ({
  type: `${actionPrefix}_SORT_DIR_CHANGE`,
  sortColumn
});
