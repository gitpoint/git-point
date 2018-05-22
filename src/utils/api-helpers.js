import { Alert } from 'react-native';

export const getPaginationKey = args => args.join('-');

export const actionNameForCall = (namespace, method, prefix = '') => {
  const upperCased = `${namespace}_${method}`
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase();

  return `${prefix}${upperCased}`;
};

// TODO: used mainly for developping this PR, but may come handy for #430
export const displayError = error => {
  Alert.alert('API Error', error);

  return Promise.reject(error);
};
