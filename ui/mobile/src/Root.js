import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import WsClient from './ui-common/WsClient';
import configureStore, { loadState } from './store/configureStore';
import Main from './App/Main';

class Root extends React.Component {
  state = {
    isLoadingComplete: false,
    store: null
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      }),
      new Promise(async resolve => {
        const initialState = await loadState();
        const store = configureStore(
          new WsClient({ url: 'wss://jcm2019.herokuapp.com/' }),
          initialState
        );
        this.setState({ store });
        resolve(store);
      })
    ]);

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render = () =>
    this.state.isLoadingComplete && this.state.store ? (
      <Provider store={this.state.store}>
        <Main />
      </Provider>
    ) : (
      <AppLoading startAsync={this.loadResourcesAsync} onFinish={this.handleFinishLoading} />
    );
}

export default Root;
