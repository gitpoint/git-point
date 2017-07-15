import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import { rootReducer } from './root.reducer';

const getMiddleware = () => {
  const middlewares = [reduxThunk];

  if (__DEV__) {
    middlewares.push(createLogger());
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
