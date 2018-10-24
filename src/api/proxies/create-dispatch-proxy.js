// @flow
import * as Actions from 'api/actions';
import { normalize } from 'normalizr';
import 'proxy-polyfill';

import {
  getPaginationKey,
  displayError,
  actionNameForCall,
} from 'utils/api-helpers';
import { type CallType, Client } from '../client';

export const createDispatchProxy = (Provider: Class<Client>) => {
  const client: Client = new Provider();

  return new Proxy(client, {
    get: (c, namespace) => {
      // $FlowFixMe
      return new Proxy(client[namespace], {
        get: (endpoint, method) => (...args) => (dispatch, getState) => {
          if (!endpoint[method]) {
            return displayError(
              `Unknown API method. Did you implement client.${namespace}.${method}()?`
            );
          }

          // 1. Guess the action name from the called method
          const actionName = actionNameForCall(namespace, method);
          const action = Actions[actionName];

          if (!action) {
            return displayError(
              `Unknown action. Did you forget to define Actions.${actionName}?`
            );
          }

          // 2. Get all the call parameters from the client
          const callType: CallType = endpoint[method](...args);

          // 3. Get special instructions from the SpecialParameter
          const { loadMore = false, forceRefresh = false } = callType.params;

          // 4. If a pagination is involved in the call, get its key
          const paginationKey = callType.paginationArgs
            ? getPaginationKey(callType.paginationArgs)
            : null;

          // 5. Is this a paginated call ?
          if (callType.type === 'list') {
            // Were we instructed to reset the pagination? If so, dispatch it
            if (forceRefresh) {
              dispatch({
                id: paginationKey,
                type: action.RESET,
              });
            }

            // Retrieve the pagination and its state
            const pagination = getState().pagination[actionName];
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              pagination[paginationKey] || {};

            // Should we block the call?
            if (
              !forceRefresh &&
              (isFetching || // Already fetching, don't retrigger a call
              (pageCount > 0 && !loadMore) || // We already have the first page of data
                (loadMore && !nextPageUrl)) // We already fetched the last page
            ) {
              return Promise.resolve();
            }

            // Call should be performed.
            // Were we instructed to get the next page? If so override the endpoint
            if (loadMore) {
              callType.endpoint = nextPageUrl;
            }
          }

          // 6. Set the accessToken from state for the next call
          client.setAuthHeaders(getState().auth.accessToken);

          // 7. Call will now take place
          dispatch({
            id: paginationKey,
            type: action.PENDING,
          });

          // 8. Perform the actual call, then act accordingly in the store.
          return client
            .call(callType.endpoint, callType.params, callType.fetchParameters)
            .then(response => {
              // Something went wrong, bail to .catch()
              if (!response.ok) {
                return response.json().then(error => {
                  return Promise.reject(
                    [
                      `Call: client.${namespace}.${method}()`,
                      `Url: ${response.url}`,
                      `Error: [${response.status}] ${error.message}`,
                    ].join('\n')
                  );
                });
              }

              // 9. Did we just delete something?
              if (callType.type === 'delete') {
                if (action.pagination) {
                  // Was it a pagination item? If so, remove its id
                  // from its related pagination
                  dispatch({
                    pagination: {
                      name: action.pagination.actionName,
                      id: paginationKey,
                      entityId: callType.entityId,
                    },
                    id: paginationKey,
                    type: action.pagination.REMOVE,
                  });
                  // bail since we don't need to parse the JSON
                  dispatch({
                    id: paginationKey,
                    type: action.SUCCESS,
                  });
                } else if (callType.updateEntity) {
                  const { type, id, updater } = callType.updateEntity;

                  const entity = getState().entities[type][id];

                  dispatch({
                    type: action.SUCCESS,
                    entities: {
                      [type]: {
                        [id]: updater(entity),
                      },
                    },
                  });
                }

                return Promise.resolve();
              }

              // 9-1. Or did we change a status? no JSON
              if (callType.type === 'put') {
                if (callType.updateEntity) {
                  const { type, id, updater } = callType.updateEntity;

                  const entity = getState().entities[type][id];

                  dispatch({
                    type: action.SUCCESS,
                    entities: {
                      [type]: {
                        [id]: updater(entity),
                      },
                    },
                  });
                } else {
                  dispatch({
                    id: paginationKey,
                    type: action.SUCCESS,
                  });
                }

                return Promise.resolve();
              }

              // 10. Parse the JSON from the answer
              return response.json().then(json => {
                if (callType.type === 'query') {
                  if (json.errors && json.errors.length) {
                    return Promise.reject(json.errors[0].message);
                  }

                  callType.normalizrKey = 'data';
                }

                const normalizedJson = normalize(
                  callType.normalizrKey ? json[callType.normalizrKey] : json,
                  callType.schema
                );

                // 11. Did we get a next page of results for a pagination?
                // If so, prepare the structure that will be merged in the existing
                // pagination state.
                if (callType.type === 'list') {
                  normalizedJson.pagination = {
                    name: actionName,
                    key: paginationKey,
                    ids: normalizedJson.result,
                    nextPageUrl: client.getNextPageUrl(response),
                  };

                  delete normalizedJson.result;
                }

                // 12. All done, dispatch success.
                dispatch({
                  ...normalizedJson,
                  id: paginationKey,
                  type: action.SUCCESS,
                });

                return Promise.resolve();
              });
            })
            .catch(error => {
              dispatch({
                id: paginationKey,
                type: action.ERROR,
              });

              return displayError(error.toString());
            });
        },
      });
    },
  });
};
