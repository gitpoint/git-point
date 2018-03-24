import React from 'react';
import { CLIENT_SECRET } from 'api';
import { authReducer, initialState } from 'auth/auth.reducer';
import {
  CHANGE_LOCALE,
  GET_AUTH_ORGS,
  GET_AUTH_STAR_COUNT,
  GET_AUTH_USER,
  LOGIN,
  LOGOUT,
} from 'auth/auth.type';
import { user } from 'testData/api/user';
import { events } from 'testData/api/users';
import { authError } from 'testData/api/error';

describe('Auth Reducer', () => {
  /**
   * Login.
   */
  it('should set isLoggingIn: true and isAuthenticated: false when LOGIN.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isLoggingIn: true,
      isAuthenticated: false,
    };
    const action = {
      type: LOGIN.PENDING,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an access token from payload of LOGIN.SUCCESS action and set isLoggingIn: false, isAuthenticated: true', () => {
    const expectedState = {
      ...initialState,
      isLoggingIn: false,
      isAuthenticated: true,
      accessToken: CLIENT_SECRET,
    };
    const action = {
      type: LOGIN.SUCCESS,
      payload: CLIENT_SECRET,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of LOGIN.ERROR action and set isLoggingIn: false, isAuthenticated: false', () => {
    const expectedState = {
      ...initialState,
      isLoggingIn: false,
      isAuthenticated: false,
      error: authError,
    };
    const action = {
      type: LOGIN.ERROR,
      payload: authError,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Logout.
   */
  it('should set isSigningOut: true when LOGOUT.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isSigningOut: true,
    };
    const action = {
      type: LOGOUT.PENDING,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set hasInitialUser: false when LOGOUT.SUCCESS action is dispatched', () => {
    const expectedState = {
      ...initialState,
      hasInitialUser: false,
    };
    const action = {
      type: LOGOUT.SUCCESS,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of LOGOUT.ERROR action and set isSigningOut: false', () => {
    const expectedState = {
      ...initialState,
      isSigningOut: false,
      error: authError,
    };
    const action = {
      type: LOGOUT.ERROR,
      payload: authError,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Get authenticated user data.
   */
  it('should set isPendingUser: true when GET_AUTH_USER.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingUser: true,
    };
    const action = {
      type: GET_AUTH_USER.PENDING,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set user data from payload of GET_AUTH_USER.SUCCESS action and set isPendingUser: false, hasInitialUser: true', () => {
    const expectedState = {
      ...initialState,
      isPendingUser: false,
      hasInitialUser: true,
      user,
    };
    const action = {
      type: GET_AUTH_USER.SUCCESS,
      payload: user,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of GET_AUTH_USER.ERROR action and set isLoggingIn: false, isAuthenticated: false', () => {
    const expectedState = {
      ...initialState,
      isPendingUser: false,
      error: authError,
    };
    const action = {
      type: GET_AUTH_USER.ERROR,
      payload: authError,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Number of starred repos for user.
   */
  it('should set isPendingStarCount: true when GET_AUTH_STAR_COUNT.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingStarCount: true,
    };
    const action = {
      type: GET_AUTH_STAR_COUNT.PENDING,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set starCount from payload of GET_AUTH_STAR_COUNT.SUCCESS action and set isPendingStarCount: false', () => {
    const starCount = 5;
    const expectedState = {
      ...initialState,
      isPendingStarCount: false,
      starCount,
    };
    const action = {
      type: GET_AUTH_STAR_COUNT.SUCCESS,
      payload: starCount,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of GET_AUTH_STAR_COUNT.ERROR action and set isPendingStarCount: false', () => {
    const expectedState = {
      ...initialState,
      isPendingStarCount: false,
      error: authError,
    };
    const action = {
      type: GET_AUTH_STAR_COUNT.ERROR,
      payload: authError,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Get orgs for user.
   */
  it('should set isPendingOrgs: true when GET_AUTH_ORGS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingOrgs: true,
    };
    const action = {
      type: GET_AUTH_ORGS.PENDING,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set orgs from payload of GET_AUTH_ORGS.SUCCESS action and set isPendingOrgs: false', () => {
    const orgs = ['git-point', 'test org'];
    const expectedState = {
      ...initialState,
      isPendingOrgs: false,
      orgs,
    };
    const action = {
      type: GET_AUTH_ORGS.SUCCESS,
      payload: orgs,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set an error from payload of GET_AUTH_ORGS.ERROR action and set isPendingOrgs: false', () => {
    const expectedState = {
      ...initialState,
      isPendingOrgs: false,
      error: authError,
    };
    const action = {
      type: GET_AUTH_ORGS.ERROR,
      payload: authError,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Set locale.
   */
  it('should set a locale from payload of CHANGE_LOCALE.SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      locale: 'en',
    };
    const action = {
      type: CHANGE_LOCALE.SUCCESS,
      payload: 'en',
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
