import React, { PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
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

const HomeScreen = (props) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      Welcome
    </Text>
  </View>
);

HomeScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  logOut: PropTypes.func,
};

export default HomeScreen;
