import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import md5 from 'md5';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { authReducer } from 'auth';
import { userReducer } from 'user';
import { repositoryReducer } from 'repository';
import { organizationReducer } from 'organization';
import { issueReducer } from 'issue';
import { notificationsReducer } from 'notifications';
import { entities, pagination } from 'api/reducers';

const encryptor = createEncryptor({
  secretKey: md5(DeviceInfo.getUniqueID()),
});
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  repository: repositoryReducer,
  organization: organizationReducer,
  issue: issueReducer,
  notifications: notificationsReducer,
  entities,
  pagination,
});

export default persistReducer(rootPersistConfig, rootReducer);
