import has from 'lodash/has';

import {
  fetchUser,
  fetchUserOrgs,
  fetchUrl,
  fetchUrlNormal,
  USER_ENDPOINT,
  fetchSearch,
  fetchChangeFollowStatus,
  root as apiRoot,
  fetchStarCount,
} from 'api';
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
  USER,
  STARRED,
  FOLLOWERS,
} from './user.type';

import { CALL_API } from '../api/api.middleware';
import { Schemas } from '../api/api.schema';

const getUser = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_USER.PENDING });

    return fetchUser(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_USER.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER.ERROR,
          payload: error,
        });
      });
  };
};

const getOrgs = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORGS.PENDING });

    return fetchUserOrgs(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORGS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORGS.ERROR,
          payload: error,
        });
      });
  };
};

const checkFollowStatusHelper = (user, followedUser, actionSet) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: actionSet.PENDING });

    fetchUrlNormal(
      `${USER_ENDPOINT(user)}/following/${followedUser}`,
      accessToken
    )
      .then(data => {
        dispatch({
          type: actionSet.SUCCESS,
          payload: !(data.status === 404),
        });
      })
      .catch(error => {
        dispatch({
          type: actionSet.ERROR,
          payload: error,
        });
      });
  };
};

export const getIsFollowing = (user, auth) => {
  return dispatch => {
    dispatch(checkFollowStatusHelper(auth, user, GET_IS_FOLLOWING));
  };
};

export const getIsFollower = (user, auth) => {
  return dispatch => {
    dispatch(checkFollowStatusHelper(user, auth, GET_IS_FOLLOWER));
  };
};

export const getFollowers = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_FOLLOWERS.PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/followers?per_page=100`, accessToken)
      .then(data => {
        dispatch({
          type: GET_FOLLOWERS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_FOLLOWERS.ERROR,
          payload: error,
        });
      });
  };
};

export const getUserInfo = user => {
  return dispatch => {
    Promise.all([dispatch(getUser(user)), dispatch(getOrgs(user))]);
  };
};

export const getStarCount = user => {
  return dispatch => {
    dispatch({ type: GET_STAR_COUNT.PENDING });

    fetchStarCount(user)
      .then(data => {
        dispatch({
          type: GET_STAR_COUNT.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_STAR_COUNT.ERROR,
          payload: error,
        });
      });
  };
};

export const changeFollowStatus = (user, isFollowing) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const authUser = getState().auth.user.login;

    dispatch({ type: CHANGE_FOLLOW_STATUS.PENDING });

    fetchChangeFollowStatus(user, isFollowing, accessToken)
      .then(() => {
        dispatch({
          type: CHANGE_FOLLOW_STATUS.SUCCESS,
          changeTo: !isFollowing,
          authUser,
        });
      })
      .catch(error => {
        dispatch({
          type: CHANGE_FOLLOW_STATUS.ERROR,
          payload: error,
        });
      });
  };
};

export const getRepositories = user => {
  return (dispatch, getState) => {
    const { accessToken, user: authUser } = getState().auth;
    const isAuthUser = user.login === authUser.login;

    dispatch({ type: GET_REPOSITORIES.PENDING });

    const url = isAuthUser
      ? `${apiRoot}/user/repos?affiliation=owner&sort=updated&per_page=50`
      : `${USER_ENDPOINT(user.login)}/repos?sort=updated&per_page=50`;

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORIES.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORIES.ERROR,
          payload: error,
        });
      });
  };
};

export const getFollowing = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_FOLLOWING.PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/following?per_page=100`, accessToken)
      .then(data => {
        dispatch({
          type: GET_FOLLOWING.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_FOLLOWING.ERROR,
          payload: error,
        });
      });
  };
};

export const searchUserRepos = (query, user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_USER_REPOS.PENDING });

    return fetchSearch(
      'repositories',
      query,
      accessToken,
      `+user:${user.login}+fork:true`
    )
      .then(data => {
        dispatch({
          type: SEARCH_USER_REPOS.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_USER_REPOS.ERROR,
          payload: error,
        });
      });
  };
};

/** NEW API */

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const _fetchUser = login => ({
  [CALL_API]: {
    types: USER, // [USER.REQUEST, USER.SUCCESS, USER.FAILURE],
    endpoint: `users/${login}`,
    schema: Schemas.USER,
  },
});

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (
  dispatch,
  getState
) => {
  const user = getState().entities.users[login];

  if (user && requiredFields.every(key => has(user, key))) {
    return null;
  }

  return dispatch(_fetchUser(login));
};

const fetchFollowers = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: FOLLOWERS,
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  },
});

// Fetches a page of followers repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadFollowers = (login, nextPage) => (dispatch, getState) => {
  const { nextPageUrl = `users/${login}/followers`, pageCount = 0 } =
    getState().pagination.followersByUser[login] || {};

  if ((pageCount > 0 && !nextPage) || !nextPageUrl) {
    return null;
  }

  return dispatch(fetchFollowers(login, nextPageUrl));
};

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: STARRED,
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
