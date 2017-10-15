import { Alert } from 'react-native';

export const actionNameForCall = (namespace, method, prefix = '') => {
  const upperCased = `${namespace}_${method}`
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase();

  return `${prefix}${upperCased}`;
};

export const splitArgs = (fn, args) => {
  const declaredArgsNumber = fn.length;
  const isMagicArgAvailable = args.length === declaredArgsNumber;

  return {
    pureArgs: isMagicArgAvailable ? args.slice(0, args.length - 1) : args,
    magicArg: isMagicArgAvailable ? args[args.length - 1] : {},
  };
};

// TODO: used mainly for developping this PR, but may come handy for #430
export const displayError = error => {
  Alert.alert('API Error', error);
};

export const getCountFromState = (state, name, key) =>
  state.counters[name] ? state.counters[name][key] : 0;
