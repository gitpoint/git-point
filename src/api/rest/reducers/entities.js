import merge from 'lodash.merge';

// Updates an entity cache in response to any action with response.entities.
export const entities = (
  state = {
    users: {},
    orgs: {},
    repos: {},
    events: {},
  },
  action
) => {
  if (action && action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
};
