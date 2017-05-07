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
import IssueList from './src/screens/IssueListScreen';
import PullList from './src/screens/PullListScreen';
import Issue from './src/screens/IssueScreen';
import IssueSettings from './src/screens/IssueSettingsScreen';
import ReadMe from './src/screens/ReadMe';
import PullDiff from './src/screens/PullDiffScreen';

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
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.listType,
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },
  Organization: {
    screen: Organization,
    navigationOptions: {
      header: null,
    },
  },
  Repository: {
    screen: Repository,
    navigationOptions: {
      header: null,
    },
  },
  RepositoryCodeList: {
    screen: RepositoryCodeList,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.topLevel ? 'Code' : navigation.state.params.content.name,
    })
  },
  IssueList: {
    screen: IssueList,
    navigationOptions: {
      title: 'Issues',
    },
  },
  PullList: {
    screen: PullList,
    navigationOptions: {
      title: 'Pull Requests',
    },
  },
  Issue: {
    screen: Issue,
    navigationOptions: ({ navigation }) => ({
      title: `#${navigation.state.params.issue ? navigation.state.params.issue.number : 'Issue'}`,
    })
  },
  IssueSettings: {
    screen: IssueSettings,
    navigationOptions: {
      title: 'Settings',
    },
  },
  PullDiff: {
    screen: PullDiff,
    navigationOptions: {
      title: 'Diff',
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
        headerTitle: 'GitPoint',
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
      navigationOptions: {
        header: null,
      },
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
        header: null,
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
        header: null,
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
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
      path: 'welcome',
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
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
