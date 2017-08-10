// These keys are for development purposes and do not represent the actual application keys.
// Feel free to use them or use a new set of keys by creating an OAuth application of your own.
// https://github.com/settings/applications/new
export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

export const root = 'https://api.github.com';
export const USER_ENDPOINT = user => `${root}/users/${user}`;

const accessTokenParameters = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${accessToken}`,
    'Cache-Control': 'no-cache',
  },
});

const accessTokenParametersPUT = (accessToken, body = {}) => ({
  method: 'PUT',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${accessToken}`,
    'Content-Length': 0,
  },
  body: JSON.stringify(body),
});

const accessTokenParametersDELETE = accessToken => ({
  method: 'DELETE',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersPATCH = (editParams, accessToken) => ({
  method: 'PATCH',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${accessToken}`,
  },
  body: JSON.stringify(editParams),
});

const accessTokenParametersPOST = (accessToken, body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${accessToken}`,
  },
  body: JSON.stringify(body),
});

const accessTokenParametersHTML = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.html+json',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersDiff = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.diff+json',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersRaw = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.raw+json',
    Authorization: `token ${accessToken}`,
  },
});

const authParameters = (code, state) => ({
  method: 'POST',
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

export const fetchUrl = (url, accessToken) => {
  return fetch(url, accessTokenParameters(accessToken)).then(response =>
    response.json()
  );
};

export const fetchUrlNormal = (url, accessToken) => {
  return fetch(url, accessTokenParameters(accessToken));
};

export const fetchUrlFile = (url, accessToken) => {
  return fetch(url, accessTokenParametersRaw(accessToken)).then(response =>
    response.text()
  );
};

export const fetchCommentHTML = (url, accessToken) => {
  return fetch(url, accessTokenParametersHTML(accessToken)).then(response =>
    response.json()
  );
};

export const fetchAccessToken = (code, state) => {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';

  return fetch(
    GITHUB_OAUTH_ENDPOINT,
    authParameters(code, state)
  ).then(response => response.json());
};

export const fetchAuthUser = accessToken => {
  const FETCH_AUTH_USER_ENDPOINT = `${root}/user`;

  return fetch(
    FETCH_AUTH_USER_ENDPOINT,
    accessTokenParameters(accessToken)
  ).then(response => response.json());
};

export const fetchAuthUserOrgs = accessToken => {
  const ORGS_ENDPOINT = `${root}/user/orgs`;

  return fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken)
  ).then(response => response.json());
};

export const fetchUser = (user, accessToken) => {
  const FETCH_USER_ENDPOINT = `${root}/users/${user}`;

  return fetch(
    FETCH_USER_ENDPOINT,
    accessTokenParameters(accessToken)
  ).then(response => response.json());
};

export const fetchUserOrgs = (user, accessToken) => {
  const ORGS_ENDPOINT = `${root}/users/${user}/orgs`;

  return fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken)
  ).then(response => response.json());
};

export const fetchUserEvents = (user, accessToken) => {
  const EVENTS_ENDPOINT = `${root}/users/${user}/received_events?per_page=100`;

  return fetch(
    EVENTS_ENDPOINT,
    accessTokenParameters(accessToken)
  ).then(response => response.json());
};

export const fetchReadMe = (user, repository, accessToken) => {
  const README_ENDPOINT = `${root}/repos/${user}/${repository}/readme?ref=master`;

  return fetch(
    README_ENDPOINT,
    accessTokenParametersHTML(accessToken)
  ).then(response => response.text());
};

export const fetchOrg = (orgName, accessToken) => {
  return fetchUrl(`${root}/orgs/${orgName}`, accessToken);
};

export const fetchOrgMembers = (orgName, accessToken) => {
  return fetchUrl(`${root}/orgs/${orgName}/members`, accessToken);
};

export const fetchPostIssueComment = (
  body,
  owner,
  repoName,
  issueNum,
  accessToken
) => {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/comments`;

  return fetch(
    ENDPOINT,
    accessTokenParametersPOST(accessToken, { body })
  ).then(response => response.json());
};

export const fetchEditIssue = (
  owner,
  repoName,
  issueNum,
  editParams,
  updateParams,
  accessToken
) => {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}`;

  return fetch(ENDPOINT, accessTokenParametersPATCH(editParams, accessToken));
};

