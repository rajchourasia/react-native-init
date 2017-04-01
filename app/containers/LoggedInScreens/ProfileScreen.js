import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {
  Avatar,
} from 'react-native-elements';

import { ActionCreators } from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  logoutContainer: {
    flex: 3,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 5,
  },
  logout: {
    marginTop: 20,
    color: '#0645AD',
  },
});

const ProfileScreen = (props) => (
  <View style={styles.container}>
    <View style={styles.profileContainer}>
      <Avatar
        medium
        rounded
        source={props.user.image && props.user.image.default ? {
          uri: props.user.image.default } : null
        }
        icon={{ name: 'user' }}
        containerStyle={{ width: 50, height: 50 }}
      />
      <Text style={styles.name}>
        {props.user ? props.user.name : null}
      </Text>
    </View>
    <View style={styles.logoutContainer}>
      <TouchableHighlight onPress={props.logOut}>
        <Text style={styles.logout}>Sign Out</Text>
      </TouchableHighlight>
    </View>
  </View>
);

ProfileScreen.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.shape({
      default: PropTypes.string,
    }),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
