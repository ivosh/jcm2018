import React from 'react';
import PropTypes from 'prop-types';
import usePopisek from '../../../../common/Popisek/usePopisek';
import ObrazekPohlavi from './ObrazekPohlavi';
import ObrazekTypu from './ObrazekTypu';
import PopisekVeku from './PopisekVeku';

const PopisekKategorie = ({ heightPercentage, pohlavi, showTyp, typ, vek, zkratka }) => {
  const {
    renderObrazekTypu,
    renderMezera,
    renderTextTypu,
    renderPohlavi,
    renderVek,
    renderZkratka
  } = usePopisek({ pohlavi, showTyp, vek, zkratka });

  return (
    <span style={{ fontSize: `${heightPercentage}%` }}>
      {renderObrazekTypu && <ObrazekTypu heightPercentage={heightPercentage} typ={typ} />}
      {renderMezera && ' '}
      {renderTextTypu && typ}
      {renderPohlavi && <ObrazekPohlavi heightPercentage={heightPercentage} pohlavi={pohlavi} />}
      {renderVek && <PopisekVeku vek={vek} />}
      {renderZkratka && ` (${zkratka})`}
    </span>
  );
};

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
