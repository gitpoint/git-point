// @flow
import * as Actions from 'api/actions';
import { normalize } from 'normalizr';
import 'proxy-polyfill';

import {
  getPaginationKey,
  displayError,
  actionNameForCall,
} from 'utils/api-helpers';
import { type CallParameters, Client } from '../client';

export const createDispatchProxy = (Provider: Client) => {
  const client: Client = new Provider();

  return new Proxy(client, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, method) => (...args) => (dispatch, getState) => {
          if (!endpoint[method]) {
            return displayError(
              `Unknown API method. Did you implement client.${namespace}.${method}()?`
            );
          }

          const actionName = actionNameForCall(namespace, method);
          const action = Actions[actionName];

          if (!action) {
            return displayError(
              `Unknown action. Did you forget to define Actions.${actionName}?`
            );
          }

          // 1. Analyze the call
          const callType: CallParameters = endpoint[method](...args);

          const { loadMore = false, forceRefresh = false } = callType.params;

          // 2. If a pagination is involved, get it
          const pagination = getState().pagination[actionName];
          const paginationKey = callType.paginationArgs
            ? getPaginationKey(callType.paginationArgs)
            : null;

          // 3. Reset requested for a pagination? Dispatch it.
          if (callType.type === 'paginated' && forceRefresh) {
            dispatch({
              id: paginationKey,
              type: action.RESET,
            });
          }

          // 4. Give the cache a chance, or prepare for next page
          if (pagination) {
            const { pageCount = 0, isFetching = false, nextPageUrl } =
              pagination[paginationKey] || {};

            if (
              !forceRefresh &&
              (isFetching || // Already fetching, don't retrigger a call
              (pageCount > 0 && !loadMore) || // We already have the first page of data
                (loadMore && !nextPageUrl)) // We already fetched the last page
            ) {
              return Promise.resolve();
            }

            if (loadMore) {
              // next page explicitely requested, override the endpoint
              callType.endpoint = nextPageUrl;
            }
          }

          // Get accessToken from state
          client.setAuthHeaders(getState().auth.accessToken);

          dispatch({
            id: paginationKey,
            type: action.PENDING,
          });

          return client
            .call(callType.endpoint, callType.params, callType.fetchParameters)
            .then(response => {
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

              if (callType.type === 'delete') {
                dispatch({
                  pagination: {
                    name: action.pagination.actionName,
                    id: paginationKey,
                    entityId: callType.entityId,
                  },
                  id: paginationKey,
                  type: action.pagination.REMOVE,
                });

                dispatch({
                  id: paginationKey,
                  type: action.SUCCESS,
                });

                return Promise.resolve();
              }

              return response.json().then(json => {
                // Treat the JSON & normalize it
                const normalizedJson = normalize(
                  callType.normalizrKey ? json[callType.normalizrKey] : json,
                  callType.schema
                );

                // Successful POST, append the new entity in the pagination if any
                if (callType.type === 'create' && action.pagination) {
                  dispatch({
                    ...normalizedJson,
                    pagination: {
                      name: action.pagination.actionName,
                      key: paginationKey,
                      ids: [normalizedJson.result],
                    },
                    id: paginationKey,
                    type: action.pagination.APPEND,
                  });
                }

                if (pagination) {
                  normalizedJson.pagination = {
                    name: actionName,
                    key: paginationKey,
                    ids: normalizedJson.result,
                    nextPageUrl: client.getNextPageUrl(response),
                  };

                  delete normalizedJson.result;
                }

                // Success, let's dispatch it
                dispatch({
                  ...normalizedJson,
                  id: paginationKey,
                  type: action.SUCCESS,
                });

                return Promise.resolve();
              });
            })
            .catch(error => {
              displayError(error.toString());

              dispatch({
                id: paginationKey,
                type: action.ERROR,
              });

              return error;
            });
        },
      });
    },
  });
};
