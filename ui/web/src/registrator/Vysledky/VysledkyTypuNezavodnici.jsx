import React from 'react';
import PropTypes from 'prop-types';
import './VysledkyTypuUcastnici.css';

const VysledkyTypuNezavodnici = ({ popisek, ucastnici }) => (
  <table className="VysledkyTypuNezavodnici__table">
    <thead className="VysledkyTypuUcastnici__thead">
      <tr>
        <th className="VysledkyTypuUcastnici__th--caption" colSpan={3}>
          {popisek}
        </th>
      </tr>
      <tr>
        <th>příjmení a jméno</th>
        <th>klub či obec</th>
        <th>nar.</th>
      </tr>
    </thead>
    <tbody>
      {ucastnici.map(({ id, prijmeni, jmeno, misto, narozeni }) => (
        <tr key={id}>
          <td>
            {prijmeni} {jmeno}
          </td>
          <td>{misto}</td>
          <td>{narozeni}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

VysledkyTypuNezavodnici.propTypes = {
  popisek: PropTypes.string.isRequired,
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      misto: PropTypes.string.isRequired,
      narozeni: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};

export default VysledkyTypuNezavodnici;
