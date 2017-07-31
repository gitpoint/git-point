<h1 align="center"> GitPoint </h1> <br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="GitPoint" title="GitPoint" src="http://i.imgur.com/VShxJHs.png" width="450">
  </a>
</p>

<p align="center">
  GitHub for iOS. <a href="https://github.com/gitpoint/git-point/issues/2#issuecomment-316261018">Android coming soon. </a> <br>
</p>

<p align="center">
  <a href="https://itunes.apple.com/us/app/gitpoint/id1251245162?mt=8">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="130">
  </a>
</p>

## Introduction

[![Build Status](https://img.shields.io/travis/gitpoint/git-point.svg?style=flat-square)](https://travis-ci.org/gitpoint/git-point)
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Gitter chat](https://img.shields.io/badge/chat-on_gitter-008080.svg?style=flat-square)](https://gitter.im/git-point)

View repository and user information, control your notifications and even manage your issues and pull requests. GitPoint is the most feature-rich unofficial GitHub iOS client that is 100% free.

<p align="center">
  <img src = "http://i.imgur.com/KhBsmXH.png" width=250>
</p>

## Features

* View user activity feed
* Communicate on your issue and pull request conversations
* Close or lock issues
* Apply labels and assignees
* Review and merge pull requests
* Control your unread and participating notifications
* Easily search for any user or repository

<p align="center">
  <img src = "http://i.imgur.com/P4YoYYu.png">
</p>

## Feedback/Contributing

Feel free to send me feedback on [twitter](https://twitter.com/hdjirdeh) or [file an issue](https://github.com/housseindjirdeh/git-point/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

Also, if there's anything you'd like to chat about, please feel free to join our [gitter chat](https://gitter.im/git-point)!

## Build process

- Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for getting started building a project with native code. A Mac is required.
- Clone or download the repo
- `yarn` to install dependencies
- `yarn run link` to link react-native dependencies
- `yarn start:ios` to start the packager and run the app in the iOS simulator (`yarn start:ios:logger` will boot the application with [redux-logger](<https://github.com/evgenyrodionov/redux-logger>))
- `yarn start:android` to start the packager and run the app in the the Android device/emulator (`yarn start:android:logger` will boot the application with [redux-logger](https://github.com/evgenyrodionov/redux-logger))

Please take a look at the [contributing guidelines](./CONTRIBUTING.md) for a detailed process on how to build your application as well as troubleshooting information.

**Development Keys**: The `CLIENT_ID` and `CLIENT_SECRET` in `api/index.js` are for development purposes and do not represent the actual application keys. Feel free to use them or use a new set of keys by creating an [OAuth application](https://github.com/settings/applications/new) of your own

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/12476932?v=3" width="100px;"/><br /><sub>Houssein Djirdeh</sub>](https://houssein.me)<br />[💬](#question-housseindjirdeh "Answering Questions") [💻](https://github.com/gitpoint/git-point/commits?author=housseindjirdeh "Code") [🎨](#design-housseindjirdeh "Design") [📖](https://github.com/gitpoint/git-point/commits?author=housseindjirdeh "Documentation") [👀](#review-housseindjirdeh "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/16705071?v=3" width="100px;"/><br /><sub>gejose</sub>](https://github.com/gejose)<br />[💻](https://github.com/gitpoint/git-point/commits?author=gejose "Code") | [<img src="https://avatars3.githubusercontent.com/u/14151327?v=3" width="100px;"/><br /><sub>rmevans9</sub>](https://github.com/rmevans9)<br />[💻](https://github.com/gitpoint/git-point/commits?author=rmevans9 "Code") | [<img src="https://avatars1.githubusercontent.com/u/4408379?v=3" width="100px;"/><br /><sub>Alexey Pyltsyn</sub>](http://lex111.ru)<br />[💻](https://github.com/gitpoint/git-point/commits?author=lex111 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Alex111 "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/10660468?v=3" width="100px;"/><br /><sub>Jason Etcovitch</sub>](https://jasonet.co)<br />[💻](https://github.com/gitpoint/git-point/commits?author=JasonEtco "Code") | [<img src="https://avatars1.githubusercontent.com/u/1166143?v=3" width="100px;"/><br /><sub>Hosmel Quintana</sub>](http://hosmelq.com)<br />[💻](https://github.com/gitpoint/git-point/commits?author=hosmelq "Code") | [<img src="https://avatars0.githubusercontent.com/u/464978?v=3" width="100px;"/><br /><sub>Alejandro Ñáñez Ortiz</sub>](http://co.linkedin.com/in/alejandronanez/)<br />[💻](https://github.com/gitpoint/git-point/commits?author=alejandronanez "Code") [👀](#review-alejandronanez "Reviewed Pull Requests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/3055294?v=3" width="100px;"/><br /><sub>Patrick Wang</sub>](https://patw.me)<br />[💻](https://github.com/gitpoint/git-point/commits?author=patw0929 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Apatw0929 "Bug reports") | [<img src="https://avatars5.githubusercontent.com/u/627794?v=4" width="100px;"/><br /><sub>Mike Kavouras</sub>](https://github.com/mikekavouras)<br />[💻](https://github.com/gitpoint/git-point/commits?author=mikekavouras "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Amikekavouras "Bug reports") | [<img src="https://avatars4.githubusercontent.com/u/4848554?v=4" width="100px;"/><br /><sub>Peter Lazar</sub>](https://github.com/peterlazar1993)<br />[💻](https://github.com/gitpoint/git-point/commits?author=peterlazar1993 "Code") | [<img src="https://avatars6.githubusercontent.com/u/5106887?v=4" width="100px;"/><br /><sub>June Domingo</sub>](https://github.com/junedomingo)<br />[💻](https://github.com/gitpoint/git-point/commits?author=junedomingo "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Ajunedomingo "Bug reports") | [<img src="https://avatars7.githubusercontent.com/u/9287184?v=4" width="100px;"/><br /><sub>Antoine</sub>](http://www.jaaccelere.com)<br />[💻](https://github.com/gitpoint/git-point/commits?author=Antoine38660 "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3AAntoine38660 "Bug reports") | [<img src="https://avatars6.githubusercontent.com/u/13142418?v=4" width="100px;"/><br /><sub>Wang Shidong</sub>](https://wsdjeg.github.io)<br />[💻](https://github.com/gitpoint/git-point/commits?author=wsdjeg "Code") | [<img src="https://avatars4.githubusercontent.com/u/2190589?v=4" width="100px;"/><br /><sub>Swapnil Joshi</sub>](http://swapnilmj.users.sourceforge.net/)<br />[💻](https://github.com/gitpoint/git-point/commits?author=swapnilmj "Code") |
| [<img src="https://avatars5.githubusercontent.com/u/408959?v=4" width="100px;"/><br /><sub>Rolf Koenders</sub>](https://github.com/RolfKoenders)<br />[💻](https://github.com/gitpoint/git-point/commits?author=RolfKoenders "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3ARolfKoenders "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/10191084?v=4" width="100px;"/><br /><sub>Andrew Dassonville</sub>](https://andrewda.me)<br />[💻](https://github.com/gitpoint/git-point/commits?author=andrewda "Code") [💬](#question-andrewda "Answering Questions") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3Aandrewda "Bug reports") [👀](#review-andrewda "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/2076088?v=4" width="100px;"/><br /><sub>Anton</sub>](https://medium.com/@antondomashnev)<br />[💻](https://github.com/gitpoint/git-point/commits?author=Antondomashnev "Code") | [<img src="https://avatars0.githubusercontent.com/u/14795799?v=4" width="100px;"/><br /><sub>Xuezheng Ma</sub>](https://github.com/xuezhma)<br />[💻](https://github.com/gitpoint/git-point/commits?author=xuezhma "Code") | [<img src="https://avatars0.githubusercontent.com/u/8962228?v=4" width="100px;"/><br /><sub>Sammy Israwi</sub>](https://github.com/SammyIsra)<br />[💻](https://github.com/gitpoint/git-point/commits?author=SammyIsra "Code") [🐛](https://github.com/gitpoint/git-point/issues?q=author%3ASammyIsra "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/8122587?v=4" width="100px;"/><br /><sub>Chao Ren</sub>](https://github.com/RogerAbyss)<br />[🐛](https://github.com/gitpoint/git-point/issues?q=author%3ARogerAbyss "Bug reports") [💻](https://github.com/gitpoint/git-point/commits?author=RogerAbyss "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
