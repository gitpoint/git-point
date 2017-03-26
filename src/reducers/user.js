import {
  GET_USER_IS_PENDING,
  GET_USER_WAS_SUCCESSFUL,
  GET_USER_HAD_ERROR,
  GET_ORGS_IS_PENDING,
  GET_ORGS_WAS_SUCCESSFUL,
  GET_ORGS_HAD_ERROR
} from '../constants';

const initialState = {
  user: {},
  orgs: [],
  isPendingUser: false,
  isPendingOrgs: false,
  error: '',
}

export default function userReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_USER_IS_PENDING:
        return {
          ...state,
          isPendingUser: true,
        };
      case GET_USER_WAS_SUCCESSFUL:
        return {
          ...state,
          user: action.payload,
          isPendingUser: false,
        };
      case GET_USER_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingUser: false,
        };
      case GET_ORGS_IS_PENDING:
        return {
          ...state,
          isPendingOrgs: true,
        };
      case GET_ORGS_WAS_SUCCESSFUL:
        return {
          ...state,
          orgs: action.payload,
          isPendingOrgs: false,
        };
      case GET_ORGS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingOrgs: false,
        };
      default:
        return state;
  }
}
