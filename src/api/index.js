export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

const accessTokenParameters = accessToken => ({
  headers: {
    Authorization: `token ${accessToken}`,
    'Cache-Control': 'no-cache',
  },
});

const accessTokenParametersPUT = (accessToken, body = {}) => ({
  method: 'PUT',
  headers: {
    Authorization: `token ${accessToken}`,
    'Content-Length': 0,
  },
  body: JSON.stringify(body)
});

const accessTokenParametersDELETE = (accessToken) => ({
  method: 'DELETE',
  headers: {
    Authorization: `token ${accessToken}`,
  },
});


const accessTokenParametersPATCH = (editParams, accessToken) => ({
  method: 'PATCH',
  headers: {
    Authorization: `token ${accessToken}`,
  },
  body: JSON.stringify(editParams),
});

const accessTokenParametersPOST = (accessToken, body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/vnd.github.squirrel-girl-preview',
    Authorization: `token ${accessToken}`,
  },
  body: JSON.stringify(body),
});

const accessTokenParametersDELETEPreview = (accessToken) => ({
  method: 'DELETE',
  headers: {
    Accept: 'application/vnd.github.squirrel-girl-preview',
    Authorization: `token ${accessToken}`,
  }
});

const accessTokenParametersHTMLPreview = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.html, application/vnd.github.squirrel-girl-preview',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersHTML = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.html',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersDiff = accessToken => ({
  headers: {
    Accept: 'application/vnd.github.v3.diff',
    Authorization: `token ${accessToken}`,
  },
});

const accessTokenParametersPreview = accessToken => ({
  headers: {
    Accept: '  application/vnd.github.squirrel-girl-preview',
    Authorization: `token ${accessToken}`,
    'Cache-Control': 'no-cache',
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

const root = 'https://api.github.com';

export const fetchAccessToken = (code, state) => {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';

  return fetch(
    GITHUB_OAUTH_ENDPOINT,
    authParameters(code, state),
  ).then(response => response.json());
};

export const fetchAuthUser = accessToken => {
  const USER_ENDPOINT = `${root}/user`;

  return fetch(
    USER_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchAuthUserOrgs = accessToken => {
  const ORGS_ENDPOINT = `${root}/user/orgs`;

  return fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchUser = (user, accessToken) => {
  const USER_ENDPOINT = `${root}/users/${user}`;

  return fetch(
    USER_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchUserOrgs = (user, accessToken) => {
  const ORGS_ENDPOINT = `${root}/users/${user}/orgs`;

  return fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchUserEvents = (user, accessToken) => {
  const EVENTS_ENDPOINT = `${root}/users/${user}/received_events`;

  return fetch(
    EVENTS_ENDPOINT,
    accessTokenParameters(accessToken),
    ).then(response => response.json());
  };

export const fetchReadMe = (user, repository, accessToken) => {
  const README_ENDPOINT = `${root}/repos/${user}/${repository}/readme?ref=master`;

  return fetch(
    README_ENDPOINT,
    accessTokenParametersHTML(accessToken),
  ).then(response => response.text());
};

export const fetchOrg = (orgName, accessToken) => {
  return fetchUrl(`${root}/orgs/${orgName}`, accessToken);
};

export const fetchOrgMembers = (orgName, accessToken) => {
  return fetchUrl(`${root}/orgs/${orgName}/members`, accessToken);
};

export const fetchPostIssueComment = (body, owner, repoName, issueNum, accessToken) => {
  const POST_ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/comments`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPOST(accessToken, {body: body}),
  ).then(response => response.json());
};

export const fetchCreateIssueReaction = (type, issueNum, owner, repoName, accessToken) => {
  const POST_ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/reactions`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPOST(accessToken, {content: type}),
  ).then(response => response.json());
};

export const fetchCreateCommentReaction = (type, commentID, owner, repoName, accessToken) => {
  const POST_ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/comments/${commentID}/reactions`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPOST(accessToken, {content: type}),
  ).then(response => response.json());
};

export const fetchDeleteReaction = (reactionID, accessToken) => {
  const POST_ENDPOINT = `${root}/reactions/${reactionID}`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersDELETEPreview(accessToken));
};

export const fetchEditIssue = (owner, repoName, issueNum, editParams, updateParams, accessToken) => {
  const POST_ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPATCH(editParams, accessToken));
};

export const fetchChangeIssueLockStatus = (owner, repoName, issueNum, currentStatus, accessToken) => {
  const POST_ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/lock`;

  return fetch(
    POST_ENDPOINT,
    currentStatus ? accessTokenParametersDELETE(accessToken) : accessTokenParametersPUT(accessToken));
};

export const fetchSearch = (type, query, accessToken, params = '') => {
  const POST_ENDPOINT = `https://api.github.com/search/${type}?q=${query}${params}`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchNotifications = (participating, all, accessToken) => {
  const POST_ENDPOINT = `https://api.github.com/notifications?participating=${participating}&all=${all}`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

export const fetchMarkNotificationAsRead = (notificationID, accessToken) => {
  const POST_ENDPOINT = `https://api.github.com/notifications/threads/${notificationID}`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPATCH(null, accessToken),
  );
};

export const fetchMarkRepoNotificationAsRead = (repoFullName, accessToken) => {
  const POST_ENDPOINT = `https://api.github.com/repos/${repoFullName}/notifications`;

  return fetch(
    POST_ENDPOINT,
    accessTokenParametersPUT(accessToken),
  );
};

///

export const fetchDiff = (url, accessToken) => {
  return fetch(
    url,
    accessTokenParametersDiff(accessToken),
  ).then(response => response.text());
};

///

///

export const fetchUrl = (url, accessToken) => {
  return fetch(
    url,
    accessTokenParameters(accessToken),
  ).then(response => response.json());
};

///

///

export const fetchUrlPreview = (url, accessToken) => {
  return fetch(
    url,
    accessTokenParametersPreview(accessToken),
  ).then(response => response.json());
};

///

///

export const fetchCommentHTML = (url, accessToken) => {
  return fetch(
    url,
    accessTokenParametersHTMLPreview(accessToken),
  ).then(response => response.json());
};

///

export const USER_ENDPOINT = user => `${root}/users/${user}`;
