import { compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import { autoRehydrate } from "redux-persist";
import createLogger from "redux-logger";
import reduxThunk from "redux-thunk";

import { rootReducer } from "./root.reducer";

const getMiddleware = () => {
  const middlewares = [reduxThunk];

  if (__DEV__) {
    middlewares.push(createLogger());

    const composeEnhancers = composeWithDevTools({
      name: 'debugger',
      hostname: 'localhost',
      port: 5678,
      suppressConnectErrors: false,
    });

    return composeEnhancers(applyMiddleware(...middlewares));
  }

  return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
  const enhancers = [];
  enhancers.push(autoRehydrate());
  return enhancers;
};


export default function configureStore() {
  const store = createStore(rootReducer, compose(getMiddleware(), ...getEnhancers()));

  if (__DEV__) {
    window.store = store;
    window.reducer = rootReducer;
  }

  return store;
}
