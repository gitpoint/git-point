import { getLocale } from 'utils';
import {
  LOGIN,
  LOGOUT,
  GET_AUTH_USER,
  GET_AUTH_ORGS,
  CHANGE_LOCALE,
  GET_AUTH_STAR_COUNT,
} from './auth.type';

export const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  orgs: [],
  events: [],
  // TODO: there should not be a dependency here that can't be constructor injected.
  locale: getLocale(),
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingEvents: false,
  error: '',
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN.PENDING:
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload,
      };
    case LOGIN.ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT.PENDING:
      return {
        ...state,
        isSigningOut: true,
      };
    case LOGOUT.SUCCESS:
      return {
        ...initialState,
        hasInitialUser: false,
      };
    case LOGOUT.ERROR:
      return {
        ...state,
        isSigningOut: false,
        error: action.payload,
      };
    case GET_AUTH_USER.PENDING:
      return {
        ...state,
        isPendingUser: true,
      };
    case GET_AUTH_USER.SUCCESS:
      return {
        ...state,
        isPendingUser: false,
        hasInitialUser: true,
        user: action.payload,
      };
    case GET_AUTH_USER.ERROR:
      return {
        ...state,
        isPendingUser: false,
        error: action.payload,
      };
    case GET_AUTH_STAR_COUNT.PENDING:
      return {
        ...state,
        isPendingStarCount: true,
      };
    case GET_AUTH_STAR_COUNT.SUCCESS:
      return {
        ...state,
        isPendingStarCount: false,
        starCount: action.payload,
      };
    case GET_AUTH_STAR_COUNT.ERROR:
      return {
        ...state,
        isPendingStarCount: false,
        error: action.payload,
      };
    case GET_AUTH_ORGS.PENDING:
      return {
        ...state,
        isPendingOrgs: true,
      };
    case GET_AUTH_ORGS.SUCCESS:
      return {
        ...state,
        isPendingOrgs: false,
        orgs: action.payload,
      };
    case GET_AUTH_ORGS.ERROR:
      return {
        ...state,
        isPendingOrgs: false,
        error: action.payload,
      };
    case CHANGE_LOCALE.SUCCESS:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};
