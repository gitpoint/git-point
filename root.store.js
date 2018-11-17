import { compose, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import md5 from 'md5';
import DeviceInfo from 'react-native-device-info';
import storage from 'redux-persist/lib/storage';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'config/reactotron';
import { rootReducer } from './root.reducer';

const encryptor = createEncryptor({
  secretKey: md5(DeviceInfo.getUniqueID()),
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
  whitelist: ['auth'],
};
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

if (__DEV__ && process.env.TRON_ENABLED) {
  store = Reactotron.createStore(
    persistReducer(persistConfig, rootReducer),
    compose(getMiddleware())
  );
} else {
  store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(getMiddleware())
  );
}

export const configureStore = store;
export const persistor = persistStore(configureStore);
