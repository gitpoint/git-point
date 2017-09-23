import { CALL_API, Schemas } from '../api/api.middleware';

export const STARRED_REQUEST = 'STARRED_REQUEST';
export const STARRED_SUCCESS = 'STARRED_SUCCESS';
export const STARRED_FAILURE = 'STARRED_FAILURE';

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY,
  },
});

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const { nextPageUrl = `users/${login}/starred`, pageCount = 0 } =
    getState().pagination.starredByUser[login] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStarred(login, nextPageUrl));
};

export const FOLLOWERS_REQUEST = 'FOLLOWERS_REQUEST';
export const FOLLOWERS_SUCCESS = 'FOLLOWERS_SUCCESS';
export const FOLLOWERS_FAILURE = 'FOLLOWERS_FAILURE';

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchFollowers = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [FOLLOWERS_REQUEST, FOLLOWERS_SUCCESS, FOLLOWERS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  },
});

// Fetches a page of followers repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadFollowers = (login, nextPage) => (dispatch, getState) => {
  console.log('loadFollowers(', login);
  const { nextPageUrl = `users/${login}/followers`, pageCount = 0 } =
    getState().pagination.followersByUser[login] || {};
  console.log('loadFollowers(', login, nextPage, nextPageUrl, pageCount);

  if ((pageCount > 0 && !nextPage) || !nextPageUrl) {
    return null;
  }

  return dispatch(fetchFollowers(login, nextPageUrl));
};

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST';
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS';
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE';

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  },
});

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const { nextPageUrl = `repos/${fullName}/stargazers`, pageCount = 0 } =
    getState().pagination.stargazersByRepo[fullName] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl));
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});
