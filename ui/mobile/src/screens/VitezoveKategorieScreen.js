import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import moment from 'moment';
import VitezKategorie from '../components/VitezKategorie';
import PopisekKategorie from '../components/Popisek/PopisekKategorie';

const kategorie = {
  pohlavi: 'muž',
  typ: 'maraton',
  vek: { min: 18, max: 30 }
};

const prvni = {
  cas: moment.duration('PT4H15M32.45S'),
  jmeno: 'Václav Zakouřil',
  narozeni: 1945,
  umisteni: 1
};
const druhy = {
  cas: moment.duration('PT2H17M29.14S'),
  jmeno: 'Roman Smeták',
  narozeni: 1986,
  umisteni: 2
};
const treti = {
  cas: moment.duration('PT3H27M42.38S'),
  jmeno: 'František Beran',
  narozeni: 1974,
  umisteni: 3
};

const VitezoveKategorieScreen = () => (
  <View style={styles.container}>
    <View style={styles.kategorieContainer}>
      <View style={styles.kategorie}>
        <PopisekKategorie {...kategorie} />
      </View>
    </View>

    <View style={styles.vitezove}>
      <VitezKategorie containerStyle={styles.vitez} {...treti} />
      <VitezKategorie containerStyle={styles.vitez} {...prvni} />
      <VitezKategorie containerStyle={styles.vitez} {...druhy} />
    </View>
  </View>
);

export default VitezoveKategorieScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 30
  },
  kategorie: {
    backgroundColor: '#b0ffb5',
    borderRadius: 8,
    borderWidth: 2,
    padding: 8
  },
  kategorieContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  vitez: {
    margin: 10,
    width: Dimensions.get('window').height / 3
  },
  vitezove: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
