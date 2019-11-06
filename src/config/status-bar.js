import { colors } from 'config';

const darkStatusBar = {
  translucent: false,
  backgroundColor: colors.grey,
  barStyle: 'dark-content',
};

const getLightStatusBar = routeName => ({
  translucent: true,
  backgroundColor: routeName === 'Login' ? colors.transparent : colors.black,
  barStyle: 'light-content',
});

const lightScreens = [
  'MyProfile',
  'Profile',
  'Organization',
  'Repository',
  'Login',
];

export const getStatusBarConfig = routeName =>
  lightScreens.includes(routeName)
    ? getLightStatusBar(routeName)
    : darkStatusBar;

export const getHeaderForceInset = routeName =>
  lightScreens.includes(routeName)
    ? { top: 'always', bottom: 'never' }
    : {};
