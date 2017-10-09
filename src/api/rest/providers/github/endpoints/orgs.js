import has from 'lodash.has';
import { CALL_API } from 'api/rest/middleware';
import {
  ORGS_GET_BY_ID,
  REPOS_BY_ORG,
  MEMBERS_BY_ORG,
} from 'api/rest/actions/orgs';
import { handlePaginatedApi } from 'api/rest/providers/github';

import Schemas from '../schemas';

const _getById = orgId => ({
  [CALL_API]: {
    types: ORGS_GET_BY_ID,
    endpoint: `orgs/${orgId}`,
    schema: Schemas.ORG,
  },
});

export const getById = (
  orgId,
  { requiredFields = [], forceRefresh = false } = {}
) => (dispatch, getState) => {
  const org = getState().entities.orgs[orgId];

  if (!forceRefresh && org && requiredFields.every(key => has(org, key))) {
    return null;
  }

  return dispatch(_getById(orgId));
};

const _getRepos = (orgId, nextPageUrl) => ({
  id: orgId,
  [CALL_API]: {
    types: REPOS_BY_ORG,
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY,
  },
});

export const getRepos = (orgId, options) => {
  return handlePaginatedApi(
    `orgs/${orgId}/repos`,
    { name: 'reposByOrg', key: orgId, call: _getRepos },
    options
  );
};

const _getMembers = (orgId, nextPageUrl) => ({
  id: orgId,
  [CALL_API]: {
    types: MEMBERS_BY_ORG,
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  },
});

export const getMembers = (orgId, options) => {
  return handlePaginatedApi(
    `orgs/${orgId}/members?per_page=8`,
    { name: 'membersByOrg', key: orgId, call: _getMembers },
    options
  );
};
