
import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "remote-redux-devtools";
import { autoRehydrate } from 'redux-persist';
import { rootReducer } from "./root.reducer";
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

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


export const configureStore = createStore(
  rootReducer,
  compose(getMiddleware(), ...getEnhancers())
);
