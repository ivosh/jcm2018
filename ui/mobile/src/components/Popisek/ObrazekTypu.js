import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { useObrazekTypu } from '../../ui-common/Popisek/useObrazekPopisku';

const ObrazekTypu = ({ sizePercentage, typ }) => {
  const { source, width, height } = useObrazekTypu({ sizePercentage, typ });
  return <Image source={source} style={{ width, height }} />;
};

ObrazekTypu.propTypes = {
  sizePercentage: PropTypes.number,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired
};

ObrazekTypu.defaultProps = {
  sizePercentage: 100
};

export default ObrazekTypu;
