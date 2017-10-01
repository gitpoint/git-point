<h1 align="center"> GitPoint </h1> <br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="GitPoint" title="GitPoint" src="http://i.imgur.com/VShxJHs.png" width="450">
  </a>
</p>

<p align="center">
  GitHub in your pocket. Built with React Native.
</p>

<p align="center">
  <a href="https://itunes.apple.com/us/app/gitpoint/id1251245162?mt=8">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="https://play.google.com/store/apps/details?id=com.gitpoint">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Feedback/Contributing](#feedbackcontributing)
- [Build process](#build-process)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[![Build Status](https://img.shields.io/travis/gitpoint/git-point.svg?style=flat-square)](https://travis-ci.org/gitpoint/git-point)
[![All Contributors](https://img.shields.io/badge/all_contributors-39-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Gitter chat](https://img.shields.io/badge/chat-on_gitter-008080.svg?style=flat-square)](https://gitter.im/git-point)

View repository and user information, control your notifications and even manage your issues and pull requests. Built with React Native, GitPoint is the most feature-rich unofficial GitHub client that is 100% free.

**Available for both iOS and Android.**

<p align="center">
  <img src = "http://i.imgur.com/HowF6aM.png" width=350>
</p>

## Features

A few of the things you can do with GitPoint:

* View user activity feed
* Communicate on your issue and pull request conversations
* Close or lock issues
* Apply labels and assignees
* Review and merge pull requests
* Create new issues
* Star, watch and fork repositories
* Control your unread and participating notifications
* Easily search for any user or repository

<p align="center">
  <img src = "http://i.imgur.com/IkSnFRL.png" width=700>
</p>

<p align="center">
  <img src = "http://i.imgur.com/0iorG20.png" width=700>
</p>

## Feedback/Contributing

Feel free to send us feedback on [Twitter](https://twitter.com/gitpointapp) or [file an issue](https://github.com/gitpoint/git-point/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

Also, if there's anything you'd like to chat about, please feel free to join our [Gitter chat](https://gitter.im/git-point)!

## Build process

- Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for getting started building a project with native code. **A Mac is required if you wish to develop for iOS.**
- Clone or download the repo
- `yarn` to install dependencies
- `yarn run link` to link react-native dependencies
- `yarn start:ios` to start the packager and run the app in the iOS simulator (`yarn start:ios:logger` will boot the application with [redux-logger](<https://github.com/evgenyrodionov/redux-logger>))
- `yarn start:android` to start the packager and run the app in the the Android device/emulator (`yarn start:android:logger` will boot the application with [redux-logger](https://github.com/evgenyrodionov/redux-logger))

Please take a look at the [contributing guidelines](./CONTRIBUTING.md) for a detailed process on how to build your application as well as troubleshooting information.

**Development Keys**: The `CLIENT_ID` and `CLIENT_SECRET` in `api/index.js` are for development purposes and do not represent the actual application keys. Feel free to use them or use a new set of keys by creating an [OAuth application](https://github.com/settings/applications/new) of your own

## Contributors

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
