import { combineReducers } from 'redux';
import { authReducer } from './src/auth';
import { userReducer } from './src/user';
import { repositoryReducer } from './src/repository';
import { organizationReducer } from './src/organization';
import { issueReducer } from './src/issue';
import { searchReducer } from './src/search';
import { notificationsReducer } from './src/notifications';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  repository: repositoryReducer,
  organization: organizationReducer,
  issue: issueReducer,
  search: searchReducer,
  notifications: notificationsReducer,
});
