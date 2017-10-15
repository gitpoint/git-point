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
        get: (endpoint, call) => (...args) => (dispatch, getState) => {
          if (!endpoint[call]) {
            return displayError(
              `Unknown API call. Did you implement client.${namespace}.${call}()?`
            );
          }

          // Used as a key for state.pagination
          const actionName = actionNameForCall(namespace, call, 'COUNT_');

          const { pureArgs, magicArg } = splitArgs(endpoint[call], args);

          magicArg.per_page = 1;

          const finalArgs = [...pureArgs, magicArg];
          const actionKey = pureArgs.join('-');

          dispatch({
            key: actionKey,
            type: Actions[actionName].PENDING,
          });

          client.setAccessToken(getState().auth.accessToken);

          /* eslint-disable no-unexpected-multiline */
          return endpoint
            [call](...finalArgs)
            .then(struct => {
              if (struct.response.status === 404) {
                return 0;
              }

              let linkHeader = struct.response.headers.get('Link');
              let number;

              if (linkHeader !== null) {
                linkHeader = linkHeader.match(/page=(\d)+/g).pop();
                number = linkHeader.split('=').pop();
                dispatch({
                  counters: number,
                  key: actionKey,
                  name: actionName,
                  type: Actions[actionName].SUCCESS,
                });
              } else {
                number = struct.response.json().then(data => {
                  dispatch({
                    counters: data.length,
                    key: actionKey,
                    name: actionName,
                    type: Actions[actionName].SUCCESS,
                  });
                });
              }

              return number;
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
