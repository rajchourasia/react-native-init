import React, { PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#F5FCFF',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
});

const LoggedInScreen = (props) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      Welcome {props.user ? props.user.name : null}
    </Text>
    <TouchableHighlight onPress={props.logOut}>
      <Text>Sign out</Text>
    </TouchableHighlight>
  </View>
);

LoggedInScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  logOut: PropTypes.func,
};

export default LoggedInScreen;
