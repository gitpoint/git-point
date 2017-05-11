import {
  GET_USER_IS_PENDING,
  GET_USER_WAS_SUCCESSFUL,
  GET_USER_HAD_ERROR,
  GET_ORGS_IS_PENDING,
  GET_ORGS_WAS_SUCCESSFUL,
  GET_ORGS_HAD_ERROR,
  GET_REPOSITORIES_IS_PENDING,
  GET_REPOSITORIES_WAS_SUCCESSFUL,
  GET_REPOSITORIES_HAD_ERROR,
  GET_FOLLOWERS_IS_PENDING,
  GET_FOLLOWERS_WAS_SUCCESSFUL,
  GET_FOLLOWERS_HAD_ERROR,
  GET_FOLLOWING_IS_PENDING,
  GET_FOLLOWING_WAS_SUCCESSFUL,
  GET_FOLLOWING_HAD_ERROR
} from '../constants';

const initialState = {
  user: {},
  orgs: [],
  repositories: [],
  followers: [],
  following: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingRepositories: false,
  isPendingFollowers: false,
  isPendingFollowing: false,  
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
      case GET_REPOSITORIES_IS_PENDING:
        return {
          ...state,
          isPendingRepositories: true,
        };
      case GET_REPOSITORIES_WAS_SUCCESSFUL:
        return {
          ...state,
          repositories: action.payload,
          isPendingRepositories: false,
        };
      case GET_REPOSITORIES_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingRepositories: false,
        };
      case GET_FOLLOWERS_IS_PENDING:
        return {
          ...state,
          isPendingFollowers: true,
        };
      case GET_FOLLOWERS_WAS_SUCCESSFUL:
        return {
          ...state,
          followers: action.payload,
          isPendingFollowers: false,
        };
      case GET_FOLLOWERS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingFollowers: false,
        };
      case GET_FOLLOWING_IS_PENDING:
        return {
          ...state,
          isPendingFollowing: true,
        };
      case GET_FOLLOWING_WAS_SUCCESSFUL:
        return {
          ...state,
          following: action.payload,
          isPendingFollowing: false,
        };
      case GET_FOLLOWING_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingFollowing: false,
        };
      default:
        return state;
  }
}
