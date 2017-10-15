import * as Actions from 'api/rest/actions';
import { normalize } from 'normalizr';

import {
  splitArgs,
  displayError,
  actionNameForCall,
} from 'utils/decorator-helpers';

export const withReducers = Provider => {
  const client = new Provider();

  return new Proxy(withReducers, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, method) => (...args) => (dispatch, getState) => {
          if (!endpoint[method]) {
            return displayError(
              `Unknown API method. Did you implement client.${namespace}.${method}()?`
            );
          }

          // Used as a key for state.pagination
          const actionName = actionNameForCall(namespace, method);
          const action = Actions[actionName];

          if (!action) {
            return displayError(
              `Unknown action. Did you forget to define Actions.${actionName}?`
            );
          }

          const { pureArgs, extraArg } = splitArgs(endpoint[method], args);
          const paginator = getState().pagination[actionName];
          const actionKey = pureArgs.join('-');

          let finalArgs = args;

          if (paginator) {
            const { loadMore = false, forceRefresh = false } = extraArg;
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              paginator[actionKey] || {};

            if (
              !forceRefresh &&
              (isFetching || // Already fetching, don't retrigger a call
              (pageCount > 0 && !loadMore) || // We already have the first page of data
                (loadMore && !nextPageUrl)) // We've already fetched the last page
            ) {
              return Promise.resolve();
            }

            if (loadMore) {
              // next page explicitely requested
              extraArg.url = nextPageUrl;
            } else if (forceRefresh) {
              // TODO: reset pagination state properly via an action
              // console.log('TODO: reset pagination');
            }

            finalArgs = [...pureArgs, extraArg];
          }

          // Get accessToken from state
          client.setAuthHeaders(getState().auth.accessToken);

          dispatch({
            id: actionKey,
            type: Actions[actionName].PENDING,
          });

          /* eslint-disable no-unexpected-multiline */
          return endpoint
            [method](...finalArgs)
            .then(struct => {
              if (!struct.response.ok) {
                return struct.response.json().then(error => {
                  return Promise.reject(
                    [
                      `Call: client.${namespace}.${method}()`,
                      `Url: ${struct.response.url}`,
                      `Error: [${struct.response.status}] ${error.message}`,
                    ].join('\n')
                  );
                });
              }

              // Successful PUT or PATCH request, there will be no JSON, simply dispatch success
              // TODO: withReducers() is not an accurate name anymore here.
              if (struct.response.status === 205) {
                dispatch({
                  id: actionKey,
                  type: Actions[actionName].SUCCESS,
                });

                return Promise.resolve();
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
