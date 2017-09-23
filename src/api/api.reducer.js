import merge from 'lodash/merge';
import union from 'lodash/union';
import { combineReducers } from 'redux';

import * as ActionTypes from './api.type';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  console.log('paginate()', types);

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

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
      case requestType:
        return {
          ...state,
          isFetching: true,
        };
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1,
        };
      case failureType:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
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

// Updates an entity cache in response to any action with response.entities.
export const entities = (
  state = {
    users: {},
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

// Updates error message to notify about the failed fetches.
export const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

// Updates the pagination data for different actions.
export const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED.PENDING,
      ActionTypes.STARRED.SUCCESS,
      ActionTypes.STARRED.ERROR,
    ],
  }),
  followersByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.FOLLOWERS.PENDING,
      ActionTypes.FOLLOWERS.SUCCESS,
      ActionTypes.FOLLOWERS.ERROR,
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS.PENDING,
      ActionTypes.STARGAZERS.SUCCESS,
      ActionTypes.STARGAZERS.ERROR,
    ],
  }),
});
