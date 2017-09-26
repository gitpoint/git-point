import { v3 } from 'api';

export const fetchReadMe = (user, repository, accessToken) =>
  v3.getHtml(`/repos/${user}/${repository}/readme?ref=master`, accessToken);

export const fetchForkRepo = (owner, repo, accessToken) =>
  v3.post(`/repos/${owner}/${repo}/forks`, accessToken);

export const isWatchingRepo = (url, accessToken) => v3.head(url, accessToken);

export const watchRepo = (owner, repo, accessToken) =>
  v3.put(`/repos/${owner}/${repo}/subscription`, accessToken, {
    subscribed: true,
  });

export const unWatchRepo = (owner, repo, accessToken) =>
  v3.delete(`/repos/${owner}/${repo}/subscription`, accessToken);

export const fetchChangeStarStatusRepo = (owner, repo, starred, accessToken) =>
  v3[starred ? 'delete' : 'put'](`/user/starred/${owner}/${repo}`, accessToken);
