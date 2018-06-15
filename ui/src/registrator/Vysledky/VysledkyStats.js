import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import VysledkyTypuStats from './VysledkyTypuStats';
import './VysledkyStats.css';

const VysledkyStats = ({ summary, typy }) => (
  <Panel bsStyle="primary" header="přehled">
    {Object.values(typy).map(typ => (
      <div className="VysledkyStats__typ" key={typ.typ}>
        <VysledkyTypuStats {...typ} />
      </div>
    ))}
    <div>účastníků celkem: {summary.startovalo}</div>
  </Panel>
);

VysledkyStats.propTypes = {
  summary: PropTypes.shape({
    startovalo: PropTypes.number.isRequired,
    dokoncilo: PropTypes.number.isRequired
  }).isRequired,
  typy: PropTypes.object.isRequired
};

export default VysledkyStats;
