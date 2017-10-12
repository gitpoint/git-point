import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'config/reactotron';
import { rootReducer } from './root.reducer';

const getMiddleware = () => {
  const middlewares = [reduxThunk];

  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger());
    }
  }

  return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
  const enhancers = [];

  enhancers.push(autoRehydrate());

  return enhancers;
};

let store;

if (__DEV__ && process.env.TRON_ENABLED) {
  store = Reactotron.createStore(
    rootReducer,
    compose(getMiddleware(), ...getEnhancers())
  );
} else {
  store = createStore(
    rootReducer,
    composeWithDevTools(getMiddleware(), ...getEnhancers())
  );
}

export const configureStore = store;
