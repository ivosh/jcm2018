import React from 'react';
import PropTypes from 'prop-types';
import Cudl from './Cudl';

const Cudly = ({ cudly }) => (
  <>
    <div className="StopkyProTyp__cudly">
      <Cudl text={cudly[1].popisek} onClick={cudly[1].onClick} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={cudly[2].popisek} onClick={cudly[2].onClick} />
      <Cudl text={cudly[3].popisek} onClick={cudly[3].onClick} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={cudly[4].popisek} onClick={cudly[4].onClick} />
      <Cudl text={cudly[5].popisek} onClick={cudly[5].onClick} />
    </div>
    <div />
    <div className="StopkyProTyp__cudly">
      <Cudl text={cudly[6].popisek} onClick={cudly[6].onClick} />
      <Cudl text={cudly[7].popisek} onClick={cudly[7].onClick} />
    </div>
  </>
);

Cudly.propTypes = {
  cudly: PropTypes.arrayOf(
    PropTypes.shape({
      popisek: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
};

export default Cudly;
