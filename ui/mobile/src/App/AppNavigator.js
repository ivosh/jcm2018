import React from 'react';
import Swiper from 'react-native-swiper';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthCheck from '../auth/AuthCheck';
import SignIn from '../auth/SignIn/SignInContainer';
import VitezoveKategorieScreen from '../screens/VitezoveKategorieScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsContainer from '../Settings/SettingsContainer';

const AppStack = () => (
  <Swiper style={styles.wrapper} showsPagination={false}>
    <VitezoveKategorieScreen />
    <SettingsContainer />
    <HomeScreen />
  </Swiper>
);

const AuthStack = createStackNavigator({ SignIn });

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthCheck,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthCheck'
    }
  )
);

export default AppNavigator;

const styles = {
  wrapper: {}
};
