/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__ && process.env.TRON_ENABLED) {
  /* eslint-disable no-console */
  const hijackConsole = () => {
    const oldConsoleLog = console.log;

    console.log = (...args) => {
      oldConsoleLog(...args);

      Reactotron.display({
        name: 'CONSOLE.LOG',
        important: true,
        value: args,
        preview:
          args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
      });
    };
  };

  hijackConsole();

  Reactotron.configure()
    .useReactNative()
    .use(reactotronRedux())
    .connect();
}
