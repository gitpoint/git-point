// @flow

import { Schema } from 'normalizr';
import { merge } from 'lodash';
import { version } from 'package.json';
import { Platform } from 'react-native';

import Schemas from './schemas';
import { repoQuery } from './queries';

type SpecialParameters = {
  forceRefresh?: boolean,
  loadMore?: boolean,
  perPage?: number,
};

type FetchParameters = {
  method?: string,
  headers?: Object,
  body?: Object,
};

type UpdateEntity = {
  type: string,
  id: string,
  updater: Function,
};

type BaseCallParameters = {
  schema: Schema,
  params: SpecialParameters,
  fetchParameters?: FetchParameters,
  normalizrKey?: string,
  paginationArgs?: Array<string | number | boolean>,
  entityId?: String | number,
  updateEntity?: UpdateEntity,
};
type GraphQLCallParameters = {
  ...BaseCallParameters,
  query: string,
  variables: Object,
};
export type CallParameters = {
  ...BaseCallParameters,
  endpoint: string,
};

export type CallType = {
  ...CallParameters,
  type: string,
};

export class Client {
  API_ROOT = 'https://api.github.com/';

  /**
   * Enum for HTTP methods.
   *
   * @enum {string}
   */
  Method = {
    GET: 'GET',
    HEAD: 'HEAD',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
  };

  Accept = {
    DIFF: 'application/vnd.github.v3.diff+json',
    FULL: 'application/vnd.github.v3.full+json',
    HTML: 'application/vnd.github.v3.html+json',
    JSON: 'application/vnd.github.v3+json',
    MERCY_PREVIEW: 'application/vnd.github.mercy-preview+json',
    MOCKINGBIRD_PREVIEW: 'application/vnd.github.mockingbird-preview+json',
    RAW: 'application/vnd.github.v3.raw+json',
  };

  authHeaders = {};

  call = async (
    url: string,
    params: SpecialParameters = {},
    fetchParameters: FetchParameters = {}
  ) => {
    let finalUrl = url;

    // add explicitely specified parameters
    if (params.perPage) {
      finalUrl = `${finalUrl}${
        finalUrl.includes('?') ? '&' : '?'
      }per_page=${Number(params.perPage).toString()}`;
    }

    if (!finalUrl.includes(this.API_ROOT)) {
      finalUrl = `${this.API_ROOT}${finalUrl}`;
    }

    const { method, headers, body } = fetchParameters;

    const parameters: any = {
      method,
      headers: {
        'User-Agent': `GitPoint/${version} ${Platform.OS}`,
        'Cache-Control': 'no-cache',
        ...this.authHeaders,
        ...headers,
      },
    };

    if (body) {
      parameters.body = JSON.stringify(body);
    }

    return fetch(finalUrl, parameters);
  };

