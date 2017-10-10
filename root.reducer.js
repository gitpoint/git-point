import { combineReducers } from 'redux';
import { authReducer } from 'auth';
import { userReducer } from 'user';
import { repositoryReducer } from 'repository';
import { issueReducer } from 'issue';
import { searchReducer } from 'search';
import { notificationsReducer } from 'notifications';

import { entities } from './src/api/rest/reducers/entities';
import { pagination } from './src/api/rest/reducers/pagination';
import { errorMessage } from './src/api/rest/reducers/errorMessage';

export const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  auth: authReducer,
  user: userReducer,
  repository: repositoryReducer,
  issue: issueReducer,
  search: searchReducer,
  notifications: notificationsReducer,
});
