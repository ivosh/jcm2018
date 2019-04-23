import React from 'react';
import PropTypes from 'prop-types';
import { useObrazekTypu } from '../../../../common/Popisek/useObrazekPopisku';

const ObrazekTypu = ({ sizePercentage, typ }) => {
  const { source, width, height } = useObrazekTypu({ sizePercentage, typ });
  return <img src={source} alt={typ} title={typ} width={width} height={height} />;
};

ObrazekTypu.propTypes = {
  sizePercentage: PropTypes.number,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired
};

ObrazekTypu.defaultProps = {
  sizePercentage: 100
};

export default ObrazekTypu;
