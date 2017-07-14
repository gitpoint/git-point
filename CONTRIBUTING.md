# Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.
Even if you have little to no experience with React Native, I'll be more than happy to help. :)

## Issues

### Creating issues

If you notice any bugs in the app, see some code that can be improved or features you would like added, please create an issue for it!

If you happen to want to put up a PR to fix a bug or add a feature, then we can't thank you enough!. It is definitely appreciated if an issue has been created before-hand however so that it's been discussed first.

### Working on issues

Please feel free to take on _any_ issue that's currently in the issue list. To streamline priorities, we've created a [project]() to define the priority order of different issues so it would be preferred if you can tackle a high priority one. However, please feel free to take any issue whatsoever that you would enjoy working on even if it happens to be a low priority.

## Setup

1. Fork the repo
2. Clone your fork
3. Make a branch for your feature or bug fix
4. Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for getting started building a project with native iOS code (a Mac is required)
5. The `CLIENT_ID` and `CLIENT_SECRET` in `api/index.js` are for development purposes and do not represent the actual application keys. Feel free to use them or use a new set of keys by creating an [OAuth application](https://github.com/settings/applications/new) of your own
6. `yarn` to install dependencies
7. `yarn run link` to link react-native dependencies
8. `yarn start` in one terminal tab to start the packager
9. `yarn run ios` in another tab to run the app in the iOS simulator
10. Work your magic! Run the app on an [actual device](http://facebook.github.io/react-native/releases/0.46/docs/running-on-device.html#running-on-device) as well to test your feature/fix.
11. Add yourself to the [contributor's list](https://github.com/housseindjirdeh/git-point#contributors) by doing `yarn contributors:add`
12. Commit your changes and reference the issue you're addressing (for example: `git commit -am 'Commit message. Closes #5'`)
13. Push your branch to your fork
14. Create a pull request from your branch on your fork to `master` on this repo
15. Have your branch get merged in! :star2:

If you experience a problem at any point, please don't hesitate to file an issue or send me a message!

## Troubleshooting

If you happen to see an error like below when you try to run the application:

```
error: bundling: UnableToResolveError: Unable to resolve module `config` from `/Users/frankdilo/projects/git-point/App.js`: Module does not exist in the module map or in these directories:
  /Users/{user}/projects/git-point/node_modules
```

1. Please try running `yarn start -- --reset-cache` and then `yarn run ios` in a separate terminal window
2. If that doesn't solve it, try the following commands:
    - Clear watchman watches: `watchman watch-del-all`.
    - Delete the `node_modules` folder: `rm -rf node_modules && yarn`.
    - Reset packager cache: `rm -fr $TMPDIR/react-*` or `yarn start -- --reset-cache`.
3. If that sill doesn't solve it, please open an issue so we can figure out why it's not working for you
