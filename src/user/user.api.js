import { v3 } from 'api';

export const fetchUser = (user, accessToken) =>
  v3.getJson(`/users/${user}`, accessToken);

export const fetchUserOrgs = (user, accessToken) =>
  v3.getJson(`/users/${user}/orgs`, accessToken);

export const fetchStarCount = (owner, accessToken) =>
  v3.count(`/users/${owner}/starred`, accessToken);

export const fetchChangeFollowStatus = (user, isFollowing, accessToken) =>
  v3[isFollowing ? 'delete' : 'put'](`/user/following/${user}`, accessToken);

export const fetchUserEvents = (user, accessToken) =>
  v3.getJson(`/users/${user}/received_events?per_page=100`, accessToken);
