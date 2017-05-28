import {
  GET_USER,
  GET_ORGS,
  GET_REPOSITORIES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USER_REPOS
} from "./user.type";

import { fetchUser, fetchUserOrgs, fetchUrl, USER_ENDPOINT, fetchSearch } from '@api';

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
        })
      })
  };
};

const getOrgs = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORGS.PENDING });

    return fetchUserOrgs(user, accessToken).then(data => {
      dispatch({
        type: GET_ORGS.SUCCESS,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ORGS.ERROR,
        payload: error,
      })
    })
  };
};

export const getRepositories = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORIES.PENDING });

    fetchUrl(`${USER_ENDPOINT(user.login)}/repos?per_page=50`, accessToken)
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
      })
    })
  };
};

export const getFollowers = (user) => {
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
      })
    })
  };
};

export const getFollowing = (user) => {
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
      })
    })
  };
};

export const searchUserRepos = (query, user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_USER_REPOS.PENDING});

    return fetchSearch('repositories', query, accessToken, `+user:${user.login}`)
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