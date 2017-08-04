import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__) {
  Reactotron
    .configure()
    .useReactNative()
    .use(reactotronRedux())
    .connect();
}
