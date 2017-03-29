import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

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
  buttonWrapper: {
    backgroundColor: '#553b08',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  pitchText: {
    fontSize: 26,
    textAlign: 'center',
  },
  textLink: {
    fontSize: 16,
    color: '#0645AD',
    textAlign: 'center',
    marginTop: 10,
  },
});

const alertMessage = 'Because Goodreads is awesome';
const logoImage = require('../../static/logo.png');

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
          <Text style={styles.pitchText}>
            Build Reading Habit
          </Text>
          <Text style={styles.pitchText}>
            Learn English
          </Text>
        </View>
        <View style={styles.loginSection} >
          <TouchableHighlight style={styles.buttonWrapper} onPress={() => { this.login(); }}>
            <Text style={styles.buttonText}>
              Login With Goodreads
            </Text>
          </TouchableHighlight>
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
