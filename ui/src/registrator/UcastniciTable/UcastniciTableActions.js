// eslint-disable-next-line import/prefer-default-export
export const createSortDirChange = actionPrefix => sortColumn => ({
  type: `${actionPrefix}_SORT_DIR_CHANGE`,
  sortColumn
});
