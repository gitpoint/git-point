import { combineReducers } from 'redux';
import { authReducer } from 'auth';
import { userReducer } from 'user';
import { repositoryReducer } from 'repository';
import { organizationReducer } from 'organization';
import { issueReducer } from 'issue';
import { searchReducer } from 'search';
import { notificationsReducer } from 'notifications';
import { entities, errorMessage, pagination } from 'reducers';

export const rootReducer = combineReducers({
  entities,
  errorMessage,
  pagination,
  auth: authReducer,
  user: userReducer,
  repository: repositoryReducer,
  organization: organizationReducer,
  issue: issueReducer,
  search: searchReducer,
  notifications: notificationsReducer,
});
