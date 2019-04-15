import React from 'react';
import PropTypes from 'prop-types';
import VysledkyTypuStats from './VysledkyTypuStats';
import './VysledkyStats.css';

const VysledkyStats = ({ summary, typy }) => (
  <div>
    {Object.values(typy).map(typ => (
      <div className="VysledkyStats__typ" key={typ.typ}>
        <VysledkyTypuStats {...typ} anchorHref={true} />
      </div>
    ))}
    <div>účastníků celkem: {summary.startovalo}</div>
  </div>
);

VysledkyStats.propTypes = {
  summary: PropTypes.shape({
    startovalo: PropTypes.number.isRequired,
    dokoncilo: PropTypes.number.isRequired
  }).isRequired,
  typy: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default VysledkyStats;
