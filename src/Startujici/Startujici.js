import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { dokoncenoStr } from '../Util';
import './Startujici.css';

const Jeden = ({ cislo, dokonceno }) => {
  return <td className={'Startujici-' + dokoncenoStr(dokonceno)[0]}>{cislo}</td>;
};

Jeden.propTypes = {
  cislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool
};

const STARTUJICICH_NA_RADKU = 10;
const generateTable = startujici => {
  let rows = [];
  while (startujici.length > 0) {
    rows.push(startujici.splice(0, STARTUJICICH_NA_RADKU));
  }

  return rows.map((row, index) => (
    <tr key={index}>{row.map(jeden => <Jeden key={jeden.id} {...jeden} />)}</tr>
  ));
};

const Startujici = ({ startujici }) => (
  <Table className="Startujici-table" bordered condensed striped>
    <tbody>{generateTable(startujici)}</tbody>
  </Table>
);

Startujici.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: PropTypes.object
    }).isRequired
  ).isRequired
};

export default Startujici;
