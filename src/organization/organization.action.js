import { fetchOrg, fetchOrgMembers, fetchUrl } from 'api';
import { GET_ORG, GET_ORG_REPOS, GET_ORG_MEMBERS } from './organization.type';

export const getOrg = orgName => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG.PENDING });

    return fetchOrg(orgName, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG.ERROR,
          payload: error,
        });
      });
  };
};

export const getOrgRepos = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG_REPOS.PENDING });

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG_REPOS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG_REPOS.ERROR,
          payload: error,
        });
      });
  };
};

export const getOrgMembers = orgName => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORG_MEMBERS.PENDING });

    return fetchOrgMembers(orgName, accessToken)
      .then(data => {
        dispatch({
          type: GET_ORG_MEMBERS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORG_MEMBERS.ERROR,
          payload: error,
        });
      });
  };
};
