import * as Actions from 'api/rest/actions';

import {
  splitArgs,
  displayError,
  actionNameForCall,
} from 'utils/decorator-helpers';

// TODO: Merge this into createDispatchProxy
export const createCountProxy = Provider => {
  const client = new Provider();

  return new Proxy(createCountProxy, {
    get: (c, namespace) => {
      return new Proxy(client[namespace], {
        get: (endpoint, method) => (...args) => (dispatch, getState) => {
          if (!endpoint[method]) {
            return displayError(
              `Unknown API method. Did you implement client.${namespace}.${method}()?`
            );
          }

          // Used as a key for state.pagination
          const actionName = actionNameForCall(namespace, method, 'COUNT_');

          const { pureArgs, extraArg } = splitArgs(endpoint[method], args);

          extraArg.per_page = 1;

          const finalArgs = [...pureArgs, extraArg];
          const actionKey = pureArgs.join('-');

          dispatch({
            key: actionKey,
            type: Actions[actionName].PENDING,
          });

          client.setAuthHeaders(getState().auth.accessToken);

          /* eslint-disable no-unexpected-multiline */
          return endpoint[method](...finalArgs).then(struct => {
            client
              .getCount(struct.response)
              .then(count => {
                dispatch({
                  counters: count,
                  key: actionKey,
                  name: actionName,
                  type: Actions[actionName].SUCCESS,
                });
              })
              .catch(error => {
                displayError(error.toString());
                dispatch({
                  key: actionKey,
                  type: Actions[actionName].ERROR,
                });

                return error;
              });
          });
        },
      });
    },
  });
};
