import { normalize } from 'normalizr';

const API_ROOT = 'https://api.github.com/';

const getNextPageUrl = response => {
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

export const handlePaginatedApi = (
  firstPageUrl,
  { name, key, call },
  { loadMore = false, forceRefresh = false } = {}
) => (dispatch, getState) => {
  const paginator = getState().pagination[name][key];
  let { nextPageUrl = firstPageUrl } = paginator || {};
  const { pageCount = 0, isFetching = false } = paginator || {};

  if (forceRefresh) {
    // TODO: how to reset the state ? dispatch(clearPagination('paginationId')) ?
    nextPageUrl = firstPageUrl;
  } else if (isFetching || (pageCount > 0 && !loadMore) || !nextPageUrl) {
    return null;
  }

  return dispatch(call(key, nextPageUrl));
};

export const performApiCall = (
  endpoint,
  params,
  schema,
  accessToken,
  normalizrKey
) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
      'Cache-Control': 'no-cache',
    },
  }).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const nextPageUrl = getNextPageUrl(response);

      return Object.assign(
        {},
        normalize(normalizrKey ? json[normalizrKey] : json, schema),
        { nextPageUrl }
      );
    })
  );
};