  put = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'put',
    params: {},
    ...config,
    fetchParameters: merge(
      {
        method: this.Method.PUT,
        headers: { Accept: this.Accept.JSON, 'Content-Length': 0 },
      },
      fetchParameters
    ),
  });

  get = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'get',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.GET, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  delete = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'delete',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.DELETE, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  create = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'create',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.POST, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  query = ({
    fetchParameters,
    query,
    variables,
    ...config
  }: GraphQLCallParameters): CallType => ({
    type: 'query',
    endpoint: 'graphql',
    params: {},
    ...config,
    fetchParameters: merge(
      {
        method: this.Method.POST,
        headers: { Accept: this.Accept.JSON },
        body: {
          query,
          variables,
        },
      },
      fetchParameters
    ),
  });

  list = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'list',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.GET, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

  /**
   * Sets the authorization headers given an access token.
   *
   * @abstract
   * @param {string} token The oAuth access token
   */
  setAuthHeaders = (token: string) => {
    this.authHeaders = { Authorization: `token ${token}` };
  };

  /**
   * Counts the entities available by analysing the Response object
   *
   * @async
   * @param {Response} response
   */
  getCount = async (response: Response) => {
    if (!response.ok) {
      return 0;
    }

    let linkHeader = response.headers.get('Link');

    if (linkHeader !== null) {
      linkHeader = linkHeader.match(/page=(\d)+/g).pop();

      return linkHeader.split('=').pop();
    }

    return response
      .json()
      .then(data => data.length)
      .catch(() => {
        // TODO: Properly handle the error and show it if needed.
        return 0;
      });
  };

  getNextPageUrl = (response: Response) => {
    const { headers } = response;
    const link = headers.get('link');
    const nextLink = link
      ? link.split(',').find(s => s.indexOf('rel="next"') > -1)
      : null;

    if (!nextLink) {
      return null;
    }

    return nextLink
      .trim()
      .split(';')[0]
      .slice(1, -1);
  };

  graphql = {
    getRepo: (repoId: string, params: SpecialParameters = {}) => {
      const [owner, name] = repoId.split('/');

      return this.query({
        params,
        query: repoQuery,
        variables: { owner, name },
        schema: Schemas.GQL_REPO,
      });
    },
  };

  /**
   * The activity endpoint
   */
  activity = {
    /**
     * Gets received events
     *
     * @param {string} userId
     */
    getEventsReceived: (
      userId: string,
      params: SpecialParameters = {}
    ): CallType =>
      this.list({
        endpoint: `users/${userId}/received_events`,
        params: params || {},
        schema: Schemas.EVENT_ARRAY,
        paginationArgs: [userId],
      }),

    getStarredReposForUser: (userId: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `users/${userId}/starred`,
        params,
        schema: Schemas.REPO_ARRAY,
        paginationArgs: [userId],
      }),

    starRepo: (repoId: string, params: SpecialParameters = {}) =>
      this.put({
        endpoint: `user/starred/${repoId}`,
        params,
        schema: Schemas.GQL_REPO,
        updateEntity: {
          type: 'gqlRepos',
          id: repoId,
          updater: gqlRepo => ({
            viewerHasStarred: true,
            stargazers: {
              ...gqlRepo.stargazers,
              totalCount: gqlRepo.stargazers.totalCount + 1,
            },
          }),
        },
      }),
    unstarRepo: (repoId: string, params: SpecialParameters = {}) =>
      this.delete({
        endpoint: `user/starred/${repoId}`,
        params,
        schema: Schemas.GQL_REPO,
        updateEntity: {
          type: 'gqlRepos',
          id: repoId,
          updater: gqlRepo => ({
            viewerHasStarred: false,
            stargazers: {
              ...gqlRepo.stargazers,
              totalCount: gqlRepo.stargazers.totalCount - 1,
            },
          }),
        },
      }),
    watchRepo: (repoId: string, params: SpecialParameters = {}) =>
      this.put({
        endpoint: `repos/${repoId}/subscription`,
        params,
        fetchParameters: {
          body: {
            subscribed: true,
          },
        },
        schema: Schemas.GQL_REPO,
        updateEntity: {
          type: 'gqlRepos',
          id: repoId,
          updater: gqlRepo => ({
            viewerSubscription: 'SUBSCRIBED',
            watchers: {
              ...gqlRepo.watchers,
              totalCount: gqlRepo.watchers.totalCount + 1,
            },
          }),
        },
      }),
    unwatchRepo: (repoId: string, params: SpecialParameters = {}) =>
      this.delete({
        endpoint: `repos/${repoId}/subscription`,
        params,
        schema: Schemas.GQL_REPO,
        updateEntity: {
          type: 'gqlRepos',
          id: repoId,
          updater: gqlRepo => ({
            viewerSubscription: 'UNSUBSCRIBED',
            watchers: {
              ...gqlRepo.watchers,
              totalCount: gqlRepo.watchers.totalCount - 1,
            },
          }),
        },
      }),
  };
  search = {
    repos: (q: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `search/repositories?q=${q}`,
        params,
        schema: Schemas.REPO_ARRAY,
        paginationArgs: [q],
        normalizrKey: 'items',
      }),

    users: (q: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `search/users?q=${q}`,
        params,
        schema: Schemas.USER_ARRAY,
        paginationArgs: [q],
        normalizrKey: 'items',
      }),

    issues: (q: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `search/issues?q=${q}`,
        params,
        schema: [Schemas.ISSUE],
        paginationArgs: [q],
        normalizrKey: 'items',
      }),
  };
  repos = {
    getContributors: (repoId: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `repos/${repoId}/contributors`,
        params,
        schema: Schemas.USER_ARRAY,
        paginationArgs: [repoId],
      }),
    fork: (repoId: string, params: SpecialParameters = {}) =>
      this.create({
        endpoint: `repos/${repoId}/forks`,
        params,
        schema: Schemas.REPO,
      }),
    getIssue: (
      repoId: string,
      issueId: number,
      params: SpecialParameters = {}
    ) =>
      this.get({
        endpoint: `repos/${repoId}/issues/${issueId}`,
        params,
        fetchParameters: {
          headers: {
            Accept: this.Accept.FULL,
          },
        },
        schema: Schemas.ISSUE,
      }),
    getIssueTimeline: (
      repoId: string,
      issueId: number,
      params: SpecialParameters = {}
    ) =>
      this.list({
        endpoint: `repos/${repoId}/issues/${issueId}/timeline`,
        params,
        fetchParameters: {
          headers: {
            Accept: [this.Accept.MOCKINGBIRD_PREVIEW, this.Accept.FULL].join(
              ','
            ),
          },
        },
        schema: [Schemas.ISSUE_TIMELINE_ITEM],
        paginationArgs: [`${repoId}/${issueId}`],
      }),
  };
  orgs = {
    /**
     * Get org by id
     */
    getById: (orgId: string, params: SpecialParameters = {}) =>
      this.get({
        endpoint: `orgs/${orgId}`,
        params,
        schema: Schemas.ORG,
      }),
    getMembers: (orgId: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `orgs/${orgId}/members`,
        params,
        schema: Schemas.USER_ARRAY,
        paginationArgs: [orgId],
      }),
  };
}
