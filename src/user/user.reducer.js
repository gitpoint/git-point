import {
  GET_USER,
  GET_ORGS,
  GET_REPOSITORIES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USER_REPOS
} from "./user.type";

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

export const userReducer = (state = initialState, action={}) => {
  switch (action.type) {
      case GET_USER.PENDING:
        return {
          ...state,
          isPendingUser: true,
        };
      case GET_USER.SUCCESS:
        return {
          ...state,
          user: action.payload,
          isPendingUser: false,
        };
      case GET_USER.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingUser: false,
        };
      case GET_ORGS.PENDING:
        return {
          ...state,
          isPendingOrgs: true,
        };
      case GET_ORGS.SUCCESS:
        return {
          ...state,
          orgs: action.payload,
          isPendingOrgs: false,
        };
      case GET_ORGS.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingOrgs: false,
        };
      case GET_REPOSITORIES.PENDING:
        return {
          ...state,
          isPendingRepositories: true,
        };
      case GET_REPOSITORIES.SUCCESS:
        return {
          ...state,
          repositories: action.payload,
          isPendingRepositories: false,
        };
      case GET_REPOSITORIES.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingRepositories: false,
        };
      case GET_FOLLOWERS.PENDING:
        return {
          ...state,
          isPendingFollowers: true,
        };
      case GET_FOLLOWERS.SUCCESS:
        return {
          ...state,
          followers: action.payload,
          isPendingFollowers: false,
        };
      case GET_FOLLOWERS.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingFollowers: false,
        };
      case GET_FOLLOWING.PENDING:
        return {
          ...state,
          isPendingFollowing: true,
        };
      case GET_FOLLOWING.SUCCESS:
        return {
          ...state,
          following: action.payload,
          isPendingFollowing: false,
        };
      case GET_FOLLOWING.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingFollowing: false,
        };
      case SEARCH_USER_REPOS.PENDING:
        return {
          ...state,
          isPendingSearchUserRepos: true,
        };
      case SEARCH_USER_REPOS.SUCCESS:
        return {
          ...state,
          searchedUserRepos: action.payload,
          isPendingSearchUserRepos: false,
        };
      case SEARCH_USER_REPOS.ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchUserRepos: false,
        };
      default:
        return state;
  }
}
