import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { findDokonceno } from '../../Util';
import './VysledkyTypuUcastnici.css';

const VysledkyTypuUcastnici = ({ popisek, ucastnici, zkratky }) => (
  <table className="VysledkyTypuUcastnici__table">
    <thead className="VysledkyTypuUcastnici__thead">
      <tr>
        <th colSpan={6 + zkratky.length}>{popisek}</th>
      </tr>
      <tr>
        <th rowSpan="3">
          start.<br />číslo
        </th>
        <th rowSpan="3">příjmení a jméno</th>
        <th rowSpan="3">klub (město)</th>
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
          dokonceno,
          cas,
          absPoradi,
          relPoradi,
          kategorie: zkratka
        }) => (
          <tr key={id}>
            <td>{startCislo}</td>
            <td>
              {prijmeni} {jmeno}
            </td>
            <td>{misto}</td>
            <td>{narozeni}</td>
            <td>{dokonceno ? cas : findDokonceno(dokonceno).popisek}</td>
            <td>{absPoradi ? `${absPoradi}.` : '-'}</td>
            {zkratky.map(jedna => (
              <td key={jedna}>{jedna === zkratka ? (relPoradi ? `${relPoradi}.` : '-') : ' '}</td>
            ))}
          </tr>
        )
      )}
    </tbody>
  </table>
);

VysledkyTypuUcastnici.propTypes = {
  popisek: PropTypes.string.isRequired,
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      startCislo: PropTypes.number.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      misto: PropTypes.string.isRequired,
      narozeni: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool.isRequired,
      cas: momentPropTypes.durationObj,
      absPoradi: PropTypes.number,
      relPoradi: PropTypes.number,
      kategorie: PropTypes.shape({
        zkratka: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  zkratky: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VysledkyTypuUcastnici;