export const fetchChangeIssueLockStatus = (
  owner,
  repoName,
  issueNum,
  currentStatus,
  accessToken
) => {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/lock`;

  return fetch(
    ENDPOINT,
    currentStatus
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );
};

export const fetchSearch = (type, query, accessToken, params = '') => {
  const ENDPOINT = `https://api.github.com/search/${type}?q=${query}${params}`;

  return fetch(ENDPOINT, accessTokenParameters(accessToken)).then(response =>
    response.json()
  );
};

export const fetchNotifications = (participating, all, accessToken) => {
  const ENDPOINT = `https://api.github.com/notifications?participating=${participating}&all=${all}`;

  return fetch(ENDPOINT, accessTokenParameters(accessToken)).then(response =>
    response.json()
  );
};

export const fetchMarkNotificationAsRead = (notificationID, accessToken) => {
  const ENDPOINT = `https://api.github.com/notifications/threads/${notificationID}`;

  return fetch(ENDPOINT, accessTokenParametersPATCH(null, accessToken));
};

export const fetchMarkRepoNotificationAsRead = (repoFullName, accessToken) => {
  const ENDPOINT = `https://api.github.com/repos/${repoFullName}/notifications`;

  return fetch(ENDPOINT, accessTokenParametersPUT(accessToken));
};

export const fetchChangeStarStatusRepo = (
  owner,
  repo,
  starred,
  accessToken
) => {
  const ENDPOINT = `https://api.github.com/user/starred/${owner}/${repo}`;

  return fetch(
    ENDPOINT,
    starred
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );
};

export const fetchForkRepo = (owner, repo, accessToken) => {
  const ENDPOINT = `https://api.github.com/repos/${owner}/${repo}/forks`;

  return fetch(ENDPOINT, accessTokenParametersPOST(accessToken));
};

export const watchRepo = (isSubscribed, owner, repo, accessToken) => {
  const ENDPOINT = `https://api.github.com/repos/${owner}/${repo}/subscription`;

  return fetch(
    ENDPOINT,
    accessTokenParametersPUT(accessToken, {
      subscribed: isSubscribed,
    })
  );
};

export const unWatchRepo = (owner, repo, accessToken) => {
  const ENDPOINT = `https://api.github.com/repos/${owner}/${repo}/subscription`;

  return fetch(ENDPOINT, accessTokenParametersDELETE(accessToken));
};

export const fetchChangeFollowStatus = (user, isFollowing, accessToken) => {
  const ENDPOINT = `https://api.github.com/user/following/${user}`;

  return fetch(
    ENDPOINT,
    isFollowing
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );
};

export const fetchDiff = (url, accessToken) => {
  return fetch(url, accessTokenParametersDiff(accessToken)).then(response =>
    response.text()
  );
};

export const fetchMergeStatus = (repo, issueNum, accessToken) => {
  const ENDPOINT = `https://api.github.com/repos/${repo}/pulls/${issueNum}/merge`;

  return fetch(ENDPOINT, accessTokenParameters(accessToken));
};

export const fetchMergePullRequest = (
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod,
  accessToken
) => {
  const ENDPOINT = `https://api.github.com/repos/${repo}/pulls/${issueNum}/merge`;

  return fetch(
    ENDPOINT,
    accessTokenParametersPUT(accessToken, {
      commit_title: commitTitle,
      commit_message: commitMessage,
      merge_method: mergeMethod,
    })
  );
};

export const fetchSubmitNewIssue = (
  owner,
  repo,
  issueTitle,
  issueComment,
  accessToken
) => {
  const ENDPOINT = `https://api.github.com/repos/${owner}/${repo}/issues`;

  return fetch(
    ENDPOINT,
    accessTokenParametersPOST(accessToken, {
      title: issueTitle,
      body: issueComment,
    })
  ).then(response => response.json());
};
