import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './PrihlaseniDohlaseniFilter.css';

const PrihlaseniDohlaseniFilter = ({ bsStyle, name, active, onClick }) => (
  <span className="PrihlaseniDohlaseniFilter Bootstrap-buttons--active">
    <Button active={active} bsStyle={bsStyle} onClick={onClick}>
      {name}{' '}
    </Button>
  </span>
);

PrihlaseniDohlaseniFilter.propTypes = {
  active: PropTypes.bool,
  bsStyle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

PrihlaseniDohlaseniFilter.defaultProps = {
  active: false
};

export default PrihlaseniDohlaseniFilter;
