import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';

import AccountsScreen from './AccountsScreen';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

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
          iconName="ios-home-outline"
          selectedIconName="ios-home"
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
          title="Account"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.state.selectedTab === 'accountsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'accountsTab',
            });
          }}
        >
          <AccountsScreen />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

export default LoggedInAppContainer;
