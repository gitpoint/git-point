import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  LayoutAnimation
} from "react-native";
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationActions
} from "react-navigation";
import { Icon } from "react-native-elements";
import config from "config";

//Auth
import { SplashScreen } from "auth";
import { LoginScreen } from "auth";
import { WelcomeScreen } from "auth";
import { AuthProfileScreen } from "auth";
import { EventsScreen } from "auth";

//User
import { ProfileScreen } from "user";
import { RepositoryListScreen } from "user";
import { FollowerListScreen } from "user";
import { FollowingListScreen } from "user";

//Organization
import { OrganizationProfileScreen } from "organization";

//Search
import { SearchScreen } from "search";

//Notifications
import { NotificationsScreen } from "notifications";

//Repository
import { RepositoryScreen } from "repository";
import { RepositoryCodeListScreen } from "repository";
import { RepositoryFileScreen } from "repository";
import { IssueListScreen } from "repository";
import { PullListScreen } from "repository";
import { PullDiffScreen } from "repository";
import { ReadMeScreen } from "repository";

//Issue
import { IssueScreen } from "issue";
import { IssueSettingsScreen } from "issue";

// Redux Store
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer";

import { persistStore, autoRehydrate } from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";

import createLogger from "redux-logger";

const logger = createLogger();
import reduxThunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(reduxThunk, __DEV__ && logger), autoRehydrate())
);

// Device Info
import DeviceInfo from "react-native-device-info";

// md5
import md5 from "md5";

const sharedRoutes = {
  RepositoryList: {
    screen: RepositoryListScreen,
    navigationOptions: {
      title: "Repositories"
    }
  },
  FollowerList: {
    screen: FollowerListScreen,
    navigationOptions: {
      title: "Followers"
    }
  },
  FollowingList: {
    screen: FollowingListScreen,
    navigationOptions: {
      title: "Following"
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  Organization: {
    screen: OrganizationProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  Repository: {
    screen: RepositoryScreen,
    navigationOptions: {
      header: null
    }
  },
  RepositoryCodeList: {
    screen: RepositoryCodeListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.topLevel
        ? "Code"
        : navigation.state.params.content.name
    })
  },
  RepositoryFile: {
    screen: RepositoryFileScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.content.name
    })
  },
  IssueList: {
    screen: IssueListScreen,
    navigationOptions: {
      title: "Issues"
    }
  },
  PullList: {
    screen: PullListScreen,
    navigationOptions: {
      title: "Pull Requests"
    }
  },
  Issue: {
    screen: IssueScreen,
    navigationOptions: ({ navigation }) => ({
      title: `#${navigation.state.params.issue ? navigation.state.params.issue.number : "Issue"}`
    })
  },
  IssueSettings: {
    screen: IssueSettingsScreen,
    navigationOptions: {
      title: "Settings"
    }
  },
  PullDiff: {
    screen: PullDiffScreen,
    navigationOptions: {
      title: "Diff"
    }
  },
  ReadMe: {
    screen: ReadMeScreen,
    navigationOptions: {
      title: "README.md"
    }
  }
};

const HomeStackNavigator = StackNavigator(
  {
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        headerTitle: "Events"
      }
    },
    ...sharedRoutes
  },
  {
    headerMode: "screen"
  }
);

const NotificationsStackNavigator = StackNavigator(
  {
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        header: null
      }
    },
    ...sharedRoutes
  },
  {
    headerMode: "screen"
  }
);

const SearchStackNavigator = StackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    ...sharedRoutes
  },
  {
    headerMode: "screen"
  }
);

const MyProfileStackNavigator = StackNavigator(
  {
    MyProfile: {
      screen: AuthProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    ...sharedRoutes
  },
  {
    headerMode: "screen"
  }
);

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: "center", alignItems: "center" }}
            color={tintColor}
            name="home"
            size={33}
          />
        )
      }
    },
    Notifications: {
      screen: NotificationsStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: "center", alignItems: "center" }}
            color={tintColor}
            name="notifications"
            size={33}
          />
        )
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: "center", alignItems: "center" }}
            color={tintColor}
            name="search"
            size={33}
          />
        )
      }
    },
    MyProfile: {
      screen: MyProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            containerStyle={{ justifyContent: "center", alignItems: "center" }}
            color={tintColor}
            name="person"
            size={33}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: config.colors.primarydark,
      inactiveTintColor: config.colors.grey
    },
    tabBarComponent: ({ jumpToIndex, ...props }) => (
      <TabBarBottom
        {...props}
        jumpToIndex={index => {
          const { dispatch, state } = props.navigation;

          if (state.index === index && state.routes[index].routes.length > 1) {
            const stackRouteName = [
              "Events",
              "Notifications",
              "Search",
              "MyProfile"
            ][index];

            dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: stackRouteName })
                ]
              })
            );
          } else {
            jumpToIndex(index);
          }
        }}
      />
    )
  }
);

const GitPoint = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      },
      path: "welcome"
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerMode: "screen",
    URIPrefix: "gitpoint://"
  }
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    const encryptor = createEncryptor({
      secretKey: md5(DeviceInfo.getUniqueID())
    });

    persistStore(
      store,
      { storage: AsyncStorage, transforms: [encryptor] },
      () => {
        this.setState({ rehydrated: true });
      }
    );
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
            source={require("./src/assets/logo-black.png")}
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
    backgroundColor: config.colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100
  }
});

AppRegistry.registerComponent("GitPoint", () => App);
