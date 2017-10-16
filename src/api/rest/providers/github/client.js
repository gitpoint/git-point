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

    return response.json().then(data => data.length).catch(() => 0);
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
        {
          schema: Schemas.NOTIFICATION_ARRAY,
        },
        finalParams
      ).then(struct => {
        return {
          ...struct,
          nextPageUrl: this.getNextPageUrl(struct.response),
        };
      });
    },
    markNotificationThreadAsRead: async (id, params) => {
      return this.fetch(
        `notifications/threads/${id}`,
        {
          method: this.Method.PATCH,
        },
        params
      ).then(struct => {
        return {
          ...struct,
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
