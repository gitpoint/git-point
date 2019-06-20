import { createDispatchProxy } from './proxies';
import { Client } from './client';

// These keys are for development purposes and do not represent the actual application keys.
// Feel free to use them or use a new set of keys by creating an OAuth application of your own.
// https://github.com/settings/applications/new
export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

export const RestClient = createDispatchProxy(Client);

const ACCEPT = {
  DIFF: 'application/vnd.github.v3.diff+json',
  FULL: 'application/vnd.github.v3.full+json',
  HTML: 'application/vnd.github.v3.html+json',
  JSON: 'application/vnd.github.v3+json',
  MERCY_PREVIEW: 'application/vnd.github.mercy-preview+json',
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
    let number;

    if (linkHeader !== null) {
      linkHeader = linkHeader.match(/page=(\d)+/g).pop();
      number = linkHeader.split('=').pop();
    } else {
      number = await response.json().then(data => {
        return data.length;
      });
    }

    return number;
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
  getFull: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.FULL)
    );

    return response.json();
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
  patchFull: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.PATCH, ACCEPT.FULL, body)
    );

    return response.json();
  },
  postJson: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response.json();
  },
  postHtml: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.HTML, body)
    );

    return response.text();
  },
  postFull: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.FULL, body)
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

export const fetchAuthUser = accessToken => v3.getJson('/user', accessToken);

export const fetchAuthUserOrgs = accessToken =>
  v3.getJson('/user/orgs', accessToken);

export const fetchUser = (user, accessToken) =>
  v3.getJson(`/users/${user}`, accessToken);

export const fetchUserOrgs = (user, accessToken) =>
  v3.getJson(`/users/${user}/orgs`, accessToken);

export const fetchReadMe = (user, repository, accessToken) =>
  v3.getHtml(`/repos/${user}/${repository}/readme?ref=master`, accessToken);

export const fetchOrg = (orgName, accessToken) =>
  v3.getJson(`/orgs/${orgName}`, accessToken);

export const fetchOrgMembers = (orgName, accessToken) =>
  v3.getJson(`/orgs/${orgName}/members`, accessToken);

export const fetchPostIssueComment = (
  body,
  owner,
  repoName,
  issueNum,
  accessToken
) =>
  v3.postFull(
    `/repos/${owner}/${repoName}/issues/${issueNum}/comments`,
    accessToken,
    { body }
  );

export const fetchDeleteIssueComment = (
  issueCommentId,
  owner,
  repoName,
  accessToken
) =>
  v3.delete(
    `/repos/${owner}/${repoName}/issues/comments/${issueCommentId}`,
    accessToken
  );

export const fetchEditIssueComment = (
  issueCommentId: number,
  owner: string,
  repoName: string,
  editParams: any,
  accessToken: string
) =>
  v3.patchFull(
    `/repos/${owner}/${repoName}/issues/comments/${issueCommentId}`,
    accessToken,
    editParams
  );

export const fetchEditIssue = (
  owner,
  repoName,
  issueNum,
  editParams,
  accessToken
) =>
  v3.patchFull(
    `/repos/${owner}/${repoName}/issues/${issueNum}`,
    accessToken,
    editParams
  );

export const fetchChangeIssueLockStatus = (
  owner,
  repoName,
  issueNum,
  currentStatus,
  accessToken
) =>
  v3[currentStatus ? 'delete' : 'put'](
    `/repos/${owner}/${repoName}/issues/${issueNum}/lock`,
    accessToken
  );

export const fetchSearch = (type, query, accessToken, params = '') =>
  v3.getJson(`/search/${type}?q=${query}${params}`, accessToken);

export const fetchNotifications = (participating, all, accessToken) =>
  v3.getJson(
    `/notifications?participating=${participating}&all=${all}`,
    accessToken
  );

export const fetchMarkNotificationAsRead = (notificationID, accessToken) =>
  v3.patch(`/notifications/threads/${notificationID}`, accessToken);

export const fetchMarkRepoNotificationAsRead = (repoFullName, accessToken) =>
  v3.put(`/repos/${repoFullName}/notifications`, accessToken);

export const fetchMarkAllNotificationsAsRead = accessToken =>
  v3.put('/notifications', accessToken);

export const fetchStarCount = (owner, accessToken) =>
  v3.count(`/users/${owner}/starred`, accessToken);

export const fetchChangeFollowStatus = (user, isFollowing, accessToken) =>
  v3[isFollowing ? 'delete' : 'put'](`/user/following/${user}`, accessToken);

export const fetchDiff = (url, accessToken) => v3.getDiff(url, accessToken);

export const fetchMergeStatus = (repo, issueNum, accessToken) =>
  v3.get(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken);

export const fetchMergePullRequest = (
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod,
  accessToken
) =>
  v3.put(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken, {
    commit_title: commitTitle,
    commit_message: commitMessage,
    merge_method: mergeMethod,
  });

export const fetchSubmitNewIssue = (
  owner,
  repo,
  issueTitle,
  issueComment,
  accessToken
) =>
  v3.postJson(`/repos/${owner}/${repo}/issues`, accessToken, {
    title: issueTitle,
    body: issueComment,
  });

// Auth
const authParameters = (code, state) => ({
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

export async function fetchAccessToken(code, state) {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';
  const response = await fetch(
    GITHUB_OAUTH_ENDPOINT,
    authParameters(code, state)
  );

  return response.json();
}

export const fetchNotificationsCount = accessToken =>
  v3.count('/notifications?per_page=1', accessToken);

export const fetchRepoNotificationsCount = (owner, repoName, accessToken) =>
  v3.count(`/repos/${owner}/${repoName}/notifications?per_page=1`, accessToken);
