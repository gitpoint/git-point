import { combineReducers } from 'redux';
import { union } from 'lodash';

import * as Actions from '../actions';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = types => {
  if (typeof types !== 'object' || Object.keys(types).length !== 3) {
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
  ORGS_GET_REPOS: paginate(Actions.ORGS_GET_REPOS),
  ORGS_GET_MEMBERS: paginate(Actions.ORGS_GET_MEMBERS),
  SEARCH_GET_REPOS: paginate(Actions.SEARCH_GET_REPOS),
  ACTIVITY_GET_NOTIFICATIONS: paginate(Actions.ACTIVITY_GET_NOTIFICATIONS),
});