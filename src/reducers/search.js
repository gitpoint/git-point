import {
  SEARCH_REPOS_IS_PENDING,
  SEARCH_REPOS_WAS_SUCCESSFUL,
  SEARCH_REPOS_HAD_ERROR,
  SEARCH_USERS_IS_PENDING,
  SEARCH_USERS_WAS_SUCCESSFUL,
  SEARCH_USERS_HAD_ERROR,
  SEARCH_ISSUES_IS_PENDING,
  SEARCH_ISSUES_WAS_SUCCESSFUL,
  SEARCH_ISSUES_HAD_ERROR,
  SEARCH_PULLS_IS_PENDING,
  SEARCH_PULLS_WAS_SUCCESSFUL,
  SEARCH_PULLS_HAD_ERROR
} from '../constants';

const initialState = {
  users: [],
  repos: [],
  issues: [],
  pullRequests: [],
  isPendingSearchUsers: false,
  isPendingSearchRepos: false,
  isPendingSearchIssues: false,
  isPendingSearchPullRequests: false,
  error: '',
}

export default function searchReducer(state = initialState, action={}) {
  switch (action.type) {
      case SEARCH_REPOS_IS_PENDING:
        return {
          ...state,
          repos: [],
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
          users: [],
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
      case SEARCH_ISSUES_IS_PENDING:
        return {
          ...state,
          issues: [],
          isPendingSearchIssues: true,
        };
      case SEARCH_ISSUES_WAS_SUCCESSFUL:
        return {
          ...state,
          issues: action.payload,
          isPendingSearchIssues: false,
        };
      case SEARCH_ISSUES_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchIssues: false,
        };
      case SEARCH_PULLS_IS_PENDING:
        return {
          ...state,
          pulls: [],
          isPendingSearchIssues: true,
        };
      case SEARCH_PULLS_WAS_SUCCESSFUL:
        return {
          ...state,
          pulls: action.payload,
          isPendingSearchIssues: false,
        };
      case SEARCH_PULLS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchIssues: false,
        };
      default:
        return state;
  }
}
