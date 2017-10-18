import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Mezicas from './Mezicas';

const generateList = (mezicasyIn, onRemoveMezicas) => {
  let mezicasyOut = [];
  for (let i = 0; i < mezicasyIn.length; i++) {
    const mezicasIn = mezicasyIn[i];

    mezicasyOut.push(
      <Mezicas
        key={mezicasIn.id}
        poradi={i + 1}
        duration={mezicasIn.duration}
        onClick={() => onRemoveMezicas(mezicasIn.id)}
      />
    );
  }
  return mezicasyOut;
};

const MezicasyView = ({ mezicasy, onRemoveMezicas }) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>mezičas</th>
      </tr>
    </thead>
    <tbody>{generateList(mezicasy, onRemoveMezicas)}</tbody>
  </Table>
);

MezicasyView.propTypes = {
  mezicasy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      duration: PropTypes.object.isRequired
    }).isRequired
  ).isRequired,
  onRemoveMezicas: PropTypes.func.isRequired
};

export default MezicasyView;
