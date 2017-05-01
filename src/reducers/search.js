import {
  SEARCH_REPOS_IS_PENDING,
  SEARCH_REPOS_WAS_SUCCESSFUL,
  SEARCH_REPOS_HAD_ERROR,
  SEARCH_USERS_IS_PENDING,
  SEARCH_USERS_WAS_SUCCESSFUL,
  SEARCH_USERS_HAD_ERROR
} from '../constants';

const initialState = {
  users: [],
  repos: [],
  isPendingSearchUsers: false,
  isPendingSearchRepos: false,
  error: '',
}

export default function userReducer(state = initialState, action={}) {
  switch (action.type) {
      case SEARCH_REPOS_IS_PENDING:
        return {
          ...state,
          isPendingSearchRepos: true,
        };
      case SEARCH_REPOS_WAS_SUCCESSFUL:
        return {
          ...state,
          repos: action.payload,
          isPendingSearchRepos: false,
        };
      case SEARCH_REPOS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchRepos: false,
        };
      case SEARCH_USERS_IS_PENDING:
        return {
          ...state,
          isPendingSearchUsers: true,
        };
      case SEARCH_USERS_WAS_SUCCESSFUL:
        return {
          ...state,
          users: action.payload,
          isPendingSearchUsers: false,
        };
      case SEARCH_USERS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchUsers: false,
        };
      default:
        return state;
  }
}
