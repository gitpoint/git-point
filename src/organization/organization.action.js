import { createAction } from 'redux-actions';

import {
  fetchOrg,
  fetchOrgMembers,
  fetchUrl,
} from 'api';
import {
  GET_ORG,
  GET_ORG_LOADING,
  GET_ORG_ERROR,
  GET_ORG_REPOS,
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
  GET_ORG_MEMBERS,
  GET_ORG_MEMBERS_LOADING,
  GET_ORG_MEMBERS_ERROR,
} from './organization.constants';

export const getOrg = createAction(GET_ORG);
export const getOrgLoading = createAction(GET_ORG_LOADING);
export const getOrgError = createAction(GET_ORG_ERROR);
export const getOrgRepos = createAction(GET_ORG_REPOS);
export const getOrgReposLoading = createAction(GET_ORG_REPOS_LOADING);
export const getOrgReposError = createAction(GET_ORG_REPOS_ERROR);
export const getOrgMembers = createAction(GET_ORG_MEMBERS);
export const getOrgMembersLoading = createAction(GET_ORG_MEMBERS_LOADING);
export const getOrgMembersError = createAction(GET_ORG_MEMBERS_ERROR);

export const fetchOrganizations = orgName => (dispatch, getState) => {
  // use a selector here
  const accessToken = getState().auth.accessToken;

  dispatch(getOrgLoading(true));
  dispatch(getOrgError(''));

  return fetchOrg(orgName, accessToken)
    .then(data => {
      dispatch(getOrgLoading(false));
      dispatch(getOrg(data));
    })
    .catch(error => {
      dispatch(getOrgLoading(false));
      dispatch(getOrgError(error));
    });
};

export const fetchOrganizationRepos = url => (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  dispatch(getOrgReposLoading(true));
  dispatch(getOrgReposError(''));

  fetchUrl(url, accessToken)
    .then(data => {
      dispatch(getOrgReposLoading(false));
      dispatch(getOrgRepos(data));
    })
    .catch(error => {
      dispatch(getOrgReposLoading(false));
      dispatch(getOrgReposError(error));
    });
};

export const fetchOrganizationMembers = orgName => (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  dispatch(getOrgMembersLoading(true));
  dispatch(getOrgMembersError(''));

  return fetchOrgMembers(orgName, accessToken)
    .then(data => {
      dispatch(getOrgMembersLoading(false));
      dispatch(getOrgMembers(data));
    })
    .catch(error => {
      dispatch(getOrgMembersLoading(false));
      dispatch(getOrgMembersError(error));
    });
};
