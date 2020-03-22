import React from 'react';
import PropTypes from 'prop-types';
import './VysledkyTypuStats.css';

const VysledkyTypuStats = ({ anchorHref, popisek, stats, typ, zkratky }) => (
  <table className="VysledkyTypuStats__table">
    <thead>
      <tr>
        <th aria-label="kategorie" />
        <th>
          {anchorHref && (
            <a className="VysledkTypuStats__a--href" href={`#${typ}`}>
              {popisek}
            </a>
          )}
          {!anchorHref && (
            <div className="VysledkyTypuStats__anchor" id={typ}>
              {' '}
              {popisek}{' '}
            </div>
          )}
        </th>
        <th>startovalo</th>
        <th>dokončilo</th>
      </tr>
    </thead>
    <tbody>
      {zkratky.length > 1 &&
        zkratky.map((zkratka) => (
          <tr key={zkratka}>
            <td>{zkratka}</td>
            <td>{stats[zkratka].popisek}</td>
            <td className="VysledkyTypuStats__td--pocty">{stats[zkratka].startovalo}</td>
            <td className="VysledkyTypuStats__td--pocty">{stats[zkratka].dokoncilo}</td>
          </tr>
        ))}
      <tr className="VysledkyTypuStats__tr--total">
        <td />
        <td>celkem</td>
        <td className="VysledkyTypuStats__td--pocty">{stats.startovalo}</td>
        <td className="VysledkyTypuStats__td--pocty">{stats.dokoncilo}</td>
      </tr>
    </tbody>
  </table>
);

VysledkyTypuStats.propTypes = {
  anchorHref: PropTypes.bool.isRequired,
  popisek: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  typ: PropTypes.string.isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VysledkyTypuStats;
