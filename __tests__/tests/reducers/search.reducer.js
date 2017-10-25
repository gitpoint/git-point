import React from 'react';
import { searchReducer, initialState } from 'search/search.reducer';
import { SEARCH_REPOS, SEARCH_USERS } from 'search/search.type';
import { repos, users } from 'testData/api/search';
import { authError } from 'testData/api/error';

describe('Search Reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  /**
   * Search repositories.
   */
  it('should set repos to empty and set isPendingSearchRepos to true when SEARCH_REPOS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      repos: [],
      isPendingSearchRepos: true,
    };
    const action = {
      type: SEARCH_REPOS.PENDING,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set repos from payload of SEARCH_REPOS.SUCCESS action and set isPendingSearchRepos to false', () => {
    const expectedState = {
      ...initialState,
      repos: repos.items,
      isPendingSearchRepos: false,
    };
    // The 'searchRepos' action creator dispatches this action with repos.items payload.
    const action = {
      type: SEARCH_REPOS.SUCCESS,
      payload: repos.items,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of SEARCH_REPOS.ERROR action and set isPendingSearchRepos to false', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingSearchRepos: false,
    };
    // The 'searchRepos' action creator dispatches this action with data.items payload.
    const action = {
      type: SEARCH_REPOS.ERROR,
      payload: authError,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Search users.
   */
  it('should set users to empty and set isPendingSearchUsers to true when SEARCH_USERS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      users: [],
      isPendingSearchUsers: true,
    };
    const action = {
      type: SEARCH_USERS.PENDING,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set users from payload of SEARCH_USERS.SUCCESS action and set isPendingSearchUsers to false', () => {
    const expectedState = {
      ...initialState,
      users: users.items,
      isPendingSearchUsers: false,
    };
    // The 'searchUsers' action creator dispatches this action with data.items payload.
    const action = {
      type: SEARCH_USERS.SUCCESS,
      payload: users.items,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of SEARCH_USERS.ERROR action and set isPendingSearchUsers to false', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingSearchUsers: false,
    };
    // The 'searchRepos' action creator dispatches this action with repos.items payload.
    const action = {
      type: SEARCH_REPOS.ERROR,
      payload: authError,
    };

    expect(searchReducer(initialState, action)).toEqual(expectedState);
  });
});
