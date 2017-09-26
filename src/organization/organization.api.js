import { v3 } from 'api';

export const fetchOrg = (orgName, accessToken) =>
  v3.getJson(`/orgs/${orgName}`, accessToken);

export const fetchOrgMembers = (orgName, accessToken) =>
  v3.getJson(`/orgs/${orgName}/members`, accessToken);
