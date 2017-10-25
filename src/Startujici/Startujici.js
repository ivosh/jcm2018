import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Table } from 'react-bootstrap';
import { dokoncenoArr, dokoncenoStr } from '../Util';
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
  <div>
    <Table className="Startujici-table" bordered condensed striped>
      <tbody>{generateTable(startujici)}</tbody>
    </Table>
    <div>
      <span>legenda:</span>
      {dokoncenoArr.map((item, index) => (
        <span key={index} className={'Startujici-' + dokoncenoStr(item)[0] + ' Startujici-legenda'}>
          {dokoncenoStr(item)[1]}
        </span>
      ))}
    </div>
  </div>
);

Startujici.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: momentPropTypes.momentDurationObj
    }).isRequired
  ).isRequired
};

export default Startujici;
