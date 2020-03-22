import React from 'react';
import PropTypes from 'prop-types';
import VysledkyTypuStats from './VysledkyTypuStats';
import VysledkyTypuZavodnici from './VysledkyTypuZavodnici';
import VysledkyTypuNezavodnici from './VysledkyTypuNezavodnici';
import './VysledkyTypu.css';

const VysledkyTypu = ({ popisek, startCisla, stats, typ, ucastnici, zkratky }) => (
  <div className={startCisla ? 'VysledkyTypu--zavodnici' : 'VysledkyTypu--nezavodnici'}>
    <div className="VysledkyTypu__stats">
      <VysledkyTypuStats
        anchorHref={false}
        popisek={popisek}
        stats={stats}
        typ={typ}
        zkratky={zkratky}
      />
    </div>
    {startCisla && (
      <VysledkyTypuZavodnici popisek={popisek} ucastnici={ucastnici} zkratky={zkratky} />
    )}
    {!startCisla && <VysledkyTypuNezavodnici popisek={popisek} ucastnici={ucastnici} />}
  </div>
);

VysledkyTypu.propTypes = {
  popisek: PropTypes.string.isRequired,
  startCisla: PropTypes.bool.isRequired,
  stats: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  typ: PropTypes.string.isRequired,
  ucastnici: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VysledkyTypu;
