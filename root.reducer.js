import { combineReducers } from 'redux';
import { authReducer } from 'auth';
import { userReducer } from 'user';
import { repositoryReducer } from 'repository';
import { organizationReducer } from 'organization';
import { issueReducer } from 'issue';
import { notificationsReducer } from 'notifications';
import { entities, pagination } from 'api/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  repository: repositoryReducer,
  organization: organizationReducer,
  issue: issueReducer,
  notifications: notificationsReducer,
  entities,
  pagination,
});
