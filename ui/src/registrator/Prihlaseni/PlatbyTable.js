import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Platba from './Platba';

const PlatbyTable = ({ platby, onRemove }) => (
  <Table condensed>
    <thead>
      <tr>
        <th>částka</th>
        <th>datum</th>
        <th>jak?</th>
        <th>pozn.</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {platby.map((platba, index) => (
        <Platba key={index} platba={platba} onClick={() => onRemove(index)} />
      ))}
    </tbody>
  </Table>
);

PlatbyTable.propTypes = {
  platby: PropTypes.arrayOf(
    PropTypes.shape({
      castka: PropTypes.number.isRequired,
      datum: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      poznamka: PropTypes.string
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default PlatbyTable;
