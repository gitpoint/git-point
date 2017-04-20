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

// WelcomeScreen
import Welcome from './src/screens/WelcomeScreen';

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
import Issue from './src/screens/IssueScreen';
import IssueSettings from './src/screens/IssueSettingsScreen';
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
  compose(applyMiddleware(reduxThunk, __DEV__ && logger), autoRehydrate())
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
      headerVisible: false,
    },
  },
  Organization: {
    screen: Organization,
    navigationOptions: {
      headerVisible: false,
    },
  },
  Repository: {
    screen: Repository,
    navigationOptions: {
      headerVisible: false,
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
  Issue: {
    screen: Issue,
    navigationOptions: {
      title: ({state}) => `#${state.params.issue.number}`,
    },
  },
  IssueSettings: {
    screen: IssueSettings,
    navigationOptions: {
      title: 'Settings',
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
        headerTitle: 'Events',
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
        headerVisible: false,
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
        headerVisible: false,
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
        tabBarIcon: ({tintColor}) => (
          <Icon
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            color={tintColor}
            name="home"
            size={33}
          />
        ),
      },
    },
    Notifications: {
      screen: NotificationsStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            color={tintColor}
            name="notifications"
            size={33}
          />
        ),
      },
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
            color={tintColor}
            name="search"
            size={33}
          />
        ),
      },
    },
    MyProfile: {
      screen: MyProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
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
        headerVisible: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerVisible: false,
      },
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        headerVisible: false,
      },
      path: 'welcome',
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  {
    headerMode: 'screen',
    URIPrefix: 'gitpoint://',
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
