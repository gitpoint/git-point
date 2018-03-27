import { merge } from 'lodash';

// Updates an entity cache in response to any action with response.entities.
export const entities = (
  state = {
    events: {},
  },
  action
) => {
  if (action && action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
};
