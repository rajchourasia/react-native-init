import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

class LoginScreen extends Component {
  login() {
    this.props.logIn();
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.buttonWrapper} onPress={() => { this.login(); }}>
          <Text style={styles.buttonText}>
            Login Here
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  logIn: PropTypes.func,
};

export default LoginScreen;
