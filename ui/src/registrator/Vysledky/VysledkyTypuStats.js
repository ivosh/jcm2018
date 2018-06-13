import React from 'react';
import PropTypes from 'prop-types';
import './VysledkyTypuStats.css';

const VysledkyTypuStats = ({ popisek, stats, typ, zkratky }) => <div />;

VysledkyTypuStats.propTypes = {
  popisek: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  typ: PropTypes.string.isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypuStats;
