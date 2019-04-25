import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { useObrazekPohlavi } from '../../ui-common/Popisek/useObrazekPopisku';

const ObrazekPohlavi = ({ pohlavi, sizePercentage }) => {
  const { source, width, height } = useObrazekPohlavi({ pohlavi, sizePercentage });
  return <Image source={source} style={{ width, height }} />;
};

ObrazekPohlavi.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
  sizePercentage: PropTypes.number
};

ObrazekPohlavi.defaultProps = {
  sizePercentage: 100
};

export default ObrazekPohlavi;
