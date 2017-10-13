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

          if (!action) {
            return displayError(
              `Unknown action. Did you forget to define Actions.${actionName}?`
            );
          }

          if (!endpoint[call]) {
            return displayError(
              `Unknown API call. Did you implement client.${namespace}.${call}()?`
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
          const actionKey = pureArgs.join('-');

          // pagination or entity ? <-

          // Get accessToken from state
          client.setAccessToken(getState().auth.accessToken);

          let finalArgs = args;

          if (paginator) {
            const { loadMore = false } = magicArg;
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              paginator[actionKey] || {};

            if (
              isFetching || // Already fetching, don't retrigger a call
              (pageCount > 0 && !loadMore) || // We already have the first page of data
              (loadMore && !nextPageUrl) // We've already fetched the last page
            ) {
              return Promise.resolve();
            }

            if (loadMore) {
              // next page explicitely requested
              magicArg.url = nextPageUrl;
            }

            finalArgs = [...pureArgs, magicArg];
          }

          dispatch({
            id: actionKey,
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

                if (paginator) {
                  normalized.pagination = {
                    name: actionName,
                    key: actionKey,
                    ids: normalized.result,
                    nextPageUrl: struct.nextPageUrl,
                  };
                  delete normalized.result;
                }

                // Success, let's dispatch it
                dispatch({
                  ...normalized,
                  id: actionKey,
                  type: Actions[actionName].SUCCESS,
                });

                return Promise.resolve();
              });
            })
            .catch(error => {
              displayError(error.toString());

              dispatch({
                id: actionKey,
                type: Actions[actionName].ERROR,
              });

              return error;
            });
        },
      });
    },
  });
};
