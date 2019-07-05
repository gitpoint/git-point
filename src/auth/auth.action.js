import AsyncStorage from '@react-native-community/async-storage';

import { uniqBy } from 'lodash';
import { delay, configureLocale, saveLocale } from 'utils';

import {
  fetchAccessToken,
  fetchAuthUser,
  fetchAuthUserOrgs,
  fetchUserOrgs,
  fetchStarCount,
} from 'api';
import {
  LOGIN,
  LOGOUT,
  GET_AUTH_USER,
  GET_AUTH_ORGS,
  CHANGE_LOCALE,
  GET_AUTH_STAR_COUNT,
} from './auth.type';

export const auth = (code, state) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    return delay(fetchAccessToken(code, state), 2000)
      .then(data => {
        dispatch({
          type: LOGIN.SUCCESS,
          payload: data.access_token,
        });
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

    return fetchAuthUser(accessToken)
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

export const getStarCount = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const user = getState().auth.user.login;

    dispatch({ type: GET_AUTH_STAR_COUNT.PENDING });

    fetchStarCount(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_AUTH_STAR_COUNT.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_STAR_COUNT.ERROR,
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
          payload: uniqBy(orgs, 'login').sort(
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

export const changeLocale = locale => {
  return dispatch => {
    dispatch({ type: CHANGE_LOCALE.SUCCESS, payload: locale });

    saveLocale(locale);
    configureLocale(locale);
  };
};
