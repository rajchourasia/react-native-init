import React, { Component, PropTypes } from 'react';
import {
  Button,
  Text as RNEText,
} from 'react-native-elements';

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Alert,
  Text,
} from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../static/icomoon/selection.json';

const logoImage = require('../../static/logo.png');

const alertMessage = 'Because Goodreads is awesome';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSectionImage: {
    width: 100,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  quarterHeight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#553b08',
  },
  textLink: {
    fontSize: 16,
    color: '#0645AD',
    textAlign: 'center',
    marginTop: 10,
  },
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }
  login() {
    this.props.logIn();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.quarterHeight} />
        <View style={styles.logoSection} >
          <Image source={logoImage} style={styles.logoSectionImage} />
        </View>
        <View style={styles.quarterHeight} >
          <RNEText h4>
            Build Reading Habit
          </RNEText>
          <RNEText h4>
            Learn English
          </RNEText>
        </View>
        <View style={styles.loginSection} >
          <Button
            raised
            icon={{ name: 'goodreads-sign', type: 'custom', iconFunction: Icon, color: '#fff' }}
            title="Login With Goodreads"
            buttonStyle={styles.loginButton}
            onPress={() => { this.login(); }}
          />
          <TouchableHighlight
            onPress={() => Alert.alert(
              'Why Goodreads?',
              alertMessage,
              [
                { text: 'Got It!' },
              ]
            )}
          >
            <Text style={styles.textLink}>
              Why Goodreads?
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.quarterHeight} />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  logIn: PropTypes.func,
};

export default LoginScreen;
