import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import './Mezicasy.css';
import Mezicas from './Mezicas';

const Mezicasy = ({ mezicasy, onRemoveMezicas }) => (
  <Table className="Mezicasy">
    <thead>
      <tr>
        <th>#</th>
        <th>mezičas</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {mezicasy.map((mezicas, index) => (
        <Mezicas
          key={mezicas.id}
          poradi={index + 1}
          duration={mezicas.duration}
          onClick={() => onRemoveMezicas(mezicas.id)}
        />
      ))}
    </tbody>
  </Table>
);

Mezicasy.propTypes = {
  mezicasy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      duration: PropTypes.object.isRequired
    }).isRequired
  ).isRequired,
  onRemoveMezicas: PropTypes.func.isRequired
};

export default Mezicasy;
