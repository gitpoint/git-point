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
  GET_FOLLOWING_HAD_ERROR,
  SEARCH_USER_REPOS_IS_PENDING,
  SEARCH_USER_REPOS_WAS_SUCCESSFUL,
  SEARCH_USER_REPOS_HAD_ERROR,
} from '../constants';

const initialState = {
  user: {},
  orgs: [],
  repositories: [],
  followers: [],
  following: [],
  searchedUserRepos: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingRepositories: false,
  isPendingFollowers: false,
  isPendingFollowing: false,  
  isPendingSearchUserRepos: false,
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
      case SEARCH_USER_REPOS_IS_PENDING:
        return {
          ...state,
          isPendingSearchUserRepos: true,
        };
      case SEARCH_USER_REPOS_WAS_SUCCESSFUL:
        return {
          ...state,
          searchedUserRepos: action.payload,
          isPendingSearchUserRepos: false,
        };
      case SEARCH_USER_REPOS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchUserRepos: false,
        };
      default:
        return state;
  }
}
