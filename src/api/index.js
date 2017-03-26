export const CLIENT_ID = '87c7f05700c052937cfb';
export const CLIENT_SECRET = '3a70aee4d5e26c457720a31c3efe2f9062a4997a';

const accessTokenParameters = (accessToken) => ({
  headers: {
    Authorization: `token ${accessToken}`
  }
});

const accessTokenParametersHTML = (accessToken) => ({
  headers: {
    Accept: 'application/vnd.github.VERSION.html',
    Authorization: `token ${accessToken}`
  }
});


const authParameters = (code, state) => ({
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      state
    })
});

const root = 'https://api.github.com';

export const fetchAccessToken = (code, state) => {
  const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';

  return fetch(GITHUB_OAUTH_ENDPOINT, authParameters(code, state))
    .then(response => response.json())
};

export const fetchAuthUser = (accessToken) => {
  const USER_ENDPOINT = `${root}/user`;

  return fetch(USER_ENDPOINT, accessTokenParameters(accessToken))
    .then(response => response.json())
};

export const fetchAuthUserOrgs = (accessToken) => {
  const ORGS_ENDPOINT = `${root}/user/orgs`;

  return fetch(ORGS_ENDPOINT, accessTokenParameters(accessToken))
    .then(response => response.json())
};

export const fetchUser = (user, accessToken) => {
  const USER_ENDPOINT = `${root}/users/${user}`;

  return fetch(USER_ENDPOINT, accessTokenParameters(accessToken))
    .then(response => response.json())
};

export const fetchUserOrgs = (user, accessToken) => {
  const ORGS_ENDPOINT = `${root}/users/${user}/orgs`;

  return fetch(ORGS_ENDPOINT, accessTokenParameters(accessToken))
    .then(response => response.json())
};

export const fetchUserEvents = (user, accessToken) => {
  const EVENTS_ENDPOINT = `${root}/users/${user}/received_events`;

  return fetch(EVENTS_ENDPOINT, accessTokenParameters(accessToken))
    .then(response => response.json())
};

export const fetchReadMe = (user, repository, accessToken) => {
  const README_ENDPOINT = `${root}/repos/${user}/${repository}/readme?ref=master`;

  return fetch(README_ENDPOINT, accessTokenParametersHTML(accessToken))
    .then(response => response.text())
};

///

export const fetchUrl = (url, accessToken) => {
  return fetch(url, accessTokenParametersHTML(accessToken))
    .then(response => response.json())
};
