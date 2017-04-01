import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';

class LoggedInAppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'homeTab',
    };
  }
  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItemIOS
          title="Home"
          iconName="home"
          selectedIconName="home"
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
            });
          }}
        >
          <HomeScreen />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Profile"
          iconName="face"
          selectedIconName="face"
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}
        >
          <ProfileScreen />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

export default LoggedInAppContainer;
