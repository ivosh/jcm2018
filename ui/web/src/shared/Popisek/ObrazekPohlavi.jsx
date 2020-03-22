import React from 'react';
import PropTypes from 'prop-types';
import { useObrazekPohlavi } from 'ui-common/Popisek/useObrazekPopisku';

const ObrazekPohlavi = ({ pohlavi, sizePercentage }) => {
  const { source, width, height } = useObrazekPohlavi({ pohlavi, sizePercentage });
  return <img src={source} alt={pohlavi} title={pohlavi} width={width} height={height} />;
};

ObrazekPohlavi.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
  sizePercentage: PropTypes.number,
};

ObrazekPohlavi.defaultProps = {
  sizePercentage: 100,
};

export default ObrazekPohlavi;
