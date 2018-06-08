import React from 'react';
import PropTypes from 'prop-types';
import PopisekPohlavi from './PopisekPohlavi';
import PopisekTypu from './PopisekTypu';

const PopisekKategorie = ({ heightPercentage, pohlavi, showTyp, typ, typAsText, vek }) => (
  <span style={{ fontSize: `${heightPercentage}%` }}>
    {showTyp && (
      <PopisekTypu
        heightPercentage={heightPercentage}
        pohlavi={pohlavi}
        typ={typ}
        typAsText={typAsText}
        vek={vek}
      />
    )}
    {pohlavi && <PopisekPohlavi heightPercentage={heightPercentage} pohlavi={pohlavi} />}
    {vek && `${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`}
  </span>
);

PopisekKategorie.propTypes = {
  heightPercentage: PropTypes.number,
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  showTyp: PropTypes.bool,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  typAsText: PropTypes.bool,
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

PopisekKategorie.defaultProps = {
  heightPercentage: 100,
  showTyp: true
};

export default PopisekKategorie;
