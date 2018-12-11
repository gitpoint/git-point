import { combineReducers } from 'redux';
import { union } from 'lodash';

import * as Actions from '../actions';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = types => {
  if (typeof types !== 'object' || Object.keys(types).length !== 5) {
    throw new Error('Expected types to be an object of 5 props.');
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
      case types.RESET:
        return {
          isFetching: false,
          nextPageUrl: undefined,
          pageCount: 0,
          ids: [],
        };
      case types.SUCCESS:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.pagination.ids),
          nextPageUrl: action.pagination.nextPageUrl,
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
      case types.RESET:
      case types.SUCCESS:
      case types.ERROR:
        const key = action.id;

        //  console.log("PAGINATE", action);
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
  ACTIVITY_GET_EVENTS_RECEIVED: paginate(Actions.ACTIVITY_GET_EVENTS_RECEIVED),
  ACTIVITY_GET_STARRED_REPOS_FOR_USER: paginate(
    Actions.ACTIVITY_GET_STARRED_REPOS_FOR_USER
  ),
  SEARCH_REPOS: paginate(Actions.SEARCH_REPOS),
  SEARCH_USERS: paginate(Actions.SEARCH_USERS),
  SEARCH_ISSUES: paginate(Actions.SEARCH_ISSUES),
  ORGS_GET_MEMBERS: paginate(Actions.ORGS_GET_MEMBERS),
  REPOS_GET_CONTRIBUTORS: paginate(Actions.REPOS_GET_CONTRIBUTORS),
  REPOS_GET_ISSUE_TIMELINE: paginate(Actions.REPOS_GET_ISSUE_TIMELINE),
});
