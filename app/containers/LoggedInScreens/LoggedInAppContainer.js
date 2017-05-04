import React, { PropTypes, Component } from 'react';
import { TabBarIOS, NavigatorIOS } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import BookPreviewScreen from '../Books/BookPreviewScreen.js';

class LoggedInAppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'homeTab',
    };
  }
  componentWillUpdate(nextProps) {
    if (this.isReading(nextProps)
    && (!this.isReading(this.props)
    || this.props.reading.bookGrid !== nextProps.reading.bookGrid)) {
      this.setState({
        selectedTab: 'readingTab',
      });
    }
  }
  isReading(props) {
    if (props.reading && props.reading.status && props.reading.bookGrid) {
      return true;
    }
    return false;
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
        {this.isReading(this.props) &&
          <Icon.TabBarItemIOS
            key={this.props.reading.bookGrid}
            title="Reading"
            iconName="book"
            selectedIconName="book"
            selected={this.state.selectedTab === 'readingTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'readingTab',
              });
            }}
          >
            <NavigatorIOS
              initialRoute={{
                component: BookPreviewScreen,
                title: 'Reading',
                passProps: {
                  bookGrid: this.props.reading.bookGrid,
                },
              }}
              style={{ flex: 1 }}
            />
          </Icon.TabBarItemIOS>
        }
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

LoggedInAppContainer.propTypes = {
  reading: PropTypes.shape({
    state: PropTypes.string,
    bookGrid: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    reading: state.application.reading,
  };
}

export default connect(mapStateToProps)(LoggedInAppContainer);
