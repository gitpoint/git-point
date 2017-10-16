import { Alert } from 'react-native';

export const actionNameForCall = (namespace, method, prefix = '') => {
  const upperCased = `${namespace}_${method}`
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase();

  return `${prefix}${upperCased}`;
};

export const splitArgs = (fn, args) => {
  const declaredArgsCount = fn.length;
  const isExtraArgAvailable = args.length === declaredArgsCount;

  return {
    pureArgs: isExtraArgAvailable ? args.slice(0, -1) : args,
    extraArg: isExtraArgAvailable ? args[args.length - 1] : {},
  };
};

// TODO: used mainly for developping this PR, but may come handy for #430
export const displayError = error => {
  Alert.alert('API Error', error);
};

export const getCountFromState = (state, name, key) =>
  state.counters[name] ? state.counters[name][key] : 0;

export const getPaginationFromState = (
  state,
  name,
  key,
  initialValue = { ids: [] }
) =>
  state.pagination[name] && state.pagination[name][key]
    ? state.pagination[name][key]
    : initialValue;