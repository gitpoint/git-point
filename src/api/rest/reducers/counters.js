import { merge } from 'lodash';

// Updates an entity cache in response to any action with response.counters.
export const counters = (state = {}, action) => {
  if (action && action.counters) {
    const pushed = {};

    pushed[action.name] = {};
    pushed[action.name][action.key] = action.counters;

    return merge({}, state, pushed);
  }

  return state;
};
