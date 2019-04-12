import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import './StartovniCislaProTyp.css';

const StartovniCislaProTyp = ({ startovniCisla, Renderer, ...rest }) => (
  <div className="StartovniCislaProTyp__grid">
    {startovniCisla.map(jeden => {
      const props = { ...jeden, ...rest };
      return <Renderer key={jeden.startCislo} {...props} />;
    })}
  </div>
);

StartovniCislaProTyp.propTypes = {
  startovniCisla: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startCislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: momentPropTypes.momentDurationObj
    }).isRequired
  ).isRequired,
  // Input: { id, startCislo, dokonceno, cas }
  // Returned element must set: className="StartovniCislaProTyp__item"
  Renderer: PropTypes.func.isRequired
};

export default StartovniCislaProTyp;
