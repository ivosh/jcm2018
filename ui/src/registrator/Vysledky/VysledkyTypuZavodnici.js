import React from 'react';
import PropTypes from 'prop-types';
import './VysledkyTypuUcastnici.css';

const VysledkyTypuZavodnici = ({ popisek, ucastnici, zkratky }) => (
  <table className="VysledkyTypuUcastnici__table">
    <thead className="VysledkyTypuUcastnici__thead">
      <tr>
        <th className="VysledkyTypuUcastnici__th--caption" colSpan={6 + zkratky.length}>
          {popisek}
        </th>
      </tr>
      <tr>
        <th rowSpan="3">
          start.<br />číslo
        </th>
        <th rowSpan="3">příjmení a jméno</th>
        <th rowSpan="3">klub či obec</th>
        <th rowSpan="3">nar.</th>
        <th rowSpan="3">čas</th>
        <th colSpan={1 + zkratky.length}>umístění</th>
      </tr>
      <tr>
        <th rowSpan="2">abs.</th>
        <th colSpan={zkratky.length}>v kategorii</th>
      </tr>
      <tr>{zkratky.map(zkratka => <th key={zkratka}>{zkratka}</th>)}</tr>
    </thead>
    <tbody>
      {ucastnici.map(
        ({
          id,
          startCislo,
          prijmeni,
          jmeno,
          misto,
          narozeni,
          cas,
          absPoradi,
          relPoradi,
          kategorie: { zkratka }
        }) => (
          <tr key={id}>
            <td className="VysledkyTypuUcastnici__td--startCislo">{startCislo}</td>
            <td>
              {prijmeni} {jmeno}
            </td>
            <td>{misto}</td>
            <td>{narozeni}</td>
            <td>{cas}</td>
            <td className="VysledkyTypuUcastnici__td--poradi">
              {absPoradi ? `${absPoradi}.` : '-'}
            </td>
            {zkratky.map(jedna => (
              <td className="VysledkyTypuUcastnici__td--poradi" key={jedna}>
                {jedna === zkratka ? (relPoradi ? `${relPoradi}.` : '-') : ' '}
              </td>
            ))}
          </tr>
        )
      )}
    </tbody>
  </table>
);

VysledkyTypuZavodnici.propTypes = {
  popisek: PropTypes.string.isRequired,
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      startCislo: PropTypes.number.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      misto: PropTypes.string.isRequired,
      narozeni: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool.isRequired,
      cas: PropTypes.string.isRequired,
      absPoradi: PropTypes.number,
      relPoradi: PropTypes.number,
      kategorie: PropTypes.shape({
        zkratka: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypuZavodnici;
