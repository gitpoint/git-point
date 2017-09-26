import { v3 } from 'api';

export const fetchAuthUser = accessToken => v3.getJson('/user', accessToken);

export const fetchAuthUserOrgs = accessToken =>
  v3.getJson('/user/orgs', accessToken);
