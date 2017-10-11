import { combineReducers } from 'redux';
import { authReducer } from 'auth';
import { userReducer } from 'user';
import { repositoryReducer } from 'repository';
import { issueReducer } from 'issue';
import { searchReducer } from 'search';
import { notificationsReducer } from 'notifications';

import { entities, pagination, errorMessage } from 'api/rest/reducers';

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
