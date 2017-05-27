import {
  GET_ORG_IS_PENDING,
  GET_ORG_WAS_SUCCESSFUL,
  GET_ORG_HAD_ERROR,
  GET_ORG_REPOS_IS_PENDING,
  GET_ORG_REPOS_WAS_SUCCESSFUL,
  GET_ORG_REPOS_HAD_ERROR,
  GET_ORG_MEMBERS_IS_PENDING,
  GET_ORG_MEMBERS_WAS_SUCCESSFUL,
  GET_ORG_MEMBERS_HAD_ERROR
} from '../constants';

import { fetchOrg, fetchOrgMembers, fetchUrl } from '@api';

export const getOrg = (orgName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG_IS_PENDING });

    fetchOrg(orgName, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const getOrgRepos = (url) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG_REPOS_IS_PENDING });

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG_REPOS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG_REPOS_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const getOrgMembers = (orgName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG_MEMBERS_IS_PENDING });

    fetchOrgMembers(orgName, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG_MEMBERS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG_MEMBERS_HAD_ERROR,
          payload: error,
        })
      })
  };
};
