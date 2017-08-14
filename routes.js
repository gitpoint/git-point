/* eslint-disable react/prop-types */
import React from 'react';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  NavigationActions,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import { colors } from 'config';
import { translate } from 'utils';

// Auth
import {
  SplashScreen,
  LoginScreen,
  WelcomeScreen,
  AuthProfileScreen,
  EventsScreen,
  PrivacyPolicyScreen,
  UserOptionsScreen,
} from 'auth';

// User
import {
  ProfileScreen,
  RepositoryListScreen,
  FollowerListScreen,
  FollowingListScreen,
} from 'user';

// Organization
import { OrganizationProfileScreen } from 'organization';

// Search
import { SearchScreen } from 'search';

// Notifications
import { NotificationsScreen } from 'notifications';

// Repository
import {
  RepositoryScreen,
  RepositoryCodeListScreen,
  RepositoryFileScreen,
  IssueListScreen,
  PullListScreen,
  PullDiffScreen,
  ReadMeScreen,
} from 'repository';

// Issue
import {
  IssueScreen,
  IssueSettingsScreen,
  NewIssueScreen,
  PullMergeScreen,
} from 'issue';

const sharedRoutes = {
  RepositoryList: {
    screen: RepositoryListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  FollowerList: {
    screen: FollowerListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  FollowingList: {
    screen: FollowingListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  AuthProfile: {
    screen: AuthProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  Organization: {
    screen: OrganizationProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  Repository: {
    screen: RepositoryScreen,
    navigationOptions: {
      header: null,
    },
  },
  RepositoryCodeList: {
    screen: RepositoryCodeListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.topLevel
        ? navigation.state.params.title
        : navigation.state.params.content.name,
    }),
  },
  RepositoryFile: {
    screen: RepositoryFileScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.content.name,
    }),
  },
  IssueList: {
    screen: IssueListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  PullList: {
    screen: PullListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  Issue: {
    screen: IssueScreen,
    navigationOptions: ({ navigation }) => {
      const issueNumberRegex = /issues\/([0-9]+)$/;
      const { issue, issueURL, isPR, language } = navigation.state.params;
      const number = issue ? issue.number : issueURL.match(issueNumberRegex)[1];
      const langKey = isPR ? 'pullRequest' : 'issue';
      const langTitle = translate(`issue.main.screenTitles.${langKey}`, language);

      return {
        title: `${langTitle} #${number}`,
      };
    },
  },
  IssueSettings: {
    screen: IssueSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  NewIssue: {
    screen: NewIssueScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  PullDiff: {
    screen: PullDiffScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  PullMerge: {
    screen: PullMergeScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  ReadMe: {
    screen: ReadMeScreen,
    navigationOptions: {
      title: 'README.md',
    },
  },
  PrivacyPolicy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
  UserOptions: {
    screen: UserOptionsScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  },
};

const HomeStackNavigator = StackNavigator(
  {
    Events: {
      screen: EventsScreen,
      navigationOptions: {
        headerTitle: 'GitPoint',
      },
    },
    ...sharedRoutes,
  },
  {
    headerMode: 'screen',
  }
);

const NotificationsStackNavigator = StackNavigator(
  {
    Notifications: {
      screen: NotificationsScreen,
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
      screen: SearchScreen,
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
      screen: AuthProfileScreen,
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
        tabBarIcon: ({ tintColor }) =>
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="home"
            size={33}
          />,
      },
    },
    Notifications: {
      screen: NotificationsStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="notifications"
            size={33}
          />,
      },
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="search"
            size={33}
          />,
      },
    },
    MyProfile: {
      screen: MyProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="person"
            size={33}
          />,
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.primaryDark,
      inactiveTintColor: colors.grey,
    },
    tabBarComponent: ({ jumpToIndex, ...props }) =>
      <TabBarBottom
        {...props}
        jumpToIndex={index => {
          const { dispatch, state } = props.navigation;

          if (state.index === index && state.routes[index].routes.length > 1) {
            const stackRouteName = [
              'Events',
              'Notifications',
              'Search',
              'MyProfile',
            ][index];

            dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: stackRouteName }),
                ],
              })
            );
          } else {
            jumpToIndex(index);
          }
        }}
      />,
  }
);

export const GitPoint = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Welcome: {
      screen: WelcomeScreen,
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
