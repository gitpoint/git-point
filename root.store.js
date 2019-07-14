import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'config/reactotron';
import rootReducer from './root.reducer';

const getMiddleware = () => {
  const middlewares = [reduxThunk];

  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger());
    }
  }

  return applyMiddleware(...middlewares);
};

let store;

if (__DEV__) {
  if (process.env.TRON_ENABLED) {
    store = Reactotron.createStore(
      rootReducer,
      compose(getMiddleware())
    );
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(getMiddleware())
    );
  }
} else {
  store = createStore(rootReducer, compose(getMiddleware()));
}

export const configureStore = store;
export const persistor = persistStore(configureStore);
