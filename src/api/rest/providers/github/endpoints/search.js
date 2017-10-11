import { CALL_API } from 'api/rest/middleware';
import { REPOS_BY_SEARCH } from 'api/rest/actions/search';

import Schemas from '../schemas';
import { handlePaginatedApi } from '../client';

const _searchRepos = (query, nextPageUrl) => ({
  id: query,
  [CALL_API]: {
    types: REPOS_BY_SEARCH,
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY,
    normalizrKey: 'items',
  },
});

export const searchRepos = (query, options) => {
  return handlePaginatedApi(
    `search/repositories?${query}`,
    { name: 'reposBySearch', key: query, call: _searchRepos },
    options
  );
};