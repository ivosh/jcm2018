import React from 'react';
import PropTypes from 'prop-types';
import './VysledkyTypuStats.css';

const VysledkyTypuStats = ({ popisek, stats, typ, zkratky }) => (
  <table className="VysledkyTypuStats__table">
    <thead>
      <tr>
        <th />
        <th>
          <a className="VysledkyTypuStats__a" name={typ}>
            {popisek}
          </a>
        </th>
        <th>startovalo</th>
        <th>dokončilo</th>
      </tr>
    </thead>
    <tbody>
      {zkratky.length > 1 &&
        zkratky.map(zkratka => (
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
  popisek: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  typ: PropTypes.string.isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypuStats;
