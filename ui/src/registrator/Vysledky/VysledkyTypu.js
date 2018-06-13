import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import VysledkyTypuStats from './VysledkyTypuStats';
import VysledkyTypuUcastnici from './VysledkyTypuUcastnici';
import './VysledkyTypu.css';

const VysledkyTypu = ({ popisek, stats, typ, ucastnici, zkratky }) => (
  <Panel bsStyle="info" header={popisek}>
    <VysledkyTypuStats popisek={popisek} stats={stats} typ={typ} zkratky={zkratky} />
    <VysledkyTypuUcastnici popisek={popisek} ucastnici={ucastnici} zkratky={zkratky} />
  </Panel>
);

VysledkyTypu.propTypes = {
  popisek: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  typ: PropTypes.string.isRequired,
  ucastnici: PropTypes.array.isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypu;
