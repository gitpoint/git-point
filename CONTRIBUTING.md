# Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.
Even if you have little to no experience with React Native, we'll be more than happy to help :)

## Gitter

Please don't hesitate to join our [gitter](https://gitter.im/git-point)! Technical points of discussion, general questions and suggestions or anything at all - we would love to chat about it.

## Issues

### Creating issues

If you notice any bugs in the app, see some code that can be improved, or have features you would like to be added, please create an issue!

If you want to open a PR that fixes a bug or adds a feature, then we can't thank you enough! It is definitely appreciated if an issue has been created before-hand so it can be discussed first.

### Working on issues

Please feel free to take on any issue that's currently open. You could look at
[issues labeled "high priority"](https://github.com/gitpoint/git-point/issues?q=is%3Aopen+is%3Aissue+label%3A%22high+priority%22),
but feel free to resolve any issue that you would enjoy working on even if it happens to be a low priority.

## Setup

1. Fork the repo
2. Clone your fork
3. Make a branch for your feature or bug fix
4. Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for learning how to get started with building a project with native iOS code (a Mac is required)
5. The `CLIENT_ID` and `CLIENT_SECRET` in `api/index.js` are for development purposes and do not represent the actual application keys. Feel free to use them or use a new set of keys by creating an [OAuth application](https://github.com/settings/applications/new) of your own.
    - Set the "Authorization callback URL" to `gitpoint://welcome`.
6. `yarn` to install dependencies
7. `yarn run link` to link react-native dependencies
8. Use one of the following commands depending on the target platform:
    - `yarn start:ios` to start the packager and run the app in the iOS simulator (`yarn start:ios:logger` will boot the application with [redux-logger](https://github.com/evgenyrodionov/redux-logger))
    - `yarn start:android` to start the packager and run the app in the the Android device/emulator (`yarn start:android:logger` will boot the application with [redux-logger](https://github.com/evgenyrodionov/redux-logger))
9. Work your magic! Run the app on an [actual device](http://facebook.github.io/react-native/releases/0.46/docs/running-on-device.html#running-on-device) as well to test your feature/fix.
10. Add yourself to the [contributor's list](https://github.com/gitpoint/git-point#contributors) by doing `yarn contributors:add`
11. Commit your changes with a message following the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
    - [Commitizen](https://github.com/commitizen/cz-cli) works with this repo. You can install the CLI globally (`yarn global add commitizen`) where you can then create formatted commit messages with `git cz` by filling out a few required fields
12. Push your branch to your fork
13. Create a pull request from your branch on your fork to `master` on this repo
14. Have your branch get merged in! :star2:

If you experience a problem at any point, please don't hesitate to file an issue or send me a message!

## Translations

Translation contributions are always welcome! If you happen to speak/read any language fluently and feel comfortable translating all the strings, please don't hesitate to open an issue to suggest including it and/or submitting a PR to include it. Here's how to add a new language:

1. In the `locales` directory we just need to add a new file for a new language. We can just copy the `en.js` file (to _es.js_ for Spanish for example) and swap out all the English text for that specific language.
2. We'll need to then export that newly added file as well [here](https://github.com/gitpoint/git-point/blob/master/src/locale/languages/index.js).
3. Next, we'll need to add the new lang object [here](https://github.com/gitpoint/git-point/blob/023c7f4ae52694f75a1bc9748b072f6f66687b0a/src/locale/index.js#L7).
4. And lastly, in order for the language to be displayed in the options screen, we'll need to add a [two-letter code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) in lowercase (for example: _es_ for Spanish) and the native language name (for example: _España_ for Spanish) to the [language-settings.js](https://github.com/gitpoint/git-point/blob/master/src/auth/screens/language-settings.js) file. Please make sure the two-letter code matches the code used for the `moment` library to allow for date/time compatibility (you can view the list [here](https://github.com/moment/moment/tree/develop/locale)).
5. Test out selecting your new translation and if it all looks good, submit that PR in! :smile:

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


## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/git-point).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.


## Credits


### Contributors

Checkout all the awesome people who have contributed [here](./CONTRIBUTORS.md).

### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/git-point#backer)]

<a href="https://opencollective.com/git-point#backers" target="_blank"><img src="https://opencollective.com/git-point/backers.svg?width=890"></a>


### Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/git-point#sponsor))

<a href="https://opencollective.com/git-point/sponsor/0/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/1/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/2/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/3/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/4/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/5/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/6/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/7/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/8/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/git-point/sponsor/9/website" target="_blank"><img src="https://opencollective.com/git-point/sponsor/9/avatar.svg"></a>
