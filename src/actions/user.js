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

import { fetchUser, fetchUserOrgs, fetchUrl, USER_ENDPOINT, fetchSearch } from '../api';

export const getUserInfo = user => {
  return (dispatch) => {
    return dispatch(getUser(user)).then(() => {
      dispatch(getOrgs(user));
    });
  };
};

const getUser = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_USER_IS_PENDING });

    return fetchUser(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_USER_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_HAD_ERROR,
          payload: error,
        })
      })
  };
};

const getOrgs = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORGS_IS_PENDING });

    return fetchUserOrgs(user, accessToken).then(data => {
      dispatch({
        type: GET_ORGS_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ORGS_HAD_ERROR,
        payload: error,
      })
    })
  };
};

export const getRepositories = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORIES_IS_PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/repos?per_page=50`, accessToken)
      .then(data => {
      dispatch({
        type: GET_REPOSITORIES_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_REPOSITORIES_HAD_ERROR,
        payload: error,
      })
    })
  };
};

export const getFollowers = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_FOLLOWERS_IS_PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/followers?per_page=100`, accessToken)
      .then(data => {
      dispatch({
        type: GET_FOLLOWERS_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_FOLLOWERS_HAD_ERROR,
        payload: error,
      })
    })
  };
};

export const getFollowing = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_FOLLOWING_IS_PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/following?per_page=100`, accessToken)
      .then(data => {
      dispatch({
        type: GET_FOLLOWING_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_FOLLOWING_HAD_ERROR,
        payload: error,
      })
    })
  };
};

export const searchUserRepos = (query, user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_USER_REPOS_IS_PENDING});

    return fetchSearch('repositories', query, accessToken, `+user:${user.login}`)
      .then(data => {
        dispatch({
          type: SEARCH_USER_REPOS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_USER_REPOS_HAD_ERROR,
          payload: error,
        });
      });
  };
};