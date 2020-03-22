import React from 'react';
import PropTypes from 'prop-types';
import { SortDirTypes } from '../../sort';
import './SortHeader.css';

const sortDirs = {
  [SortDirTypes.NONE]: '',
  [SortDirTypes.ASC]: '↑',
  [SortDirTypes.DESC]: '↓',
};

const SortHeader = ({ children, sortDir, onClick }) => (
  <button className="SortHeader" type="button" onClick={onClick}>
    {children} {sortDirs[sortDir]}
  </button>
);

SortHeader.propTypes = {
  children: PropTypes.node,
  sortDir: PropTypes.oneOf([SortDirTypes.NONE, SortDirTypes.ASC, SortDirTypes.DESC]),
  onClick: PropTypes.func.isRequired,
};

SortHeader.defaultProps = {
  children: undefined,
  sortDir: SortDirTypes.NONE,
};

export default SortHeader;
