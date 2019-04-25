import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import usePopisek from './usePopisek';
import ObrazekPohlavi from './ObrazekPohlavi';
import ObrazekTypu from './ObrazekTypu';
import PopisekVeku from './PopisekVeku';

const PopisekKategorie = ({ pohlavi, showTyp, sizePercentage, typ, vek, zkratka }) => {
  const {
    renderObrazekTypu,
    renderMezera,
    renderTextTypu,
    renderPohlavi,
    renderVek,
    renderZkratka
  } = usePopisek({ pohlavi, showTyp, vek, zkratka });

  return (
    <View style={[styles.container, { fontSize: `${sizePercentage}%` }]}>
      {renderObrazekTypu && <ObrazekTypu sizePercentage={sizePercentage} typ={typ} />}
      {renderMezera && <Text> </Text>}
      {renderTextTypu && <Text>typ</Text>}
      {renderPohlavi && <ObrazekPohlavi sizePercentage={sizePercentage} pohlavi={pohlavi} />}
      {renderVek && <PopisekVeku vek={vek} />}
      {renderZkratka && <Text> {zkratka}</Text>}
    </View>
  );
};

PopisekKategorie.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena']),
  showTyp: PropTypes.bool,
  sizePercentage: PropTypes.number,
  typ: PropTypes.oneOf(['cyklo', 'koloběžka', 'maraton', 'pěší', 'půlmaraton']).isRequired,
  vek: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  zkratka: PropTypes.string
};

PopisekKategorie.defaultProps = {
  pohlavi: undefined,
  showTyp: true,
  sizePercentage: 100,
  vek: undefined,
  zkratka: undefined
};

export default PopisekKategorie;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
