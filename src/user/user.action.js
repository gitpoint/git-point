import {
  fetchUser,
  fetchUserOrgs,
  fetchSearch,
  fetchChangeFollowStatus,
  fetchStarCount,
  v3,
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
} from './user.type';

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

    v3
      .head(`/users/${user}/following/${followedUser}`, accessToken)
      .then(data => {
        dispatch({
          type: actionSet.SUCCESS,
          payload: data.status !== 404,
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

    v3
      .getJson(`/users/${user.login}/followers?per_page=100`, accessToken)
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
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_STAR_COUNT.PENDING });

    fetchStarCount(user, accessToken)
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
      ? '/user/repos?affiliation=owner&sort=updated&per_page=50'
      : `/users/${user.login}/repos?sort=updated&per_page=50`;

    v3
      .getJson(url, accessToken)
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

    v3
      .getJson(`/users/${user.login}/following?per_page=100`, accessToken)
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
