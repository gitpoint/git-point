import { AsyncStorage } from 'react-native';
import uniqby from 'lodash.uniqby';
import { delay, resetNavigationTo } from 'utils';

import {
  fetchAccessToken,
  fetchAuthUser,
  fetchAuthUserOrgs,
  fetchUserOrgs,
  fetchUserEvents,
} from 'api';
import {
  LOGIN,
  LOGOUT,
  GET_AUTH_USER,
  GET_AUTH_ORGS,
  GET_EVENTS,
} from './auth.type';

export const auth = (code, state, navigation) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    delay(fetchAccessToken(code, state), 2000)
      .then(data => {
        dispatch({
          type: LOGIN.SUCCESS,
          payload: data.access_token,
        });

        resetNavigationTo('Main', navigation);
      })
      .catch(error => {
        dispatch({
          type: LOGIN.ERROR,
          payload: error,
        });
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: LOGOUT.PENDING });

    return AsyncStorage.clear()
      .then(() => {
        dispatch({
          type: LOGOUT.SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: LOGOUT.ERROR,
          payload: error,
        });
      });
  };
};

export const getUser = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_USER.PENDING });

    fetchAuthUser(accessToken)
      .then(data => {
        dispatch({
          type: GET_AUTH_USER.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_USER.ERROR,
          payload: error,
        });
      });
  };
};

export const getOrgs = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const login = getState().auth.user.login;

    dispatch({ type: GET_AUTH_ORGS.PENDING });

    Promise.all([
      fetchAuthUserOrgs(accessToken),
      fetchUserOrgs(login, accessToken),
    ])
      .then(data => {
        const orgs = data[0].concat(data[1]);

        dispatch({
          type: GET_AUTH_ORGS.SUCCESS,
          payload: uniqby(orgs, 'id').sort(
            (org1, org2) => org1.login > org2.login
          ),
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_ORGS.ERROR,
          payload: error,
        });
      });
  };
};

export const getUserEvents = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_EVENTS.PENDING });

    fetchUserEvents(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_EVENTS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_EVENTS.ERROR,
          payload: error,
        });
      });
  };
};
