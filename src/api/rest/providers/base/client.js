export class Client {
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

  authHeaders = {};

  fetch = async (
    url,
    params = {},
    { method = this.Method.GET, headers = {} } = {}
  ) => {
    let finalUrl;

    if (params.url) {
      // a different url was provided, use it instead (paginated)
      finalUrl = params.url;
    } else {
      finalUrl = url;
      // add explicitely specified parameters
      if (params.per_page) {
        finalUrl = `${finalUrl}${finalUrl.includes('?')
          ? '&'
          : '?'}per_page=${params.per_page}`;
      }
    }

    if (!finalUrl.includes(this.API_ROOT)) {
      finalUrl = `${this.API_ROOT}${finalUrl}`;
    }

    const parameters = {
      method,
      headers: {
        'Cache-Control': 'no-cache',
        ...this.authHeaders,
        ...headers,
      },
    };

    return fetch(finalUrl, parameters)
      .then(response => response)
      .catch(error => error);
  };

  /* eslint-disable no-unused-vars */

  /**
   * Sets the authorization headers given an access token.
   *
   * @abstract
   * @param {string} token The oAuth access token
   */
  setAuthHeaders = token => {
    throw new Error('Not implemented');
  };

  /**
   * Counts the entities available by analysing the Response object
   *
   * @abstract
   * @async
   * @param {Response} response
   */
  getCount = async response => {
    throw new Error('Not implemented');
  };
}
