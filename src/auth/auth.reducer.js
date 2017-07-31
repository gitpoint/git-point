import I18n from 'react-native-i18n';
import {
  LOGIN,
  LOGOUT,
  GET_AUTH_USER,
  GET_AUTH_ORGS,
  GET_EVENTS,
  CHANGE_LANGUAGE,
} from './auth.type';

const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  orgs: [],
  events: [],
  language: I18n.locale.substr(0, 2),
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
    case LOGIN.FAILURE:
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
    case LOGOUT.FAILURE:
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
        user: action.payload,
        isPendingUser: false,
        hasInitialUser: true,
      };
    case GET_AUTH_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case GET_AUTH_ORGS.PENDING:
      return {
        ...state,
        isPendingOrgs: true,
      };
    case GET_AUTH_ORGS.SUCCESS:
      return {
        ...state,
        orgs: action.payload,
        isPendingOrgs: false,
      };
    case GET_AUTH_ORGS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingOrgs: false,
      };
    case GET_EVENTS.PENDING:
      return {
        ...state,
        isPendingEvents: true,
      };
    case GET_EVENTS.SUCCESS:
      return {
        ...state,
        events: action.payload,
        isPendingEvents: false,
      };
    case GET_EVENTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingEvents: false,
      };
    case CHANGE_LANGUAGE.SUCCESS:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
