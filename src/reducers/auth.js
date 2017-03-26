import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from '../constants';

const initialState = {
  isLoggingIn: false,
  isAuthenticated: false,
  accessToken: null,
}

export default function authReducer(state = initialState, action={}) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        isLoggingIn: true,
        isAuthenticated: false
      }
    case LOGIN_FAILURE:
      return {
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.payload
      }
    default:
      return state
  }
}
