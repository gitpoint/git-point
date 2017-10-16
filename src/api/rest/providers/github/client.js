import { Client } from '../base';
import Schemas from './schemas';

export class GitHub extends Client {
  API_ROOT = 'https://api.github.com/';

  setAuthHeaders = token => {
    this.authHeaders = { Authorization: `token ${token}` };
  };

  getNextPageUrl = response => {
    const link = response.headers.get('link');

    if (!link) {
      return null;
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);

    if (!nextLink) {
      return null;
    }

    return nextLink.split(';')[0].slice(1, -1);
  };

  /**
   * Counts the entities available by analysing the Response object
   *
   * @async
   * @param {Response} response
   */
  getCount = async response => {
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
      .catch(() => 0);
  };

  /**
   * The organizations endpoint
   */
  orgs = {
    /**
     * Gets an organization by its id
     *
     * @param {string} orgId
     */
    getById: async (orgId, params) => {
      return this.fetch(`orgs/${orgId}`, params).then(response => ({
        response,
        schema: Schemas.ORG,
      }));
    },
    /**
     * Gets organization members
     *
     * @param {string} orgId
     */
    getMembers: async (orgId, params) => {
      return this.fetch(`orgs/${orgId}/members`, params).then(response => ({
        response,
        nextPageUrl: this.getNextPageUrl(response),
        schema: Schemas.USER_ARRAY,
      }));
    },
    /**
     * Gets organization members
     *
     * @param {string} orgId
     */
    getRepos: async (orgId, params) => {
      return this.fetch(`orgs/${orgId}/repos`, params).then(response => ({
        response,
        nextPageUrl: this.getNextPageUrl(response),
        schema: Schemas.REPO_ARRAY,
      }));
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
    getEventsReceived: async (userId, params) => {
      return this.fetch(
        `users/${userId}/received_events`,
        params
      ).then(response => ({
        response,
        nextPageUrl: this.getNextPageUrl(response),
        schema: Schemas.EVENT_ARRAY,
      }));
    },
    /**
     * Get all notifications for the current user
     *
     * @param {boolean} all If true, show notifications marked as read.
     * @param {boolean} participating If true, in which the user is directly participating or mentioned.
     */
    getNotifications: async (all, participating, params) => {
      const finalParams = {
        per_page: 100,
        ...params,
      };

      return this.fetch(
        `notifications?all=${all}&participating=${participating}`,
        finalParams,
        {}
      ).then(response => ({
        response,
        nextPageUrl: this.getNextPageUrl(response),
        schema: Schemas.NOTIFICATION_ARRAY,
      }));
    },
    markNotificationThreadAsRead: async (id, params) => {
      return this.fetch(`notifications/threads/${id}`, params, {
        method: this.Method.PATCH,
      }).then(response => ({ response }));
    },
  };

  search = {
    /**
     * Search repositories
     *
     * @param {string} query
     */
    getRepos: async (query, params) => {
      return this.fetch(
        `search/repositories?${query}`,
        params
      ).then(response => ({
        response,
        nextPageUrl: this.getNextPageUrl(response),
        schema: Schemas.REPO_ARRAY,
        normalizrKey: 'items',
      }));
    },
  };
}
