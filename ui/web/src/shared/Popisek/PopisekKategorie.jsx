import React from 'react';
import PropTypes from 'prop-types';
import ObrazekPohlavi from './ObrazekPohlavi';
import ObrazekTypu from './ObrazekTypu';

const renderTyp = ({ pohlavi, vek }) => !pohlavi && !vek;

const PopisekKategorie = ({
  heightPercentage,
  pohlavi,
  showTyp,
  showZkratka,
  typ,
  vek,
  zkratka
}) => (
  <span style={{ fontSize: `${heightPercentage}%` }}>
    {showTyp && (
      <React.Fragment>
        <ObrazekTypu heightPercentage={heightPercentage} typ={typ} />{' '}
        {renderTyp({ pohlavi, vek }) && typ}
      </React.Fragment>
    )}
    {pohlavi && <ObrazekPohlavi heightPercentage={heightPercentage} pohlavi={pohlavi} />}
    {vek && `${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`}
    {showZkratka && ` (${zkratka})`}
  </span>
);

PopisekKategorie.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  showTyp: PropTypes.bool,
  showZkratka: PropTypes.bool,
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
  showZkratka: false,
  vek: undefined,
  zkratka: undefined
};

export default PopisekKategorie;
