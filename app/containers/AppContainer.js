import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ActionCreators } from '../actions';
import LoginScreen from './LoginScreen.js';
import LoggedInAppContainer from './LoggedInScreens/LoggedInAppContainer';

class AppContainer extends Component {
  componentWillMount() {
    this.props.getAuthenticatedUser();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.initialiased
      && (this.props.initialiased !== nextProps.initialiased)) {
      // Hide splash screen.
      SplashScreen.hide();
    }
  }
  render() {
    if (this.props.initialiased) {
      if (this.props.authenticated) {
        return <LoggedInAppContainer />;
      }
      return <LoginScreen {...this.props} />;
    }
    return <View />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    authenticated: state.application.authenticated,
    initialiased: state.application.initialiased,
  };
}

AppContainer.propTypes = {
  authenticated: PropTypes.bool,
  initialiased: PropTypes.bool,
  getAuthenticatedUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
