import { abbreviateNumber } from 'utils';

// These keys are for development purposes and do not represent the actual application keys.
// Feel free to use them or use a new set of keys by creating an OAuth application of your own.
// https://github.com/settings/applications/new
export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

export const root = 'https://api.github.com';
export const USER_ENDPOINT = user => `${root}/users/${user}`;

const ACCEPT = {
  JSON: 'application/vnd.github.v3+json',
  HTML: 'application/vnd.github.v3.html+json',
  DIFF: 'application/vnd.github.v3.diff+json',
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

const v3 = {
  root: 'https://api.github.com',
  call: async (url, parameters) => {
    const finalUrl = url.indexOf(v3.root) === 0 ? url : `${v3.root}${url}`;
    // console.log('Calling url', finalUrl, parameters);
    const response = await fetch(finalUrl, parameters);

    return response;
  },
  parameters: (
    accessToken,
    method = METHOD.GET,
    accept = ACCEPT.JSON,
    body = {}
  ) => {
    const params = {
      method,
      headers: {
        Accept: accept,
        Authorization: `token ${accessToken}`,
        'Cache-Control': 'no-cache',
      },
    };

    if (
      method === METHOD.PUT ||
      method === METHOD.PATCH ||
      method === METHOD.POST
    ) {
      params.body = JSON.stringify(body);
      if (method === METHOD.PUT) {
        params.headers['Content-Length'] = 0;
      }
    }

    return params;
  },

  getJson: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.JSON)
    );

    return response.json();
  },
  getHtml: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.HTML)
    );

    return response.text();
  },
  getDiff: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.DIFF)
    );

    return response.text();
  },
  getRaw: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.RAW)
    );

    return response.text();
  },
  postJson: async (url, accessToken, body) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response.json();
  },
  patch: async (url, accessToken, body) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.PATCH, ACCEPT.JSON, body)
    );

    return response;
  },
  delete: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.DELETE, ACCEPT.JSON)
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
  get: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.GET, ACCEPT.JSON, body)
    );

    return response;
  },
  post: async (url, accessToken, body = {}) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body)
    );

    return response;
  },
  head: async (url, accessToken) => {
    const response = await v3.call(
      url,
      v3.parameters(accessToken, METHOD.HEAD, ACCEPT.JSON)
    );

    return response;
  },
};

export async function fetchUrl(url, accessToken) {
  return v3.getJson(url, accessToken);
}

export async function fetchUrlNormal(url, accessToken) {
  return v3.get(url, accessToken);
}

export async function fetchUrlHead(url, accessToken) {
  return v3.head(url, accessToken);
}

export async function fetchUrlFile(url, accessToken) {
  return v3.getRaw(url, accessToken);
}

export async function fetchAuthUser(accessToken) {
  return v3.getJson('/user', accessToken);
}

export async function fetchAuthUserOrgs(accessToken) {
  return v3.getJson('/user/orgs', accessToken);
}

export async function fetchUser(user, accessToken) {
  return v3.getJson(`/users/${user}`, accessToken);
}

export async function fetchUserOrgs(user, accessToken) {
  return v3.getJson(`/users/${user}/orgs`, accessToken);
}

export async function fetchUserEvents(user, accessToken) {
  return v3.getJson(`/users/${user}/received_events?per_page=100`, accessToken);
}

export async function fetchReadMe(user, repository, accessToken) {
  return v3.getHtml(
    `/repos/${user}/${repository}/readme?ref=master`,
    accessToken
  );
}

export async function fetchOrg(orgName, accessToken) {
  return v3.getJson(`/orgs/${orgName}`, accessToken);
}

export async function fetchOrgMembers(orgName, accessToken) {
  return v3.getJson(`/orgs/${orgName}/members`, accessToken);
}

export async function fetchPostIssueComment(
  body,
  owner,
  repoName,
  issueNum,
  accessToken
) {
  return v3.postJson(
    `/repos/${owner}/${repoName}/issues/${issueNum}/comments`,
    accessToken,
    { body }
  );
}

export async function fetchEditIssue(
  owner,
  repoName,
  issueNum,
  editParams,
  updateParams,
  accessToken
) {
  return v3.patch(
    `/repos/${owner}/${repoName}/issues/${issueNum}`,
    accessToken,
    editParams
  );
}

export async function fetchChangeIssueLockStatus(
  owner,
  repoName,
  issueNum,
  currentStatus,
  accessToken
) {
  const ENDPOINT = `/repos/${owner}/${repoName}/issues/${issueNum}/lock`;

  return currentStatus
    ? v3.delete(ENDPOINT, accessToken)
    : v3.put(ENDPOINT, accessToken);
}

export async function fetchSearch(type, query, accessToken, params = '') {
  return v3.getJson(`/search/${type}?q=${query}${params}`, accessToken);
}

export async function fetchNotifications(participating, all, accessToken) {
  return v3.getJson(
    `/notifications?participating=${participating}&all=${all}`,
    accessToken
  );
}

export async function fetchMarkNotificationAsRead(notificationID, accessToken) {
  return v3.patch(`/notifications/threads/${notificationID}`, accessToken);
}

export async function fetchMarkRepoNotificationAsRead(
  repoFullName,
  accessToken
) {
  return v3.put(`/repos/${repoFullName}/notifications`, accessToken);
}

export async function fetchChangeStarStatusRepo(
  owner,
  repo,
  starred,
  accessToken
) {
  const ENDPOINT = `/user/starred/${owner}/${repo}`;

  return starred
    ? v3.delete(ENDPOINT, accessToken)
    : v3.put(ENDPOINT, accessToken);
}

export async function fetchForkRepo(owner, repo, accessToken) {
  return v3.post(`/repos/${owner}/${repo}/forks`, accessToken);
}

export async function fetchStarCount(owner, accessToken) {
  const response = await v3.get(
    `/users/${owner}/starred?per_page=1`,
    accessToken
  );

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

export async function isWatchingRepo(url, accessToken) {
  return v3.head(url, accessToken);
}

export async function watchRepo(owner, repo, accessToken) {
  return v3.put(`/repos/${owner}/${repo}/subscription`, accessToken, {
    subscribed: true,
  });
}

export async function unWatchRepo(owner, repo, accessToken) {
  return v3.delete(`/repos/${owner}/${repo}/subscription`, accessToken);
}

export async function fetchChangeFollowStatus(user, isFollowing, accessToken) {
  const ENDPOINT = `/user/following/${user}`;

  return isFollowing
    ? v3.delete(ENDPOINT, accessToken)
    : v3.put(ENDPOINT, accessToken);
}

export async function fetchDiff(url, accessToken) {
  return v3.getDiff(url, accessToken);
}

export async function fetchMergeStatus(repo, issueNum, accessToken) {
  return v3.get(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken);
}

export async function fetchMergePullRequest(
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod,
  accessToken
) {
  return v3.put(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken, {
    commit_title: commitTitle,
    commit_message: commitMessage,
    merge_method: mergeMethod,
  });
}

export async function fetchSubmitNewIssue(
  owner,
  repo,
  issueTitle,
  issueComment,
  accessToken
) {
  return v3.postJson(`/repos/${owner}/${repo}/issues`, accessToken, {
    title: issueTitle,
    body: issueComment,
  });
}

// Auth
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

export async function fetchAccessToken(code, state) {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';
  const response = await fetch(
    GITHUB_OAUTH_ENDPOINT,
    authParameters(code, state)
  );

  return response.json();
}
