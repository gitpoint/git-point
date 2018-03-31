import { createAction } from 'redux-actions';

import { v3 } from 'api';
import {
  GET_ORG_REPOS,
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
} from './organization.constants';

export const getOrgRepos = createAction(GET_ORG_REPOS);
export const getOrgReposLoading = createAction(GET_ORG_REPOS_LOADING);
export const getOrgReposError = createAction(GET_ORG_REPOS_ERROR);

export const fetchOrganizationRepos = url => (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  dispatch(getOrgReposLoading(true));
  dispatch(getOrgReposError(''));

  v3
    .getJson(url, accessToken)
    .then(data => {
      dispatch(getOrgReposLoading(false));
      dispatch(getOrgRepos(data));
    })
    .catch(error => {
      dispatch(getOrgReposLoading(false));
      dispatch(getOrgReposError(error));
    });
};
