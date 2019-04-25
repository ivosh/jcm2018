import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const PopisekVeku = ({ vek }) => (
  <Text>{`${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`}</Text>
);

PopisekVeku.propTypes = {
  vek: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired
};

export default PopisekVeku;
