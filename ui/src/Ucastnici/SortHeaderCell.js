import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';

export const SortDirTypes = {
  NONE: '',
  ASC: '↑',
  DESC: '↓'
};

const reverseSortDirType = sortDirType => {
  switch (sortDirType) {
    case SortDirTypes.ASC:
      return SortDirTypes.DESC;
    case SortDirTypes.DESC:
      return SortDirTypes.ASC;
    default:
      return SortDirTypes.ASC;
  }
};

class SortHeaderCell extends Component {
  sortChanged = event => {
    event.preventDefault();

    const { onSortChange, columnKey, sortDir } = this.props;
    onSortChange(columnKey, reverseSortDirType(sortDir));
  };

  render = () => (
    <Cell>
      <a onClick={this.sortChanged}>
        {this.props.children} {this.props.sortDir}
      </a>
    </Cell>
  );
}

SortHeaderCell.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  columnKey: PropTypes.string,
  sortDir: PropTypes.string,
  children: PropTypes.node
};

export default SortHeaderCell;
