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

Please feel free to take on any issue that's currently open. To streamline priorities, we've created a [project](https://github.com/gitpoint/git-point/projects/1) to define the priority order of the different issues. It would be preferred if you can tackle a high priority issue, but if you can’t, feel free to resolve any issue that you would enjoy working on even if it happens to be a low priority.

## Setup

1. Fork the repo
2. Clone your fork
3. Make a branch for your feature or bug fix
4. Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for learning how to get started with building a project with native iOS code (a Mac is required)
5. The `CLIENT_ID` and `CLIENT_SECRET` in `api/index.js` are for development purposes and do not represent the actual application keys. Feel free to use them or use a new set of keys by creating an [OAuth application](https://github.com/settings/applications/new) of your own
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

Translation contributions are always welcome! Please don't hesitate to open an issue to suggest including a new language and/or submitting a PR to include it. Here's how to add a new language:

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

Thank you to all the people who have already contributed to git-point!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/12476932?v=3" width="100px;"/><br /><sub>Houssein Djirdeh</sub>](https://houssein.me)<br />[💬](#question-housseindjirdeh "Answering Questions") [💻](https://github.com/gitpoint/git-point/commits?author=housseindjirdeh "Code") [🎨](#design-housseindjirdeh "Design") [📖](https://github.com/gitpoint/git-point/commits?author=housseindjirdeh "Documentation") [👀](#review-housseindjirdeh "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/16705071?v=3" width="100px;"/><br /><sub>gejose</sub>](https://github.com/gejose)<br />[💻](https://github.com/gitpoint/git-point/commits?author=gejose "Code") | [<img src="https://avatars3.githubusercontent.com/u/14151327?v=3" width="100px;"/><br /><sub>rmevans9</sub>](https://github.com/rmevans9)<br />[💻](https://github.com/gitpoint/git-point/commits?author=rmevans9 "Code") | [<img src="https://avatars1.githubusercontent.com/u/4408379?v=3" width="100px;"/><br /><sub>Alexey Pyltsyn</sub>](http://lex111.ru)<br />[💻](https://github.com/gitpoint/git-point/commits?author=lex111 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Alex111 "Bug reports") [🌍](#translation-lex111 "Translation") | [<img src="https://avatars2.githubusercontent.com/u/10660468?v=3" width="100px;"/><br /><sub>Jason Etcovitch</sub>](https://jasonet.co)<br />[💻](https://github.com/gitpoint/git-point/commits?author=JasonEtco "Code") | [<img src="https://avatars1.githubusercontent.com/u/1166143?v=3" width="100px;"/><br /><sub>Hosmel Quintana</sub>](http://hosmelq.com)<br />[💻](https://github.com/gitpoint/git-point/commits?author=hosmelq "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/464978?v=3" width="100px;"/><br /><sub>Alejandro Ñáñez Ortiz</sub>](http://co.linkedin.com/in/alejandronanez/)<br />[💻](https://github.com/gitpoint/git-point/commits?author=alejandronanez "Code") [👀](#review-alejandronanez "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/3055294?v=3" width="100px;"/><br /><sub>Patrick Wang</sub>](https://patw.me)<br />[💻](https://github.com/gitpoint/git-point/commits?author=patw0929 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Apatw0929 "Bug reports") | [<img src="https://avatars5.githubusercontent.com/u/627794?v=4" width="100px;"/><br /><sub>Mike Kavouras</sub>](https://github.com/mikekavouras)<br />[💻](https://github.com/gitpoint/git-point/commits?author=mikekavouras "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Amikekavouras "Bug reports") | [<img src="https://avatars4.githubusercontent.com/u/4848554?v=4" width="100px;"/><br /><sub>Peter Lazar</sub>](https://github.com/peterlazar1993)<br />[💻](https://github.com/gitpoint/git-point/commits?author=peterlazar1993 "Code") | [<img src="https://avatars6.githubusercontent.com/u/5106887?v=4" width="100px;"/><br /><sub>June Domingo</sub>](https://github.com/junedomingo)<br />[💻](https://github.com/gitpoint/git-point/commits?author=junedomingo "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Ajunedomingo "Bug reports") | [<img src="https://avatars7.githubusercontent.com/u/9287184?v=4" width="100px;"/><br /><sub>Antoine Boisadam</sub>](https://github.com/Antoine38660)<br />[💻](https://github.com/gitpoint/git-point/commits?author=Antoine38660 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3AAntoine38660 "Bug reports") |
| [<img src="https://avatars6.githubusercontent.com/u/13142418?v=4" width="100px;"/><br /><sub>Wang Shidong</sub>](https://wsdjeg.github.io)<br />[📖](https://github.com/gitpoint/git-point/commits?author=wsdjeg "Documentation") | [<img src="https://avatars4.githubusercontent.com/u/2190589?v=4" width="100px;"/><br /><sub>Swapnil Joshi</sub>](http://swapnilmj.users.sourceforge.net/)<br />[📖](https://github.com/gitpoint/git-point/commits?author=swapnilmj "Documentation") | [<img src="https://avatars5.githubusercontent.com/u/408959?v=4" width="100px;"/><br /><sub>Rolf Koenders</sub>](https://github.com/RolfKoenders)<br />[💻](https://github.com/gitpoint/git-point/commits?author=RolfKoenders "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3ARolfKoenders "Bug reports") [🌍](#translation-RolfKoenders "Translation") | [<img src="https://avatars1.githubusercontent.com/u/10191084?v=4" width="100px;"/><br /><sub>Andrew Dassonville</sub>](https://andrewda.me)<br />[💻](https://github.com/gitpoint/git-point/commits?author=andrewda "Code") [💬](#question-andrewda "Answering Questions") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Aandrewda "Bug reports") [👀](#review-andrewda "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/2076088?v=4" width="100px;"/><br /><sub>Anton</sub>](https://medium.com/@antondomashnev)<br />[💻](https://github.com/gitpoint/git-point/commits?author=Antondomashnev "Code") | [<img src="https://avatars0.githubusercontent.com/u/14795799?v=4" width="100px;"/><br /><sub>Xuezheng Ma</sub>](https://github.com/xuezhma)<br />[💻](https://github.com/gitpoint/git-point/commits?author=xuezhma "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/8962228?v=4" width="100px;"/><br /><sub>Sammy Israwi</sub>](https://github.com/SammyIsra)<br />[💻](https://github.com/gitpoint/git-point/commits?author=SammyIsra "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3ASammyIsra "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/8122587?v=4" width="100px;"/><br /><sub>Chao Ren</sub>](https://github.com/RogerAbyss)<br />[🐛](https://github.com/gitpoint/git-point/issues?q=author%3ARogerAbyss "Bug reports") [💻](https://github.com/gitpoint/git-point/commits?author=RogerAbyss "Code") | [<img src="https://avatars0.githubusercontent.com/u/11228182?v=4" width="100px;"/><br /><sub>Harish Toshniwal</sub>](https://introwit.in)<br />[📖](https://github.com/gitpoint/git-point/commits?author=introwit "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/774577?v=4" width="100px;"/><br /><sub>Ferran Negre</sub>](http://github.com/ferrannp)<br />[💻](https://github.com/gitpoint/git-point/commits?author=ferrannp "Code") | [<img src="https://avatars2.githubusercontent.com/u/29695071?v=4" width="100px;"/><br /><sub>Ganesh Cauda Salim</sub>](https://github.com/caudaganesh)<br />[💻](https://github.com/gitpoint/git-point/commits?author=caudaganesh "Code") | [<img src="https://avatars0.githubusercontent.com/u/4316908?v=4" width="100px;"/><br /><sub>Wanda Ichsanul Isra</sub>](https://www.linkedin.com/in/wlisrausr)<br />[💻](https://github.com/gitpoint/git-point/commits?author=wlisrausr "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/25394678?v=4" width="100px;"/><br /><sub>Cameron Samuels</sub>](http://cameronsamuels.com)<br />[📖](https://github.com/gitpoint/git-point/commits?author=CameronSamuels "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/304450?v=4" width="100px;"/><br /><sub>Mehdi Achour</sub>](https://machour.idk.tn/)<br />[🐛](https://github.com/gitpoint/git-point/issues?q=author%3Amachour "Bug reports") [💻](https://github.com/gitpoint/git-point/commits?author=machour "Code") [🌍](#translation-machour "Translation") | [<img src="https://avatars2.githubusercontent.com/u/5353857?v=4" width="100px;"/><br /><sub>Reyhan Sofian</sub>](https://www.reyhan.tech/)<br />[💻](https://github.com/gitpoint/git-point/commits?author=reyhansofian "Code") | [<img src="https://avatars1.githubusercontent.com/u/11606323?v=4" width="100px;"/><br /><sub>Adrian Hartanto</sub>](https://github.com/adrianhartanto0)<br />[💻](https://github.com/gitpoint/git-point/commits?author=adrianhartanto0 "Code") | [<img src="https://avatars2.githubusercontent.com/u/3624869?v=4" width="100px;"/><br /><sub>Blake Y. Gong</sub>](https://github.com/blakegong)<br />[💻](https://github.com/gitpoint/git-point/commits?author=blakegong "Code") | [<img src="https://avatars3.githubusercontent.com/u/1736154?v=4" width="100px;"/><br /><sub>Xianming Zhong</sub>](https://github.com/chinesedfan)<br />[💻](https://github.com/gitpoint/git-point/commits?author=chinesedfan "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Achinesedfan "Bug reports") |
| [<img src="https://avatars0.githubusercontent.com/u/13774309?v=4" width="100px;"/><br /><sub>Arthur Denner</sub>](https://github.com/arthurdenner)<br />[🌍](#translation-arthurdenner "Translation") | [<img src="https://avatars1.githubusercontent.com/u/18403881?v=4" width="100px;"/><br /><sub>Florian Taut</sub>](https://taut-fl.de)<br />[💻](https://github.com/gitpoint/git-point/commits?author=FlorianTaut "Code") | [<img src="https://avatars0.githubusercontent.com/u/15075759?v=4" width="100px;"/><br /><sub>Avare Kodcu</sub>](http://www.avarekodcu.com/iletisim)<br />[🌍](#translation-abdurrahmanekr "Translation") | [<img src="https://avatars0.githubusercontent.com/u/23240518?v=4" width="100px;"/><br /><sub>Anas Khan</sub>](http://anask.xyz)<br />[🌍](#translation-anaskhan96 "Translation") | [<img src="https://avatars0.githubusercontent.com/u/1930729?v=4" width="100px;"/><br /><sub>Nelson Henrique</sub>](https://github.com/nersoh)<br />[💻](https://github.com/gitpoint/git-point/commits?author=nersoh "Code") | [<img src="https://avatars3.githubusercontent.com/u/23623237?v=4" width="100px;"/><br /><sub>Charles Kenney</sub>](http://charleskenney.com)<br />[💻](https://github.com/gitpoint/git-point/commits?author=Charliekenney23 "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/18398761?v=4" width="100px;"/><br /><sub>Vitaliy Kanev</sub>](https://github.com/vitalkanev)<br />[📖](https://github.com/gitpoint/git-point/commits?author=vitalkanev "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/3691490?v=4" width="100px;"/><br /><sub>Peter Dave Hello</sub>](https://www.peterdavehello.org/)<br />[📖](https://github.com/gitpoint/git-point/commits?author=PeterDaveHello "Documentation") [🔧](#tool-PeterDaveHello "Tools") | [<img src="https://avatars3.githubusercontent.com/u/10849025?v=4" width="100px;"/><br /><sub>Ernoff</sub>](https://github.com/Ernoff)<br /> |
<!-- ALL-CONTRIBUTORS-LIST:END -->


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
