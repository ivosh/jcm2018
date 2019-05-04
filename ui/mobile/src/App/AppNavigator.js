import React from 'react';
import Swiper from 'react-native-swiper';
import VitezoveKategorieScreen from '../screens/VitezoveKategorieScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsContainer from '../Settings/SettingsContainer';

const AppNavigator = () => (
  <Swiper style={styles.wrapper} showsPagination={false}>
    <VitezoveKategorieScreen />
    <SettingsContainer />
    <HomeScreen />
  </Swiper>
);

export default AppNavigator;

const styles = {
  wrapper: {}
};
