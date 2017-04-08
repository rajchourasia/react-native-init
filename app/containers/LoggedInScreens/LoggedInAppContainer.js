import React, { Component } from 'react';
import { TabBarIOS, NavigatorIOS } from 'react-native';
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
          <NavigatorIOS
            initialRoute={{
              component: HomeScreen,
              title: 'Home',
            }}
            style={{ flex: 1 }}
          />
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
