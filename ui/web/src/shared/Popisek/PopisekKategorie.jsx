import React from 'react';
import PropTypes from 'prop-types';
import ObrazekPohlavi from './ObrazekPohlavi';
import ObrazekTypu from './ObrazekTypu';

const renderTyp = ({ pohlavi, typAsText, vek }) => (!pohlavi && !vek) || typAsText;

const PopisekKategorie = ({
  heightPercentage,
  pohlavi,
  showTyp,
  showZkratka,
  typ,
  typAsText,
  vek,
  zkratka
}) => (
  <span style={{ fontSize: `${heightPercentage}%` }}>
    {showTyp && (
      <React.Fragment>
        <ObrazekTypu heightPercentage={heightPercentage} typ={typ} />{' '}
        {renderTyp({ pohlavi, typAsText, vek }) && typ}
      </React.Fragment>
    )}
    {pohlavi && <ObrazekPohlavi heightPercentage={heightPercentage} pohlavi={pohlavi} />}
    {vek && `${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`}
    {showZkratka && ` (${zkratka})`}
  </span>
);

PopisekKategorie.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']), // eslint-disable-line react/require-default-props
  showTyp: PropTypes.bool,
  showZkratka: PropTypes.bool,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  typAsText: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  zkratka: PropTypes.string // eslint-disable-line react/require-default-props
};

PopisekKategorie.defaultProps = {
  heightPercentage: 100,
  showTyp: true,
  showZkratka: false,
  typAsText: false
};

export default PopisekKategorie;
