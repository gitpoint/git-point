import { abbreviateNumber } from 'utils';

// These keys are for development purposes and do not represent the actual application keys.
// Feel free to use them or use a new set of keys by creating an OAuth application of your own.
// https://github.com/settings/applications/new
export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

const ACCEPT = {
  JSON: 'application/vnd.github.v3+json',
  HTML: 'application/vnd.github.v3.html+json',
  DIFF: 'application/vnd.github.v3.diff+json',
  RAW: 'application/vnd.github.v3.raw+json',
};

const METHOD = {
  GET: 'GET',
  HEAD: 'HEAD',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
};

export const v3 = {
  root: 'https://api.github.com',
  call: async (url, parameters) => {
    const finalUrl = url.indexOf(v3.root) === 0 ? url : `${v3.root}${url}`;
    const response = await fetch(finalUrl, parameters);

    return response;
  },
  parameters: (
    accessToken,
    method = METHOD.GET,
    accept = ACCEPT.JSON,
    body = {}
  ) => {
    const withBody = [METHOD.PUT, METHOD.PATCH, METHOD.POST];
    const params = {
      method,
      headers: {
        Accept: accept,
        Authorization: `token ${accessToken}`,
        'Cache-Control': 'no-cache',
      },
    };

    if (withBody.indexOf(method) !== -1) {
      params.body = JSON.stringify(body);
      if (method === METHOD.PUT) {
        params.headers['Content-Length'] = 0;
      }
    }

    return params;
  },
  count: async (url, accessToken) => {
    const finalUrl =
      url.indexOf('?') !== -1 ? `${url}&per_page=1` : `${url}?per_page=1`;
    const response = await v3.get(finalUrl, accessToken);

    if (response.status === 404) {
      return 0;
    }

    let linkHeader = response.headers.get('Link');
    let number = 1;

    if (linkHeader !== null) {
      linkHeader = linkHeader.match(/page=(\d)+/g).pop();
      number = linkHeader.split('=').pop();
    }

    return abbreviateNumber(number);
  },
  delete: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.DELETE)
    );

    return response;
  },
  get: async (url, accessToken) => {
    const response = await v3.call(url, v3.parameters(accessToken));

    return response;
  },
  getDiff: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.DIFF)
    );

    return response.text();
  },
  getHtml: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.HTML)
    );

    return response.text();
  },
  getJson: async (url, accessToken) => {
    const response = await v3.call(url, v3.parameters(accessToken));

    return response.json();
  },
  getRaw: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.RAW)
    );

    return response.text();
  },
  head: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.HEAD)
    );

    return response;
  },
  patch: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.PATCH, ACCEPT.JSON, body)
    );

    return response;
  },
  postJson: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response.json();
  },
  post: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response;
  },
  put: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.PUT, ACCEPT.JSON, body)
    );

    return response;
  },
};

export const authParameters = (code, state) => ({
  method: METHOD.POST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    state,
  }),
});
