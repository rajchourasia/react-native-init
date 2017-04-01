import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { ActionCreators } from '../../actions';

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

const AccountsScreen = (props) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      Welcome {props.user ? props.user.name : null}
    </Text>
    <TouchableHighlight onPress={props.logOut}>
      <Text>Sign out</Text>
    </TouchableHighlight>
  </View>
);

AccountsScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  logOut: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsScreen);
