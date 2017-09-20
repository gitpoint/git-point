import { abbreviateNumber } from 'utils';

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

export async function fetchUrl(url, accessToken) {
  const response = await fetch(url, accessTokenParameters(accessToken));

  return response.json();
}

export async function fetchUrlNormal(url, accessToken) {
  const response = await fetch(url, accessTokenParameters(accessToken));

  return response;
}

export async function fetchUrlFile(url, accessToken) {
  const response = await fetch(url, accessTokenParametersRaw(accessToken));

  return response.text();
}

export async function fetchCommentHTML(url, accessToken) {
  const response = await fetch(url, accessTokenParameters(accessToken));

  return response.json();
}

export async function fetchAccessToken(code, state) {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';
  const response = await fetch(
    GITHUB_OAUTH_ENDPOINT,
    authParameters(code, state)
  );

  return response.json();
}

export async function fetchAuthUser(accessToken) {
  const FETCH_AUTH_USER_ENDPOINT = `${root}/user`;
  const response = await fetch(
    FETCH_AUTH_USER_ENDPOINT,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchAuthUserOrgs(accessToken) {
  const ORGS_ENDPOINT = `${root}/user/orgs`;
  const response = await fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchUser(user, accessToken) {
  const FETCH_USER_ENDPOINT = `${root}/users/${user}`;
  const response = await fetch(
    FETCH_USER_ENDPOINT,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchUserOrgs(user, accessToken) {
  const ORGS_ENDPOINT = `${root}/users/${user}/orgs`;
  const response = await fetch(
    ORGS_ENDPOINT,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchUserEvents(user, accessToken) {
  const EVENTS_ENDPOINT = `${root}/users/${user}/received_events?per_page=100`;
  const response = await fetch(
    EVENTS_ENDPOINT,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchReadMe(user, repository, accessToken) {
  const README_ENDPOINT = `${root}/repos/${user}/${repository}/readme?ref=master`;
  const response = await fetch(
    README_ENDPOINT,
    accessTokenParametersHTML(accessToken)
  );

  return response.text();
}

export async function fetchOrg(orgName, accessToken) {
  const response = await fetch(
    `${root}/orgs/${orgName}`,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchOrgMembers(orgName, accessToken) {
  const response = await fetch(
    `${root}/orgs/${orgName}/members`,
    accessTokenParameters(accessToken)
  );

  return response.json();
}

export async function fetchPostIssueComment(
  body,
  owner,
  repoName,
  issueNum,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/comments`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPOST(accessToken, { body })
  );

  return response.json();
}

export async function fetchEditIssue(
  owner,
  repoName,
  issueNum,
  editParams,
  updateParams,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPATCH(editParams, accessToken)
  );

  return response;
}

export async function fetchChangeIssueLockStatus(
  owner,
  repoName,
  issueNum,
  currentStatus,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${owner}/${repoName}/issues/${issueNum}/lock`;
  const response = await fetch(
    ENDPOINT,
    currentStatus
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );

  return response;
}

export async function fetchSearch(type, query, accessToken, params = '') {
  const ENDPOINT = `${root}/search/${type}?q=${query}${params}`;
  const response = await fetch(ENDPOINT, accessTokenParameters(accessToken));

  return response.json();
}

export async function fetchNotifications(participating, all, accessToken) {
  const ENDPOINT = `${root}/notifications?participating=${participating}&all=${all}`;
  const response = await fetch(ENDPOINT, accessTokenParameters(accessToken));

  return response.json();
}

export async function fetchMarkNotificationAsRead(notificationID, accessToken) {
  const ENDPOINT = `${root}/notifications/threads/${notificationID}`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPATCH(null, accessToken)
  );

  return response;
}

export async function fetchMarkRepoNotificationAsRead(
  repoFullName,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${repoFullName}/notifications`;
  const response = await fetch(ENDPOINT, accessTokenParametersPUT(accessToken));

  return response;
}

export async function fetchChangeStarStatusRepo(
  owner,
  repo,
  starred,
  accessToken
) {
  const ENDPOINT = `${root}/user/starred/${owner}/${repo}`;
  const response = await fetch(
    ENDPOINT,
    starred
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );

  return response;
}

export async function fetchForkRepo(owner, repo, accessToken) {
  const ENDPOINT = `${root}/repos/${owner}/${repo}/forks`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPOST(accessToken)
  );

  return response;
}

export async function fetchStarCount(owner) {
  const ENDPOINT = `${root}/users/${owner}/starred?per_page=1`;
  const response = await fetch(ENDPOINT);

  let linkHeader = response.headers.get('Link');
  let output = '';

  if (linkHeader == null) {
    output = response.json().then(data => {
      return data.length;
    });
  } else {
    linkHeader = linkHeader.match(/page=(\d)+/g).pop();
    output = linkHeader.split('=').pop();
  }

  return abbreviateNumber(output);
}

export async function watchRepo(isSubscribed, owner, repo, accessToken) {
  const ENDPOINT = `${root}/repos/${owner}/${repo}/subscription`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParameters(accessToken, { subscribed: isSubscribed })
  );

  return response;
}

export async function unWatchRepo(owner, repo, accessToken) {
  const ENDPOINT = `${root}/repos/${owner}/${repo}/subscription`;
  const response = await fetch(ENDPOINT, accessTokenParameters(accessToken));

  return response;
}

export async function fetchChangeFollowStatus(user, isFollowing, accessToken) {
  const ENDPOINT = `${root}/user/following/${user}`;
  const response = await fetch(
    ENDPOINT,
    isFollowing
      ? accessTokenParametersDELETE(accessToken)
      : accessTokenParametersPUT(accessToken)
  );

  return response;
}

export async function fetchDiff(url, accessToken) {
  const response = await fetch(url, accessTokenParametersDiff(accessToken));

  return response.text();
}

export async function fetchMergeStatus(repo, issueNum, accessToken) {
  const ENDPOINT = `${root}/repos/${repo}/pulls/${issueNum}/merge`;
  const response = await fetch(ENDPOINT, accessTokenParameters(accessToken));

  return response;
}

export async function fetchMergePullRequest(
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${repo}/pulls/${issueNum}/merge`;

  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPUT(accessToken, {
      commit_title: commitTitle,
      commit_message: commitMessage,
      merge_method: mergeMethod,
    })
  );

  return response;
}

export async function fetchSubmitNewIssue(
  owner,
  repo,
  issueTitle,
  issueComment,
  accessToken
) {
  const ENDPOINT = `${root}/repos/${owner}/${repo}/issues`;
  const response = await fetch(
    ENDPOINT,
    accessTokenParametersPOST(accessToken, {
      title: issueTitle,
      body: issueComment,
    })
  );

  return response.json();
}
