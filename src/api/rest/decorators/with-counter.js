import * as Actions from 'api/rest/actions';

import {
  splitArgs,
  displayError,
  actionNameForCall,
} from 'utils/decorator-helpers';

export const withCounter = Provider => {
  const client = new Provider();

  return new Proxy(withCounter, {
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
          return endpoint
            [method](...finalArgs)
            .then(struct => {
              if (struct.response.status === 404) {
                return 0;
              }

              let linkHeader = struct.response.headers.get('Link');

              if (linkHeader !== null) {
                linkHeader = linkHeader.match(/page=(\d)+/g).pop();
                dispatch({
                  counters: linkHeader.split('=').pop(),
                  key: actionKey,
                  name: actionName,
                  type: Actions[actionName].SUCCESS,
                });
              } else {
                struct.response.json().then(data => {
                  dispatch({
                    counters: data.length,
                    key: actionKey,
                    name: actionName,
                    type: Actions[actionName].SUCCESS,
                  });
                });
              }

              return Promise.resolve();
            })
            .catch(error => {
              displayError(error.toString());

              dispatch({
                key: actionKey,
                type: Actions[actionName].ERROR,
              });

              return error;
            });
        },
      });
    },
  });
};
