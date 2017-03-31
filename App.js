import React, {Component} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  LayoutAnimation,
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import colors from './src/config/colors';

//SplashScreen
import Splash from './src/screens/SplashScreen';

// LoginScreen
import Login from './src/screens/LoginScreen';

// Main Tab Screens
import MyProfile from './src/screens/MyProfileScreen';
import Profile from './src/screens/ProfileScreen';
import Search from './src/screens/SearchScreen';
import Notifications from './src/screens/NotificationsScreen';
import Home from './src/screens/HomeScreen';

//Stack Screen
import ListRender from './src/screens/ListRenderScreen';
import Organization from './src/screens/OrganizationScreen';
import Repository from './src/screens/RepositoryScreen';
import RepositoryCodeList from './src/screens/RepositoryCodeListScreen';
import IssuesList from './src/screens/IssuesListScreen';
import ReadMe from './src/screens/ReadMe';

// Redux Store
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/reducers';

import {persistStore, autoRehydrate} from 'redux-persist';

import createLogger from 'redux-logger';

const logger = createLogger();
import reduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(reduxThunk, logger), autoRehydrate())
);

const sharedRoutes = {
  ListRender: {
    screen: ListRender,
    navigationOptions: {
      title: ({state}) => `${state.params.listType}`,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: {
        visible: false,
      },
    },
  },
  Organization: {
    screen: Organization,
    navigationOptions: {
      header: {
        visible: false,
      },
    },
  },
  Repository: {
    screen: Repository,
    navigationOptions: {
      header: {
        visible: false,
      },
    },
  },
  RepositoryCodeList: {
    screen: RepositoryCodeList,
    navigationOptions: {
      title: ({state}) => state.params.topLevel ? 'Code' : `${state.params.content.name}`,
    },
  },
  IssuesList: {
    screen: IssuesList,
    navigationOptions: {
      title: ({state}) => state.params.type === 'issue' ? 'Issues' : 'Pull Requests',
    },
  },
  ReadMe: {
    screen: ReadMe,
    navigationOptions: {
      title: 'README.md',
    },
  },
};

const HomeStackNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: {
          title: 'Events',
        },
      },
    },
    ...sharedRoutes
  },
  {
    headerMode: 'screen',
  }
);

const NotificationsStackNavigator = StackNavigator(
  {
    Notifications: {
      screen: Notifications,
    },
    ...sharedRoutes,
  },
  {
    headerMode: 'screen',
  }
);

const SearchStackNavigator = StackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        header: {
          visible: false,
        },
      },
    },
    ...sharedRoutes,
  },
  {
    headerMode: 'screen',
  }
);

const MyProfileStackNavigator = StackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: {
          visible: false,
        },
      },
    },
    ...sharedRoutes,
  },
  {
    headerMode: 'screen',
  }
);

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (
            <Icon
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              color={tintColor}
              name="home"
              size={33}
            />
          ),
        },
      },
    },
    Notifications: {
      screen: NotificationsStackNavigator,
      navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (
            <Icon
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              color={tintColor}
              name="notifications"
              size={33}
            />
          ),
        },
      },
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (
            <Icon
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              color={tintColor}
              name="search"
              size={33}
            />
          ),
        },
      },
    },
    MyProfile: {
      screen: MyProfileStackNavigator,
      navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (
            <Icon
              containerStyle={{justifyContent: 'center', alignItems: 'center'}}
              color={tintColor}
              name="person"
              size={33}
            />
          ),
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.primarydark,
      inactiveTintColor: colors.grey,
    },
  }
);

const GitPoint = StackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: {
          visible: false,
        },
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: {
          visible: false,
        },
      },
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: {
          visible: false,
        },
      },
      path: 'home',
    },
  },
  {
    headerMode: 'screen',
    containerOptions: {
      URIPrefix: 'gitpoint://',
    },
  }
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      rehydrated: false,
    };
  }

  componentWillMount() {
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({rehydrated: true});
    });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    if (!this.state.rehydrated)
      return (
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./src/images/logo-black.png')}
          />
        </View>
      );
    return (
      <Provider store={store}>
        <GitPoint />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

AppRegistry.registerComponent('GitPoint', () => App);
