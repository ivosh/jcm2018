// eslint-disable-next-line import/prefer-default-export
export const sortDirChange = (actionPrefix, sortColumn) => ({
  type: `${actionPrefix}_SORT_DIR_CHANGE`,
  sortColumn
});
