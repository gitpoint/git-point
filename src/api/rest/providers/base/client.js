export class Client {
  Method = {
    GET: 'GET',
    HEAD: 'HEAD',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
  };

  fetch = async (
    url,
    {
      method = this.Method.GET,
      schema = null,
      normalizrKey = null,
      headers = {},
    },
    params = {}
  ) => {
    let finalUrl = params.url || url;

    if (finalUrl.indexOf(this.API_ROOT) === -1) {
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
      .then(response => {
        // analyze headers for pagination, rates, etc
        return {
          response,
          schema,
          normalizrKey,
        };
      })
      .catch(error => error);
  };
}
