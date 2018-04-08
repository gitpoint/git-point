import * as Actions from 'api/actions';
import { normalize } from 'normalizr';
import 'proxy-polyfill';

import {
  getActionKeyFromArgs,
  splitArgs,
  displayError,
  actionNameForCall,
} from 'utils/api-helpers';

export const createDispatchProxy = Provider => {
  const client = new Provider();

  return new Proxy(client, {
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
          const actionKey = getActionKeyFromArgs(pureArgs);

          let finalArgs = args;

          if (paginator) {
            const { loadMore = false, forceRefresh = false } = extraArg;
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              paginator[actionKey] || {};

            if (
              !forceRefresh &&
              (isFetching || // Already fetching, don't retrigger a call
              (pageCount > 0 && !loadMore) || // We already have the first page of data
                (loadMore && !nextPageUrl)) // We already fetched the last page
            ) {
              return Promise.resolve();
            }

            if (loadMore) {
              // next page explicitely requested
              extraArg.url = nextPageUrl;
            } else if (forceRefresh) {
              // reset the pagination
              dispatch({
                id: actionKey,
                type: action.RESET,
              });
            }

            finalArgs = [...pureArgs, extraArg];
          }

          // Get accessToken from state
          client.setAuthHeaders(getState().auth.accessToken);

          dispatch({
            id: actionKey,
            type: action.PENDING,
          });

          return endpoint[method](...finalArgs)
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
              // TODO: We need a better test here
              if (struct.response.status === 205) {
                dispatch({
                  id: actionKey,
                  type: action.SUCCESS,
                });

                return Promise.resolve();
              }

              return struct.response.json().then(json => {
                // Treat the JSON & normalize it
                const normalizedJson = normalize(
                  struct.normalizrKey ? json[struct.normalizrKey] : json,
                  struct.schema
                );

                if (paginator) {
                  normalizedJson.pagination = {
                    name: actionName,
                    key: actionKey,
                    ids: normalizedJson.result,
                    nextPageUrl: struct.nextPageUrl,
                  };

                  delete normalizedJson.result;
                }

                // Success, let's dispatch it
                dispatch({
                  ...normalizedJson,
                  id: actionKey,
                  type: action.SUCCESS,
                });

                return Promise.resolve();
              });
            })
            .catch(error => {
              displayError(error.toString());

              dispatch({
                id: actionKey,
                type: action.ERROR,
              });

              return error;
            });
        },
      });
    },
  });
};
