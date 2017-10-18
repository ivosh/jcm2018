import React from 'react';
import PropTypes from 'prop-types';
import { convertDuration } from '../Util';

const Mezicas = ({ poradi, duration, onClick }) => {
  let { hours, mins, secs, subsecs } = convertDuration(duration);

  return (
    <tr onClick={onClick}>
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
    </tr>
  );
};

Mezicas.propTypes = {
  poradi: PropTypes.number.isRequired,
  duration: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default Mezicas;
