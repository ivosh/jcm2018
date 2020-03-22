import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import Clovek from './Clovek';
import './Vitez.css';

const formatCas = (cas) => {
  const { hours, mins, secs, subsecs } = convertDuration(moment.duration(cas));
  return `${hours}:${mins}:${secs},${subsecs}`;
};

const Vitez = ({ misto, vitez: { prijmeni, jmeno, startCislo, cas, absPoradi, relPoradi } }) => (
  <Clovek>
    <div className={`Vitez__cedule Vitez__cedule--${misto}`}>
      <div className="Vitez__cedule--cislo">{startCislo}</div>
      <div className="Vitez__cedule--jmeno">
        {jmeno} {prijmeni}
      </div>
      <div>abs: {absPoradi}.</div>
      <div className="Vitez__cedule--cas">{formatCas(cas)}</div>
      <div>rel: {relPoradi}.</div>
    </div>
  </Clovek>
);

Vitez.propTypes = {
  misto: PropTypes.number.isRequired,
  vitez: PropTypes.shape({
    prijmeni: PropTypes.string.isRequired,
    jmeno: PropTypes.string.isRequired,
    startCislo: PropTypes.number.isRequired,
    cas: PropTypes.string.isRequired,
    absPoradi: PropTypes.number.isRequired,
    relPoradi: PropTypes.number.isRequired,
  }).isRequired,
};

export default Vitez;
