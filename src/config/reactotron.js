/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__ && process.env.TRON_ENABLED) {
  Reactotron.configure({ host: '192.168.1.50' })
    .useReactNative()
    .use(reactotronRedux())
    .connect();
}
