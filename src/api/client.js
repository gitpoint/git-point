// @flow

import { Schema } from 'normalizr';
import { merge } from 'lodash';
import { version } from 'package.json';
import { Platform } from 'react-native';

import Schemas from './schemas';

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

export type CallParameters = {
  endpoint: string,
  schema: Schema,
  params: SpecialParameters,
  fetchParameters?: FetchParameters,
  normalizrKey?: string,
  paginationArgs?: Array<string | number | boolean>,
  entityId?: String | number,
};

export type CallType = CallParameters & {
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

  get = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'get',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.GET, headers: { Accept: this.Accept.JSON } },
      fetchParameters
    ),
  });

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

  list = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'list',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.GET, headers: { Accept: this.Accept.JSON } },
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

  update = ({ fetchParameters, ...config }: CallParameters): CallType => ({
    type: 'update',
    params: {},
    ...config,
    fetchParameters: merge(
      { method: this.Method.PATCH, headers: { Accept: this.Accept.JSON } },
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
    ): CallParameters =>
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

  issues = {
    get: (repoId: string, number: number, params: SpecialParameters = {}) =>
      this.get({
        endpoint: `repos/${repoId}/issues/${number}`,
        params,
        schema: Schemas.ISSUE,
        fetchParameters: {
          headers: {
            Accept: this.Accept.FULL,
          },
        },
      }),

    edit: (
      repoId: string,
      number: string,
      data: Object,
      params: SpecialParameters = {}
    ) =>
      this.update({
        endpoint: `repos/${repoId}/issues/${number}`,
        params,
        schema: Schemas.ISSUE,
        fetchParameters: {
          headers: {
            Accept: this.Accept.FULL,
          },
          body: data,
        },
      }),

    lock: (repoId: string, number: string, params: SpecialParameters = {}) =>
      this.put({
        endpoint: `repos/${repoId}/issues/${number}/lock`,
        params,
        schema: Schemas.ISSUE,
        changeEntity: {
          type: 'issues',
          id: `${repoId}-${number}`,
          changes: {
            locked: true,
          },
        },
      }),

    unlock: (repoId: string, number: string, params: SpecialParameters = {}) =>
      this.delete({
        endpoint: `repos/${repoId}/issues/${number}/lock`,
        params,
        schema: Schemas.ISSUE,
        changeEntity: {
          type: 'issues',
          id: `${repoId}-${number}`,
          changes: {
            locked: false,
          },
        },
      }),

    getComments: (
      repoId: string,
      number: number,
      params: SpecialParameters = {}
    ) =>
      this.list({
        endpoint: `repos/${repoId}/issues/${number}/comments`,
        params,
        schema: Schemas.ISSUE_COMMENT_ARRAY,
        paginationArgs: [repoId, number],
        fetchParameters: {
          headers: { Accept: this.Accept.FULL },
        },
      }),

    getEvents: (
      repoId: string,
      number: number,
      params: SpecialParameters = {}
    ) =>
      this.list({
        endpoint: `repos/${repoId}/issues/${number}/events`,
        params,
        schema: Schemas.ISSUE_EVENT_ARRAY,
        paginationArgs: [repoId, number],
      }),

    createComment: (
      repoId: string,
      number: number,
      body: string,
      params: SpecialParameters = {}
    ) =>
      this.create({
        endpoint: `repos/${repoId}/issues/${number}/comments`,
        params,
        schema: Schemas.ISSUE_COMMENT,
        paginationArgs: [repoId, number],
        fetchParameters: {
          body: { body },
          headers: { Accept: this.Accept.FULL },
        },
      }),

    editComment: (
      repoId: string,
      number: number,
      id: number,
      body: string,
      params: SpecialParameters = {}
    ) =>
      this.update({
        endpoint: `repos/${repoId}/issues/comments/${id}`,
        params,
        schema: Schemas.ISSUE_COMMENT,
        fetchParameters: {
          headers: { Accept: this.Accept.FULL },
          body: { body },
        },
        paginationArgs: [repoId, number],
      }),

    deleteComment: (
      repoId: string,
      number: number,
      id: number,
      params: SpecialParameters = {}
    ) =>
      this.delete({
        endpoint: `repos/${repoId}/issues/comments/${id}`,
        params,
        schema: Schemas.ISSUE_COMMENT,
        paginationArgs: [repoId, number],
        entityId: id,
      }),
  };

  repos = {
    get: (repoId: string, params: SpecialParameters = {}) =>
      this.get({
        endpoint: `repos/${repoId}`,
        params,
        schema: Schemas.REPO,
      }),
    getContributors: (repoId: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `repos/${repoId}/contributors`,
        params,
        schema: Schemas.USER_ARRAY,
        paginationArgs: [repoId],
      }),
    getLabels: (repoId: string, params: SpecialParameters = {}) =>
      this.list({
        endpoint: `repos/${repoId}/labels`,
        params,
        schema: Schemas.ISSUE_LABEL_ARRAY,
        paginationArgs: [repoId],
      }),
  };
}
