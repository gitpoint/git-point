import { combineReducers } from 'redux';
import union from 'lodash.union';

import { REPOS_BY_ORG, MEMBERS_BY_ORG } from '../actions/orgs';
import { REPOS_BY_SEARCH } from '../actions/search';
import { ACTIVITY_GET_EVENTS } from '../actions/activity';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = types => {
  if (typeof types !== 'object') {
    throw new Error('Expected types to be an object of three props.');
  }

  const updatePagination = (
    state = {
      isFetching: false,
      nextPageUrl: undefined,
      pageCount: 0,
      ids: [],
    },
    action
  ) => {
    switch (action.type) {
      case types.PENDING:
        return {
          ...state,
          isFetching: true,
        };
      case types.SUCCESS:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1,
        };
      case types.ERROR:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };

  /* eslint-disable no-case-declarations */
  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case types.PENDING:
      case types.SUCCESS:
      case types.ERROR:
        const key = action.id;

        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        return {
          ...state,
          [key]: updatePagination(state[key], action),
        };
      default:
        return state;
    }
  };
};

// Updates the pagination data for different actions.
export const pagination = combineReducers({
  eventsByUser: paginate(ACTIVITY_GET_EVENTS),
  reposByOrg: paginate(REPOS_BY_ORG),
  reposBySearch: paginate(REPOS_BY_SEARCH),
  membersByOrg: paginate(MEMBERS_BY_ORG),
});
