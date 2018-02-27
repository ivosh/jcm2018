import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import './StartujiciProTyp.css';

const StartujiciProTyp = ({ startujici, renderer, ...rest }) => (
  <div className="StartujiciProTyp-grid">
    {startujici.map(jeden => renderer({ ...jeden, ...rest }))}
  </div>
);

StartujiciProTyp.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startCislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: momentPropTypes.momentDurationObj
    }).isRequired
  ).isRequired,
  // Input: { id, startCislo, dokonceno, cas }
  // Returned element must set: key={startCislo} className="StartujiciProTyp-item"
  renderer: PropTypes.func.isRequired
};

export default StartujiciProTyp;
