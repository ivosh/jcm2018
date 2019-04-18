import React from 'react';
import Swiper from 'react-native-swiper';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const styles = {
  wrapper: {}
};

export default () => (
  <Swiper style={styles.wrapper} showsPagination={false}>
    <HomeScreen />
    <LinksScreen />
    <SettingsScreen />
  </Swiper>
);
