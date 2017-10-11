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
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};
