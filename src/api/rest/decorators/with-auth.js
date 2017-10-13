export const withAuth = Provider => {
  const client = new Provider();

  return new Proxy(withAuth, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, call) => (...args) => (dispatch, getState) => {
          // Get accessToken from state
          client.setAccessToken(getState().auth.accessToken);

          /* eslint-disable no-unexpected-multiline */
          return endpoint[call](...args);
        },
      });
    },
  });
};
