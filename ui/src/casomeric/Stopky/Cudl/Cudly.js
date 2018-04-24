import React from 'react';
import PropTypes from 'prop-types';
import Cudl from './Cudl';

const Cudly = ({ popisky, funcs }) => (
  <React.Fragment>
    <div className="StopkyProTyp__cudly">
      <Cudl text={popisky[1]} onClick={funcs[1]} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={popisky[2]} onClick={funcs[2]} />
      <Cudl text={popisky[3]} onClick={funcs[3]} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={popisky[4]} onClick={funcs[4]} />
      <Cudl text={popisky[5]} onClick={funcs[5]} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={popisky[6]} onClick={funcs[6]} />
      <Cudl text={popisky[7]} onClick={funcs[7]} />
    </div>
  </React.Fragment>
);

Cudly.propTypes = {
  popisky: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  funcs: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired
};

export default Cudly;
