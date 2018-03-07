import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortDirTypes } from '../../sort';
import './SortHeader.css';

const sortDirs = {
  [SortDirTypes.NONE]: '',
  [SortDirTypes.ASC]: '↑',
  [SortDirTypes.DESC]: '↓'
};

class SortHeader extends PureComponent {
  handleClick = event => {
    event.preventDefault();
    this.props.onClick();
  };

  render = () => (
    <a className="SortHeader_a" onClick={this.handleClick}>
      {this.props.children} {sortDirs[this.props.sortDir]}
    </a>
  );
}

SortHeader.propTypes = {
  children: PropTypes.node,
  sortDir: PropTypes.oneOf([SortDirTypes.NONE, SortDirTypes.ASC, SortDirTypes.DESC]),
  onClick: PropTypes.func.isRequired
};

export default SortHeader;
