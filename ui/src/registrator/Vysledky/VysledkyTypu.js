import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import VysledkyTypuStats from './VysledkyTypuStats';
import VysledkyTypuZavodnici from './VysledkyTypuZavodnici';
import VysledkyTypuNezavodnici from './VysledkyTypuNezavodnici';
import './VysledkyTypu.css';

const VysledkyTypu = ({ popisek, startCisla, stats, typ, ucastnici, zkratky }) => (
  <Panel bsStyle="info" header={popisek}>
    <div className="VysledkyTypu__stats">
      <VysledkyTypuStats popisek={popisek} stats={stats} typ={typ} zkratky={zkratky} />
    </div>
    {startCisla && (
      <VysledkyTypuZavodnici popisek={popisek} ucastnici={ucastnici} zkratky={zkratky} />
    )}
    {!startCisla && <VysledkyTypuNezavodnici popisek={popisek} ucastnici={ucastnici} />}
  </Panel>
);

VysledkyTypu.propTypes = {
  popisek: PropTypes.string.isRequired,
  startCisla: PropTypes.bool.isRequired,
  stats: PropTypes.object.isRequired,
  typ: PropTypes.string.isRequired,
  ucastnici: PropTypes.array.isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypu;
