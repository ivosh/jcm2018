import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import StylePropType from 'react-style-proptype';
import convertDuration from '../ui-common/convertDuration';

const jednotkaBedny = 40;

const VitezKategorie = ({ cas, containerStyle, jmeno, narozeni, umisteni }) => {
  const { hours, mins, secs, subsecs } = convertDuration(cas);

  return (
    <View style={[containerStyle, styles.container]}>
      <View style={styles.inicialyContainer}>
        <Text style={[styles.inicialy, styles.jmeno]}>{jmeno}</Text>
        <Text style={styles.inicialy}>{narozeni}</Text>
        <Text style={[styles.inicialy, styles.cas]}>{`${hours}:${mins}:${secs}.${subsecs}`}</Text>
      </View>
      <View style={[styles.bedna, { height: (3 * jednotkaBedny) / umisteni + 20 }]}>
        <Text style={styles.umisteni}>{umisteni}</Text>
      </View>
    </View>
  );
};

export default VitezKategorie;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end'
  },
  inicialy: {
    marginBottom: 3
  },
  inicialyContainer: {
    alignItems: 'center',
    paddingBottom: 15
  },
  jmeno: {
    fontWeight: '500'
  },
  cas: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 4,
    paddingRight: 2
  },
  bedna: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 128, 249, 0.3)',
    borderRadius: 5,
    justifyContent: 'center'
  },
  umisteni: {
    fontSize: jednotkaBedny
  }
});

VitezKategorie.propTypes = {
  cas: momentPropTypes.momentDurationObj.isRequired,
  containerStyle: StylePropType,
  jmeno: PropTypes.string.isRequired,
  narozeni: PropTypes.number.isRequired,
  umisteni: PropTypes.oneOf([1, 2, 3]).isRequired
};

VitezKategorie.defaultProps = {
  containerStyle: undefined
};
