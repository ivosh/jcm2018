import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './AppNavigator';

const Main = () => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <AppNavigator />
  </View>
);

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
