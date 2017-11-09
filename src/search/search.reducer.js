import { SEARCH_REPOS, SEARCH_USERS } from './search.type';

export const initialState = {
  users: [],
  repos: [],
  isPendingSearchUsers: false,
  isPendingSearchRepos: false,
  error: '',
};

export const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_REPOS.PENDING:
      return {
        ...state,
        repos: [],
        isPendingSearchRepos: true,
      };
    case SEARCH_REPOS.SUCCESS:
      return {
        ...state,
        repos: action.payload,
        isPendingSearchRepos: false,
      };
    case SEARCH_REPOS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchRepos: false,
      };
    case SEARCH_USERS.PENDING:
      return {
        ...state,
        users: [],
        isPendingSearchUsers: true,
      };
    case SEARCH_USERS.SUCCESS:
      return {
        ...state,
        users: action.payload,
        isPendingSearchUsers: false,
      };
    case SEARCH_USERS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchUsers: false,
      };
    default:
      return state;
  }
};
