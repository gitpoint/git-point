import { Client } from '../base';
import Schemas from './schemas';

export class Github extends Client {
  API_ROOT = 'https://api.github.com/';

  setAccessToken = accessToken => {
    this.authHeaders = { Authorization: `token ${accessToken}` };
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
   * The organizations endpoint
   */
  orgs = {
    /**
     * Gets an organization by its id
     *
     * @param {string} orgId
     */
    getById: async (orgId, params) => {
      return this.fetch(
        `orgs/${orgId}`,
        {
          schema: Schemas.ORG,
        },
        params
      ).then(struct => struct);
    },
    /**
     * Gets organization members
     *
     * @param {string} orgId
     */
    getMembers: async (orgId, params) => {
      return this.fetch(
        `orgs/${orgId}/members`,
        {
          schema: Schemas.USER_ARRAY,
        },
        params
      ).then(struct => {
        return {
          ...struct,
          nextPageUrl: this.getNextPageUrl(struct.response),
        };
      });
    },
    /**
     * Gets organization members
     *
     * @param {string} orgId
     */
    getRepos: async (orgId, params) => {
      return this.fetch(
        `orgs/${orgId}/repos`,
        {
          schema: Schemas.REPO_ARRAY,
        },
        params
      ).then(struct => {
        return {
          ...struct,
          nextPageUrl: this.getNextPageUrl(struct.response),
        };
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
    getEventsReceived: async (userId, params) => {
      return this.fetch(
        `users/${userId}/received_events`,
        {
          schema: Schemas.EVENT_ARRAY,
        },
        params
      ).then(struct => {
        return {
          ...struct,
          nextPageUrl: this.getNextPageUrl(struct.response),
        };
      });
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
        {
          schema: Schemas.REPO_ARRAY,
          normalizrKey: 'items',
        },
        params
      ).then(struct => {
        return {
          ...struct,
          nextPageUrl: this.getNextPageUrl(struct.response),
        };
      });
    },
  };
}
