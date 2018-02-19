import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { dokoncenoStr } from '../../Util';
import './StartujiciProTyp.css';

const Jeden = ({ startCislo, dokonceno, onClick }) => (
  <div className={`StartujiciProTyp-${dokoncenoStr(dokonceno)[0]}`} onClick={onClick}>
    {startCislo}
  </div>
);

Jeden.propTypes = {
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool,
  onClick: PropTypes.func
};

const StartujiciProTyp = ({ startujici }) => (
  <div className="StartujiciProTyp-grid">
    {startujici.map(jeden => <Jeden key={jeden.startCislo} {...jeden} />)}
  </div>
);

StartujiciProTyp.propTypes = {
  startujici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      startCislo: PropTypes.number.isRequired,
      dokonceno: PropTypes.bool,
      duration: momentPropTypes.momentDurationObj,
      onClick: PropTypes.func
    }).isRequired
  ).isRequired
};

export default StartujiciProTyp;
