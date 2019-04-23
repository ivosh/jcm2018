import React from 'react';
import PropTypes from 'prop-types';
import ObrazekPohlavi from './ObrazekPohlavi';
import ObrazekTypu from './ObrazekTypu';
import PopisekVeku from './PopisekVeku';

const renderTyp = ({ pohlavi, vek }) => !pohlavi && !vek;

const PopisekKategorie = ({ heightPercentage, pohlavi, showTyp, typ, vek, zkratka }) => (
  <span style={{ fontSize: `${heightPercentage}%` }}>
    {showTyp && (
      <React.Fragment>
        <ObrazekTypu heightPercentage={heightPercentage} typ={typ} />{' '}
        {renderTyp({ pohlavi, vek }) && typ}
      </React.Fragment>
    )}
    {pohlavi && <ObrazekPohlavi heightPercentage={heightPercentage} pohlavi={pohlavi} />}
    {vek && <PopisekVeku vek={vek} />}
    {zkratka && ` (${zkratka})`}
  </span>
);

PopisekKategorie.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  showTyp: PropTypes.bool,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  zkratka: PropTypes.string
};

PopisekKategorie.defaultProps = {
  heightPercentage: 100,
  pohlavi: undefined,
  showTyp: true,
  vek: undefined,
  zkratka: undefined
};

export default PopisekKategorie;
