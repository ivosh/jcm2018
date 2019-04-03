import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Poznamka.css';

const Poznamka = ({ datum, text }) => (
  <div>
    <div className="Poznamka__datum">{moment.utc(datum).format('D. M. YYYY')}</div>
    <div className="Poznamka__text">
      <textarea className="Poznamka__textarea" defaultValue={text} rows={5} />
    </div>
  </div>
);

Poznamka.propTypes = {
  datum: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired
};

export default Poznamka;
