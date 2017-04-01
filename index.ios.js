/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import AppContainer from './app/containers/AppContainer';
import configureStore from './app/store/configureStore';

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('ReactNativeInit', () => App);
