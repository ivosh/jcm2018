import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MonoText } from '../components/StyledText';

const VitezoveKategorieScreen = () => (
  <View style={styles.container}>
    <View style={styles.kategorieContainer}>
      <Text style={styles.kategorie}>maraton muži 18-30</Text>
    </View>

    <View style={styles.getStartedContainer}>
      <Text style={styles.getStartedText}>Get started by opening</Text>

      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
        <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
      </View>

      <Text style={styles.getStartedText}>Tak to je hustý, fakt že jo!</Text>
    </View>
  </View>
);

export default VitezoveKategorieScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30
  },
  kategorieContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  kategorie: {
    backgroundColor: '#b0ffb5',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  }
});
