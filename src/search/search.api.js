import { v3 } from 'api';

export const fetchSearch = (type, query, accessToken, params = '') =>
  v3.getJson(`/search/${type}?q=${query}${params}`, accessToken);
