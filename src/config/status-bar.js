import { colors } from 'config';

export const darkStatusBar = {
  translucent: false,
  backgroundColor: () => colors.grey,
  barStyle: 'dark-content',
};

export const lightStatusBar = {
  translucent: true,
  backgroundColor: routeName =>
    routeName === 'Login' ? colors.transparent : colors.black,
  barStyle: 'light-content',
};

export const lightScreens = [
  'MyProfile',
  'Profile',
  'Organization',
  'Repository',
  'Login',
];
