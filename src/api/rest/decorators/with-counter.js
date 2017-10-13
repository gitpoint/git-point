export const withCounter = Provider => {
  const client = new Provider();

  return new Proxy(withCounter, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, call) => (...args) => (dispatch, getState) => {
          // Get accessToken from state
          client.setAccessToken(getState().auth.accessToken);

          // Identify if we have our magical last argument
          const declaredArgsNumber = endpoint[call].length;
          const isMagicArgAvailable = args.length === declaredArgsNumber;

          const pureArgs = isMagicArgAvailable
            ? args.slice(0, args.length - 1)
            : args;
          const magicArg = isMagicArgAvailable ? args[args.length - 1] : {};

          magicArg.per_page = 1;

          /* eslint-disable no-unexpected-multiline */
          return endpoint[call]([...pureArgs, magicArg]).then(struct => {
            if (struct.response.status === 404) {
              return 0;
            }

            let linkHeader = struct.response.headers.get('Link');
            let number;

            if (linkHeader !== null) {
              linkHeader = linkHeader.match(/page=(\d)+/g).pop();
              number = linkHeader.split('=').pop();
            } else {
              // TODO: copied from v3.count(), but doesn't make sense.
              // If we're passing per_page=1, we should be getting one response.
              number = struct.response.json().then(data => {
                return data.length;
              });
            }

            return number;
          });
        },
      });
    },
  });
};
