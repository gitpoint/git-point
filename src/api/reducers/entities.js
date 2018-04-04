import { isArray, mergeWith } from 'lodash';

// Updates an entity cache in response to any action with response.entities.
export const entities = (
  state = {
    events: {},
    orgs: {},
    repos: {},
    users: {},
    issues: {},
    issue_comments: {},
    issue_events: {},
    issue_labels: {},
  },
  action
) => {
  if (action && action.entities) {
    return mergeWith({}, state, action.entities, (objValue, srcValue) => {
      if (isArray(objValue) && isArray(srcValue)) {
        return srcValue;
      }

      return undefined;
    });
  }

  return state;
};
