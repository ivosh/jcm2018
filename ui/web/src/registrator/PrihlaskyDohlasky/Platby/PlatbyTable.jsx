import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Platba from './Platba';

const PlatbyTable = ({ platby }) => (
  <Table condensed={true}>
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
        // eslint-disable-next-line react/no-array-index-key
        <Platba key={index} platba={platba} onClick={platba.onRemove} />
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
      poznamka: PropTypes.string,
      onRemove: PropTypes.func.isRequired
    })
  ).isRequired
};

export default PlatbyTable;
