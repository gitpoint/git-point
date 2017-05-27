import { LOGIN, GET_AUTH_USER, GET_AUTH_ORGS } from './auth.type'

const initialState = {
  isLoggingIn: false,
  isAuthenticated: false,
  accessToken: null,
  user: '',
  orgs: [],
  isPendingUser: false,
  isPendingOrgs: false,
  error: '',
}

export default function authReducer(state = initialState, action={}) {
  switch(action.type) {
    case LOGIN.REQUEST:
      return {
        isLoggingIn: true,
        isAuthenticated: false
      }
    case LOGIN.SUCCESS:
      return {
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload
      }
    case LOGIN.FAILURE:
      return {
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload
      }
    case GET_AUTH_USER.REQUEST:
        return {
          ...state,
          isPendingUser: true,
        };
    case GET_AUTH_USER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isPendingUser: false,
      };
    case GET_AUTH_USER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false,
      };
    case GET_AUTH_ORGS.REQUEST:
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
    default:
      return state
  }
}
