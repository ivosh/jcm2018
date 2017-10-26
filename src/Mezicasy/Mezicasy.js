import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Table } from 'react-bootstrap';
import './Mezicasy.css';
import Mezicas from './Mezicas';

const Mezicasy = ({ mezicasy }) => (
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
            onClick={mezicas.onRemove}
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
      cislo: PropTypes.number,
      cisloClass: PropTypes.func.isRequired,
      onRemove: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

export default Mezicasy;
