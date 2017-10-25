import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Table } from 'react-bootstrap';
import './Mezicasy.css';
import Mezicas from './Mezicas';

const Mezicasy = ({ mezicasy, onRemoveMezicas }) => (
  <Table className="Mezicasy">
    <thead>
      <tr>
        <th>#</th>
        <th>mezičas</th>
        <th>číslo</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {mezicasy.map((mezicas, index) => {
        const Cislo = mezicas.cisloClass;

        return (
          <Mezicas
            key={index}
            poradi={index + 1}
            duration={mezicas.duration}
            cislo={
              <Cislo mezicasId={mezicas.id} duration={mezicas.duration} cislo={mezicas.cislo} />
            }
            onClick={() => onRemoveMezicas(mezicas.id)}
          />
        );
      })}
    </tbody>
  </Table>
);

Mezicasy.propTypes = {
  mezicasy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      duration: momentPropTypes.momentDurationObj.isRequired,
      cisloClass: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  onRemoveMezicas: PropTypes.func.isRequired
};

export default Mezicasy;
