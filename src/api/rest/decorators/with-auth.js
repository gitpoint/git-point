export const withAuth = Provider => {
  const client = new Provider();

  return new Proxy(withAuth, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, method) => (...args) => (dispatch, getState) => {
          // Get accessToken from state
          client.setAuthHeaders(getState().auth.accessToken);

          return endpoint[method](...args);
        },
      });
    },
  });
};
