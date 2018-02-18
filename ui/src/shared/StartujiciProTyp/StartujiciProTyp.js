import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Table } from 'react-bootstrap';
import { dokoncenoStr } from '../../Util';
import './StartujiciProTyp.css';

const Jeden = ({ startCislo, dokonceno, onClick }) => (
  <td className={`StartujiciProTyp-${dokoncenoStr(dokonceno)[0]}`} onClick={onClick}>
    {startCislo}
  </td>
);

Jeden.propTypes = {
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool,
  onClick: PropTypes.func
};

const STARTUJICICH_NA_RADKU = 10;
const generateTable = startujici => {
  const rows = [];
  while (startujici.length > 0) {
    rows.push(startujici.splice(0, STARTUJICICH_NA_RADKU));
  }

  return rows.map((row, index) => (
    <tr key={index}>{row.map(jeden => <Jeden key={jeden.startCislo} {...jeden} />)}</tr>
  ));
};

const StartujiciProTyp = ({ startujici }) => (
  <div>
    <Table className="StartujiciProTyp-table" bordered condensed striped>
      <tbody>{generateTable(startujici)}</tbody>
    </Table>
  </div>
);

StartujiciProTyp.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startCislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: momentPropTypes.momentDurationObj,
      onClick: PropTypes.func
    }).isRequired
  ).isRequired
};

export default StartujiciProTyp;
