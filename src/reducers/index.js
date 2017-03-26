import { combineReducers } from 'redux';
import authReducer from './auth';
import authUserReducer from './authUser';
import userReducer from './user';
import userEventsReducer from './userEvents';
import repositoryReducer from './repository';

const rootReducer = combineReducers({
  auth: authReducer,
  authUser: authUserReducer,
  user: userReducer,
  userEvents: userEventsReducer,
  repository: repositoryReducer,
});

export default rootReducer;
