import * as Actions from 'api/rest/actions';
import { normalize } from 'normalizr';
import { Alert } from 'react-native';

const displayError = error => {
  Alert.alert('API Error', error);
};

export const withReducers = Provider => {
  const client = new Provider();

  return new Proxy(withReducers, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, call) => (...args) => (dispatch, getState) => {
          // Used as a key for state.pagination
          const actionName = `${namespace}_${call}`
            .replace(/([A-Z])/g, '_$1')
            .toUpperCase();

          const action = Actions[actionName];

          if (typeof action === 'undefined') {
            return displayError(
              `Unknown action. Did you forget to define Actions.${actionName}?`
            );
          }

          // Identify if we have our magical last argument
          const declaredArgsNumber = endpoint[call].length;
          const isMagicArgAvailable = args.length === declaredArgsNumber;

          const pureArgs = isMagicArgAvailable
            ? args.slice(0, args.length - 1)
            : args;
          const magicArg = isMagicArgAvailable ? args[args.length - 1] : {};

          const paginator = getState().pagination[actionName];

          // pagination or entity ? <-

          // Get accessToken from state
          client.setAccessToken(getState().auth.accessToken);

          let finalArgs = args;

          if (typeof paginator !== 'undefined') {
            const { loadMore = false } = magicArg;
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              paginator[pureArgs.join('-')] || {};

            if (
              isFetching ||
              (pageCount > 0 && !loadMore) ||
              (loadMore && !nextPageUrl)
            ) {
              return Promise.resolve(); // Already fetching, don't retrigger a call
            }

            if (loadMore) {
              // next page explicitely requested
              magicArg.url = nextPageUrl;
            }

            finalArgs = [...pureArgs, magicArg];
          }

          dispatch({
            id: args[0],
            type: Actions[actionName].PENDING,
          });

          /* eslint-disable no-unexpected-multiline */
          return endpoint
            [call](...finalArgs)
            .then(struct => {
              if (!struct.response.ok) {
                return struct.response.json().then(error => {
                  return Promise.reject(
                    `Call: client.${namespace}.call()\nUrl: ${struct.response
                      .url}\nError: [${struct.response
                      .status}] ${error.message}`
                  );
                });
              }

              return struct.response.json().then(json => {
                // Treat the JSON & normalize it
                const normalized = normalize(
                  struct.normalizrKey ? json[struct.normalizrKey] : json,
                  struct.schema
                );

                // TODO: only for paginated
                if (typeof paginator !== 'undefined') {
                  normalized.pagination = {
                    name: actionName,
                    key: args[0],
                    ids: normalized.result,
                    nextPageUrl: struct.nextPageUrl,
                  };
                  delete normalized.result;
                }

                // Success, let's dispatch it
                dispatch({
                  ...normalized,
                  id: args[0],
                  type: Actions[actionName].SUCCESS,
                });

                return Promise.resolve();
              });
            })
            .catch(error => {
              displayError(error.toString());

              dispatch({
                id: args[0],
                type: Actions[actionName].ERROR,
              });

              return error;
            });
        },
      });
    },
  });
};
