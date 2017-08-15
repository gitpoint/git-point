/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__ && process.env.TRON_ENABLED) {
  Reactotron.configure().useReactNative().use(reactotronRedux()).connect();
}
