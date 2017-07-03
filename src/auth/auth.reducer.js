import { LOGIN, GET_AUTH_USER, GET_AUTH_ORGS, GET_EVENTS } from './auth.type';

const initialState = {
  isLoggingIn: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  orgs: [],
  events: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingEvents: false,
  error: ''
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN.PENDING:
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload
      };
    case LOGIN.FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload
      };
    case GET_AUTH_USER.PENDING:
      return {
        ...state,
        isPendingUser: true
      };
    case GET_AUTH_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false
      };
    case GET_AUTH_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false
      };
    case GET_AUTH_ORGS.PENDING:
      return {
        ...state,
        isPendingOrgs: true
      };
    case GET_AUTH_ORGS.SUCCESS:
      return {
        ...state,
        orgs: action.payload,
        isPendingOrgs: false
      };
    case GET_AUTH_ORGS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingOrgs: false
      };
    case GET_EVENTS.PENDING:
      return {
        ...state,
        isPendingEvents: true
      };
    case GET_EVENTS.SUCCESS:
      return {
        ...state,
        events: action.payload,
        isPendingEvents: false
      };
    case GET_EVENTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingEvents: false
      };
    default:
      return state;
  }
};
