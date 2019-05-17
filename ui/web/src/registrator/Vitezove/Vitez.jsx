import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import Clovek from './Clovek';
import './Vitez.css';

const formatCas = cas => {
  const { hours, mins, secs, subsecs } = convertDuration(moment.duration(cas));
  return `${hours}:${mins}:${secs},${subsecs}`;
};

const Vitez = ({ vitez }) => (
  <Clovek>
    <div className="Vitez__cedule">
      <div className="Vitez__cedule--jmeno">
        {vitez.jmeno} {vitez.prijmeni}
      </div>
      <div className="Vitez__cedule--cas">{formatCas(vitez.cas)}</div>
    </div>
  </Clovek>
);

Vitez.propTypes = {
  vitez: PropTypes.shape({
    prijmeni: PropTypes.string.isRequired,
    jmeno: PropTypes.string.isRequired,
    cas: PropTypes.string.isRequired
  }).isRequired
};

export default Vitez;
