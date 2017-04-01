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
    if (nextProps.application.initialiased
      && (this.props.application.initialiased !== nextProps.application.initialiased)) {
      // Hide splash screen.
      SplashScreen.hide();
    }
  }
  render() {
    if (this.props.application && this.props.application.initialiased) {
      if (this.props.application.authenticated) {
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
    application: state.application,
  };
}

AppContainer.propTypes = {
  application: PropTypes.shape({
    authenticated: PropTypes.bool,
    initialiased: PropTypes.bool,
  }),
  getAuthenticatedUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
