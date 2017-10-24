import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { convertDuration } from '../Util';

const Mezicas = ({ poradi, duration, cislo, onClick }) => {
  let { hours, mins, secs, subsecs } = convertDuration(duration);

  return (
    <tr>
      <td>
        {poradi}
        {'.'}
      </td>
      <td>
        {hours}
        {':'}
        {mins}
        {':'}
        {secs}
        {','}
        {subsecs}
      </td>
      <td>{cislo}</td>
      <td>
        <Button bsStyle="danger" bsSize="xsmall" onClick={onClick}>
          x
        </Button>
      </td>
    </tr>
  );
};

Mezicas.propTypes = {
  poradi: PropTypes.number.isRequired,
  duration: PropTypes.object.isRequired,
  cislo: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Mezicas;
