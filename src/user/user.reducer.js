import {
  GET_USER,
  GET_ORGS,
  GET_IS_FOLLOWING,
  GET_IS_FOLLOWER,
  GET_REPOSITORIES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USER_REPOS,
  CHANGE_FOLLOW_STATUS,
  GET_STAR_COUNT,
} from './user.type';

export const initialState = {
  user: {},
  orgs: [],
  isFollowing: false, // auth is following user
  isFollower: false, // user is a follower of auth, as well as user is following auth
  repositories: [],
  followers: [],
  following: [],
  searchedUserRepos: [],
  starredRepositories: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingStarCount: false,
  isPendingCheckFollowing: false,
  isPendingCheckFollower: false,
  isPendingRepositories: false,
  isPendingFollowers: false,
  isPendingChangeFollowing: false,
  isPendingFollowing: false,
  isPendingSearchUserRepos: false,
  isPendingStarredRepositories: false,
  error: '',
};

export const userReducer = (state = initialState, action = {}) => {
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
    case GET_STAR_COUNT.PENDING:
      return {
        ...state,
        isPendingStarCount: true,
      };
    case GET_STAR_COUNT.SUCCESS:
      return {
        ...state,
        starCount: action.payload,
        isPendingStarCount: false,
      };
    case GET_STAR_COUNT.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingStarCount: false,
      };
    case GET_IS_FOLLOWING.PENDING:
      return {
        ...state,
        isPendingCheckFollowing: true,
      };
    case GET_IS_FOLLOWING.SUCCESS:
      return {
        ...state,
        isFollowing: action.payload,
        isPendingCheckFollowing: false,
      };
    case GET_IS_FOLLOWING.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCheckFollowing: false,
      };
    case GET_IS_FOLLOWER.PENDING:
      return {
        ...state,
        isPendingCheckFollower: true,
      };
    case GET_IS_FOLLOWER.SUCCESS:
      return {
        ...state,
        isFollower: action.payload,
        isPendingCheckFollower: false,
      };
    case GET_IS_FOLLOWER.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCheckFollower: false,
      };
    case CHANGE_FOLLOW_STATUS.PENDING:
      return {
        ...state,
        isPendingChangeFollowing: true,
      };
    case CHANGE_FOLLOW_STATUS.SUCCESS:
      return {
        ...state,
        isFollowing: action.changeTo,
        user: {
          ...state.user,
          followers: action.changeTo
            ? state.user.followers + 1
            : state.user.followers - 1,
        },
        followers: state.followers.filter(
          user => user.login !== action.authUser
        ),
        isPendingChangeFollowing: false,
      };
    case CHANGE_FOLLOW_STATUS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingChangeFollowing: false,
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
};
