<a name="1.4.1"></a>
## [1.4.1](https://github.com/gitpoint/git-point/compare/1.4.0...1.4.1) (2017-12-15)

### Bug Fixes

* Fix application version number ([dd56652](https://github.com/gitpoint/git-point/commit/dd5665248114167cdc9c52657ca3e494d008f2b5))

<a name="1.4.0"></a>
# [1.4.0](https://github.com/gitpoint/git-point/compare/1.3.1...1.4.0) (2017-12-12)


### Bug Fixes

* **android:** Hide tabbar when keyboard show ([#435](https://github.com/gitpoint/git-point/issues/435)) ([8e49116](https://github.com/gitpoint/git-point/commit/8e49116))
* **android:** fix Button layout ([#657](https://github.com/gitpoint/git-point/issues/657)) ([4bbc9f4](https://github.com/gitpoint/git-point/commit/4bbc9f4))
* **build:** fix styled components errors ([#572](https://github.com/gitpoint/git-point/issues/572)) ([aa22d8a](https://github.com/gitpoint/git-point/commit/aa22d8a))
* **comment-input:** Fix the input text being chopped up ([#622](https://github.com/gitpoint/git-point/issues/622)) ([e3e5a7f](https://github.com/gitpoint/git-point/commit/e3e5a7f)), closes [#536](https://github.com/gitpoint/git-point/issues/536)
* **contributors:** fix link location for contributors ([#460](https://github.com/gitpoint/git-point/issues/460)) ([b5c9197](https://github.com/gitpoint/git-point/commit/b5c9197))
* **crash:** Fix crash in PullDiff screen, SH is not stylable ([#618](https://github.com/gitpoint/git-point/issues/618)) ([ef2dd1d](https://github.com/gitpoint/git-point/commit/ef2dd1d))
* **crash:** Fix potential crash on undefined parent in <code> ([#662](https://github.com/gitpoint/git-point/issues/662)) ([4609e1f](https://github.com/gitpoint/git-point/commit/4609e1f))
* **i18n:** add missing string to translations ([#459](https://github.com/gitpoint/git-point/issues/459)) ([0d5c325](https://github.com/gitpoint/git-point/commit/0d5c325))
* **i18n:** correct typo and some words in french ([#611](https://github.com/gitpoint/git-point/issues/611)) ([464aa53](https://github.com/gitpoint/git-point/commit/464aa53))
* **i18n:** polish typos, wording and new keys translated ([#481](https://github.com/gitpoint/git-point/issues/481)) ([de4dedb](https://github.com/gitpoint/git-point/commit/de4dedb)), closes [#478](https://github.com/gitpoint/git-point/issues/478)
* **issue:** Fix crash due to undefined navigation params ([#658](https://github.com/gitpoint/git-point/issues/658)) ([fa70d90](https://github.com/gitpoint/git-point/commit/fa70d90))
* **issue:** Fix links to issue comments ([#463](https://github.com/gitpoint/git-point/issues/463)) ([127deee](https://github.com/gitpoint/git-point/commit/127deee))
* **issue:** Fix pull request related fields are not reset ([#526](https://github.com/gitpoint/git-point/issues/526)) ([df8d612](https://github.com/gitpoint/git-point/commit/df8d612))
* **issue:** Fix wrong repository was used ([#659](https://github.com/gitpoint/git-point/issues/659)) ([e2b7fda](https://github.com/gitpoint/git-point/commit/e2b7fda))
* **issue-events:** Fix inverted label for deleted/restored this branch ([#542](https://github.com/gitpoint/git-point/issues/542)) ([9bf2b3f](https://github.com/gitpoint/git-point/commit/9bf2b3f))
* **locale:** Fix merge typo ([53089b6](https://github.com/gitpoint/git-point/commit/53089b6))
* **locale:** make correct locale use ([#479](https://github.com/gitpoint/git-point/issues/479)) ([3a6879f](https://github.com/gitpoint/git-point/commit/3a6879f))
* **md:** Image related fixes ([#448](https://github.com/gitpoint/git-point/issues/448)) ([582fb1a](https://github.com/gitpoint/git-point/commit/582fb1a))
* **md:** Play nice with anchors ([#465](https://github.com/gitpoint/git-point/issues/465)) ([1fb5165](https://github.com/gitpoint/git-point/commit/1fb5165))
* **notification:** Avoid repo names include keyword ([#426](https://github.com/gitpoint/git-point/issues/426)) ([8a724f9](https://github.com/gitpoint/git-point/commit/8a724f9))
* Dynamic status bar ([#641](https://github.com/gitpoint/git-point/issues/641)) ([2bc73fe](https://github.com/gitpoint/git-point/commit/2bc73fe)), closes [#4](https://github.com/gitpoint/git-point/issues/4)
* Fix button transparency on Android ([#527](https://github.com/gitpoint/git-point/issues/527)) ([30f022b](https://github.com/gitpoint/git-point/commit/30f022b))
* Fix the last avatar being truncated, and variablize the size ([#491](https://github.com/gitpoint/git-point/issues/491)) ([b6e2941](https://github.com/gitpoint/git-point/commit/b6e2941))
* Fix wrong styled declaration ([1330910](https://github.com/gitpoint/git-point/commit/1330910))
* Mention area component fontSize prop ([#602](https://github.com/gitpoint/git-point/issues/602)) ([c3e019a](https://github.com/gitpoint/git-point/commit/c3e019a))
* Remove undefined var & fix typo ([#517](https://github.com/gitpoint/git-point/issues/517)) ([8405e19](https://github.com/gitpoint/git-point/commit/8405e19))
* Update stateRandom and reset cookies after a successful login ([#494](https://github.com/gitpoint/git-point/issues/494)) ([b4e05a2](https://github.com/gitpoint/git-point/commit/b4e05a2))
* Updated hash for react-native-mock ([#546](https://github.com/gitpoint/git-point/issues/546)) ([d0cb8a5](https://github.com/gitpoint/git-point/commit/d0cb8a5))
* **ux:** Add back button for AuthProfileScreen ([#507](https://github.com/gitpoint/git-point/issues/507)) ([5ef3260](https://github.com/gitpoint/git-point/commit/5ef3260))
* fix section list button height ([#545](https://github.com/gitpoint/git-point/issues/545)) ([31d1067](https://github.com/gitpoint/git-point/commit/31d1067))
* re-enable color prop for the badge component ([#648](https://github.com/gitpoint/git-point/issues/648)) ([14532ce](https://github.com/gitpoint/git-point/commit/14532ce))
* remove containers styles that confuses the button ([#656](https://github.com/gitpoint/git-point/issues/656)) ([ebfb02c](https://github.com/gitpoint/git-point/commit/ebfb02c))
* **sc:** Fix by stylelint ([#612](https://github.com/gitpoint/git-point/issues/612)) ([e5c0291](https://github.com/gitpoint/git-point/commit/e5c0291))
* **search-bar:** Compile Ionicons for Android ([#631](https://github.com/gitpoint/git-point/issues/631)) ([c23dd96](https://github.com/gitpoint/git-point/commit/c23dd96)), closes [#630](https://github.com/gitpoint/git-point/issues/630)
* **styled-components:** Fix react-native-elements related problems ([#619](https://github.com/gitpoint/git-point/issues/619)) ([100b864](https://github.com/gitpoint/git-point/commit/100b864))
* **trans:** Make all translations contain same fields ([#478](https://github.com/gitpoint/git-point/issues/478)) ([3714dc5](https://github.com/gitpoint/git-point/commit/3714dc5))
* setTranslucent and setBackgroundColor are Android only ([#653](https://github.com/gitpoint/git-point/issues/653)) ([55abff8](https://github.com/gitpoint/git-point/commit/55abff8))
* **ui:** Fix Bio section in auth-profile.screen and profile.screen ([#600](https://github.com/gitpoint/git-point/issues/600)) ([753f60c](https://github.com/gitpoint/git-point/commit/753f60c))
* **user-profile-component:** Fix user profile image ([#576](https://github.com/gitpoint/git-point/issues/576)) ([a43d3bc](https://github.com/gitpoint/git-point/commit/a43d3bc))
* **ux:** Add Back button event on ImageZoom component ([#519](https://github.com/gitpoint/git-point/issues/519)) ([2ff7a23](https://github.com/gitpoint/git-point/commit/2ff7a23))
* **warning:** Fix the key extractor of issue screen ([#539](https://github.com/gitpoint/git-point/issues/539)) ([fa4e4d2](https://github.com/gitpoint/git-point/commit/fa4e4d2))


### Features

* **fonts:** Remove useless fonts in iOS ([#475](https://github.com/gitpoint/git-point/issues/475)) ([83ee644](https://github.com/gitpoint/git-point/commit/83ee644))
* **i18n:** Add Galician translation ([#452](https://github.com/gitpoint/git-point/issues/452)) ([98e5880](https://github.com/gitpoint/git-point/commit/98e5880)), closes [#421](https://github.com/gitpoint/git-point/issues/421)
* **i18n:** Add Polish translation ([#466](https://github.com/gitpoint/git-point/issues/466)) ([0f06192](https://github.com/gitpoint/git-point/commit/0f06192))
* **i18n:** add Esperanto translation ([#471](https://github.com/gitpoint/git-point/issues/471)) ([9b6f5b4](https://github.com/gitpoint/git-point/commit/9b6f5b4))
* **i18n:** add german language ([#458](https://github.com/gitpoint/git-point/issues/458)) ([a065240](https://github.com/gitpoint/git-point/commit/a065240))
* **i18n:** add mandarin Chinese translation ([#583](https://github.com/gitpoint/git-point/issues/583)) ([b3e182f](https://github.com/gitpoint/git-point/commit/b3e182f))
* **i18n:** add pt translation ([#440](https://github.com/gitpoint/git-point/issues/440)) ([94e5933](https://github.com/gitpoint/git-point/commit/94e5933))
* **i18n:** Add Ukrainian translation ([#585](https://github.com/gitpoint/git-point/issues/585)) ([82b3845](https://github.com/gitpoint/git-point/commit/82b3845))
* **i18n:** add Spanish translations ([#282](https://github.com/gitpoint/git-point/issues/282)) ([ee72c91](https://github.com/gitpoint/git-point/commit/ee72c91))
* **issue:** Disable merge button if not possible ([#425](https://github.com/gitpoint/git-point/issues/425)) ([310ecdd](https://github.com/gitpoint/git-point/commit/310ecdd))
* **markdown:** Add support for <sub> ([#629](https://github.com/gitpoint/git-point/issues/629)) ([35ef474](https://github.com/gitpoint/git-point/commit/35ef474)), closes [#627](https://github.com/gitpoint/git-point/issues/627)
* **markdown:** Add support for quoted emails ([#501](https://github.com/gitpoint/git-point/issues/501)) ([c9e7b50](https://github.com/gitpoint/git-point/commit/c9e7b50))
* **markdown:** Support to render del tag ([#525](https://github.com/gitpoint/git-point/issues/525)) ([7bfbf9a](https://github.com/gitpoint/git-point/commit/7bfbf9a))
* **members:** add gradient to members list ([#529](https://github.com/gitpoint/git-point/issues/529)) ([fba5f19](https://github.com/gitpoint/git-point/commit/fba5f19))
* **open_in_browser:** Add open in browser to different screens ([#424](https://github.com/gitpoint/git-point/issues/424)) ([d8e40de](https://github.com/gitpoint/git-point/commit/d8e40de))
* **store:** blacklist everything but auth from persistent storage ([#661](https://github.com/gitpoint/git-point/issues/661)) ([4bcee46](https://github.com/gitpoint/git-point/commit/4bcee46))
* **styling:** add styled components ([#495](https://github.com/gitpoint/git-point/issues/495)) ([80f383d](https://github.com/gitpoint/git-point/commit/80f383d))
* Issue Events ([#438](https://github.com/gitpoint/git-point/issues/438)) ([3ec1934](https://github.com/gitpoint/git-point/commit/3ec1934))


<a name="1.3.1"></a>
## [1.3.1](https://github.com/gitpoint/git-point/compare/1.1.0...1.3.1) (2017-10-04)

### Bug Fixes

* **editissuecomment, textinput:** Fix height rendering for Android ([#428](https://github.com/gitpoint/git-point/issues/428)) ([775a9c0](https://github.com/gitpoint/git-point/commit/775a9c0))
* **markdown:** Escape content string ([#427](https://github.com/gitpoint/git-point/issues/427)) ([5ed6dfc](https://github.com/gitpoint/git-point/commit/5ed6dfc))


<a name="1.3.0"></a>
## [1.3.0](https://github.com/gitpoint/git-point/compare/1.1.0...1.3.0) (2017-10-04)


### Bug Fixes

* Style updates, add edit issue body functionality ([#409](https://github.com/gitpoint/git-point/issues/409)) ([7e184e6](https://github.com/gitpoint/git-point/commit/7e184e6))
* **api:** Add missing await to fetchNotifications ([5d80fb0](https://github.com/gitpoint/git-point/commit/5d80fb0))
* **api:** Fix mispelled v3.root ([901f9d1](https://github.com/gitpoint/git-point/commit/901f9d1))
* **api:** Implement and use Accept FULL for comments ([#405](https://github.com/gitpoint/git-point/issues/405)) ([fede55a](https://github.com/gitpoint/git-point/commit/fede55a))
* **api:** Run getRepositoryFile() through API, not raw.githubcontents ([#392](https://github.com/gitpoint/git-point/issues/392)) ([ad7ec47](https://github.com/gitpoint/git-point/commit/ad7ec47))
* **api:** get diff from API instead of web ([#379](https://github.com/gitpoint/git-point/issues/379)) ([9b17741](https://github.com/gitpoint/git-point/commit/9b17741))
* **api:** re-add fetchSearch and fetchNotifications ([7dd548b](https://github.com/gitpoint/git-point/commit/7dd548b))
* **ci-build:** Add missing commas ([e2439e8](https://github.com/gitpoint/git-point/commit/e2439e8))
* **comment-input:** add new lines when writing issue comments on Android ([#207](https://github.com/gitpoint/git-point/issues/207)) ([a961bbe](https://github.com/gitpoint/git-point/commit/a961bbe))
* **comments:** fix long press click error ([#384](https://github.com/gitpoint/git-point/issues/384)) ([69cb386](https://github.com/gitpoint/git-point/commit/69cb386))
* **dependencies:** replace react-native-app-intro with rn-app-intro ([#400](https://github.com/gitpoint/git-point/issues/400)) ([f82359b](https://github.com/gitpoint/git-point/commit/f82359b)), closes [#395](https://github.com/gitpoint/git-point/issues/395) [#399](https://github.com/gitpoint/git-point/issues/399)
* **events:** Fix wrong wording for commented on pull request ([#262](https://github.com/gitpoint/git-point/issues/262)) ([182bc11](https://github.com/gitpoint/git-point/commit/182bc11)), closes [#261](https://github.com/gitpoint/git-point/issues/261)
* **events:** get user events after login ([#390](https://github.com/gitpoint/git-point/issues/390)) ([62559da](https://github.com/gitpoint/git-point/commit/62559da))
* **events:** update screen after change language ([#413](https://github.com/gitpoint/git-point/issues/413)) ([53f9a1f](https://github.com/gitpoint/git-point/commit/53f9a1f))
* **issue:** Make sure the right repository is fetched ([#332](https://github.com/gitpoint/git-point/issues/332)) ([71a9320](https://github.com/gitpoint/git-point/commit/71a9320))
* **issue:** fix rawtext error if comment.body equals to empty string ([#320](https://github.com/gitpoint/git-point/issues/320)) ([4b36b4f](https://github.com/gitpoint/git-point/commit/4b36b4f))
* **issue:** removing the oneLineText function ([#325](https://github.com/gitpoint/git-point/issues/325)) ([0e46890](https://github.com/gitpoint/git-point/commit/0e46890))
* **language-colors:** fix/add language colors ([#352](https://github.com/gitpoint/git-point/issues/352)) ([bf0cb41](https://github.com/gitpoint/git-point/commit/bf0cb41))
* **list-organizations:** fix sort by alphabetic ([6462489](https://github.com/gitpoint/git-point/commit/6462489))
* **loading-container:** make correct center align ([#364](https://github.com/gitpoint/git-point/issues/364)) ([cb5be2c](https://github.com/gitpoint/git-point/commit/cb5be2c))
* **localization:** pass language to issue list item component ([59c9ccb](https://github.com/gitpoint/git-point/commit/59c9ccb))
* **localization:** pull-list.screen.js copy/paste mistake ([#241](https://github.com/gitpoint/git-point/issues/241)) ([956cf65](https://github.com/gitpoint/git-point/commit/956cf65))
* **localization:** various localization improvements ([#193](https://github.com/gitpoint/git-point/issues/193)) ([9c3e182](https://github.com/gitpoint/git-point/commit/9c3e182))
* **markdown:** Make sure code is not HTML encoded ([#346](https://github.com/gitpoint/git-point/issues/346)) ([9542006](https://github.com/gitpoint/git-point/commit/9542006))
* **markdown:** fix various markdown issues ([#370](https://github.com/gitpoint/git-point/issues/370)) ([21b6ea6](https://github.com/gitpoint/git-point/commit/21b6ea6))
* **markdown:** temporarily embed the CSS into the webview ([#415](https://github.com/gitpoint/git-point/issues/415)) ([ad2e61c](https://github.com/gitpoint/git-point/commit/ad2e61c))
* **md:** Display a link instead of the image inside a <li> ([#403](https://github.com/gitpoint/git-point/issues/403)) ([b850acd](https://github.com/gitpoint/git-point/commit/b850acd))
* **modal:** onRequestClose prop warning ([aefb6cc](https://github.com/gitpoint/git-point/commit/aefb6cc))
* **new-issue:** various submit new issue improvement ([#243](https://github.com/gitpoint/git-point/issues/243)) ([6863271](https://github.com/gitpoint/git-point/commit/6863271)), closes [#236](https://github.com/gitpoint/git-point/issues/236)
* **notifications-count:** return numbers without format ([#404](https://github.com/gitpoint/git-point/issues/404)) ([cfcb07b](https://github.com/gitpoint/git-point/commit/cfcb07b))
* **photo:** Upgrade react-native-photo-view to fix double zoom issue ([#351](https://github.com/gitpoint/git-point/issues/351)) ([dfc009e](https://github.com/gitpoint/git-point/commit/dfc009e))
* **profile:** Fix wrong parameter ([#271](https://github.com/gitpoint/git-point/issues/271)) ([#301](https://github.com/gitpoint/git-point/issues/301)) ([1cba55f](https://github.com/gitpoint/git-point/commit/1cba55f))
* **profile:** fix the wrong `follows you` badge ([#311](https://github.com/gitpoint/git-point/issues/311)) ([5c1cc6a](https://github.com/gitpoint/git-point/commit/5c1cc6a))
* **profile:** navigate to AuthProfile for current user ([#263](https://github.com/gitpoint/git-point/issues/263)) ([bfad60c](https://github.com/gitpoint/git-point/commit/bfad60c)), closes [#247](https://github.com/gitpoint/git-point/issues/247)
* **profile:** prepend user.updated_at to avatar url ([#266](https://github.com/gitpoint/git-point/issues/266)) ([1579336](https://github.com/gitpoint/git-point/commit/1579336)), closes [#265](https://github.com/gitpoint/git-point/issues/265)
* **profile:** use affiliation=own to get user repos ([#281](https://github.com/gitpoint/git-point/issues/281)) ([842d062](https://github.com/gitpoint/git-point/commit/842d062))
* various minor updates ([#420](https://github.com/gitpoint/git-point/issues/420)) ([4d55124](https://github.com/gitpoint/git-point/commit/4d55124))
* **repo:** Show repo prefix for search repo result ([#254](https://github.com/gitpoint/git-point/issues/254)) ([d7bb321](https://github.com/gitpoint/git-point/commit/d7bb321))
* **repo:** hide issues section in forked repo ([#257](https://github.com/gitpoint/git-point/issues/257)) ([01060dc](https://github.com/gitpoint/git-point/commit/01060dc))
* **repository:** Fix the wrong watch count ([#314](https://github.com/gitpoint/git-point/issues/314)) ([727338f](https://github.com/gitpoint/git-point/commit/727338f))
* **repository:** swap watch and share actions ([#250](https://github.com/gitpoint/git-point/issues/250)) ([d6c26de](https://github.com/gitpoint/git-point/commit/d6c26de)), closes [#249](https://github.com/gitpoint/git-point/issues/249)
* **share:** stop pre-filling email subject ([#229](https://github.com/gitpoint/git-point/issues/229)) ([aff022e](https://github.com/gitpoint/git-point/commit/aff022e)), closes [#228](https://github.com/gitpoint/git-point/issues/228)
* **user-options:** make height of language items equal ([#372](https://github.com/gitpoint/git-point/issues/372)) ([6e58176](https://github.com/gitpoint/git-point/commit/6e58176))
* **ux:** Fix user stars and repository watching status ([#336](https://github.com/gitpoint/git-point/issues/336)) ([04f76b5](https://github.com/gitpoint/git-point/commit/04f76b5))
* **ux:** fix typo and add adjustment ([#391](https://github.com/gitpoint/git-point/issues/391)) ([d162064](https://github.com/gitpoint/git-point/commit/d162064))


### Features

* status for following users/starring repos ([#260](https://github.com/gitpoint/git-point/issues/260)) ([f23cc70](https://github.com/gitpoint/git-point/commit/f23cc70))
* **android:** Implement round and adaptive icon ([#340](https://github.com/gitpoint/git-point/issues/340)) ([0fd1a61](https://github.com/gitpoint/git-point/commit/0fd1a61))
* **auth:** use WebView for authentication ([#323](https://github.com/gitpoint/git-point/issues/323)) ([0608c9d](https://github.com/gitpoint/git-point/commit/0608c9d))
* **code:** Better user experience ([#394](https://github.com/gitpoint/git-point/issues/394)) ([916ee29](https://github.com/gitpoint/git-point/commit/916ee29))
* **comment-input:** submit comment on clicking on the icon instead text ([#324](https://github.com/gitpoint/git-point/issues/324)) ([329c851](https://github.com/gitpoint/git-point/commit/329c851))
* **comments:** allow editing and deleting issue comments ([#327](https://github.com/gitpoint/git-point/issues/327)) ([7765b10](https://github.com/gitpoint/git-point/commit/7765b10)), closes [#24](https://github.com/gitpoint/git-point/issues/24) [#24](https://github.com/gitpoint/git-point/issues/24) [#24](https://github.com/gitpoint/git-point/issues/24)
* **entity-info:** prevent render if there is nothing to show ([#216](https://github.com/gitpoint/git-point/issues/216)) ([e03084e](https://github.com/gitpoint/git-point/commit/e03084e))
* **events:** align subtitle ([#218](https://github.com/gitpoint/git-point/issues/218)) ([16ee524](https://github.com/gitpoint/git-point/commit/16ee524))
* **i18n:** Add Russian translations ([#306](https://github.com/gitpoint/git-point/issues/306)) ([50a2206](https://github.com/gitpoint/git-point/commit/50a2206))
* **i18n:** Add french translations ([#242](https://github.com/gitpoint/git-point/issues/242)) ([c5ef279](https://github.com/gitpoint/git-point/commit/c5ef279))
* **i18n:** Add turkish translations ([#279](https://github.com/gitpoint/git-point/issues/279)) ([203d192](https://github.com/gitpoint/git-point/commit/203d192))
* **i18n:** add brazilian portuguese translations ([#284](https://github.com/gitpoint/git-point/issues/284)) ([a5e4641](https://github.com/gitpoint/git-point/commit/a5e4641)), closes [#280](https://github.com/gitpoint/git-point/issues/280)
* **i18n:** add dutch translation ([#268](https://github.com/gitpoint/git-point/issues/268)) ([535fbc0](https://github.com/gitpoint/git-point/commit/535fbc0))

* **issue:** Show issues author and comments count ([#387](https://github.com/gitpoint/git-point/issues/387)) ([810c10c](https://github.com/gitpoint/git-point/commit/810c10c))
* **issue_comments:** Remove long press event ([#393](https://github.com/gitpoint/git-point/issues/393)) ([b55dcee](https://github.com/gitpoint/git-point/commit/b55dcee))
* **language-list:** add emoji flags ([#355](https://github.com/gitpoint/git-point/issues/355)) ([a991bd7](https://github.com/gitpoint/git-point/commit/a991bd7))
* **markdown:** Markdown support ([#326](https://github.com/gitpoint/git-point/issues/326)) ([2b09dc7](https://github.com/gitpoint/git-point/commit/2b09dc7)), closes [#276](https://github.com/gitpoint/git-point/issues/276)
* **markdown:** Use markdown rendered on GitHub side ([#386](https://github.com/gitpoint/git-point/issues/386)) ([5fb5ef6](https://github.com/gitpoint/git-point/commit/5fb5ef6)), closes [#24](https://github.com/gitpoint/git-point/issues/24)
* **navigator:** render tabs as needed ([#338](https://github.com/gitpoint/git-point/issues/338)) ([3f39124](https://github.com/gitpoint/git-point/commit/3f39124))
* **notifications:** add button to mark all notifications as read ([#371](https://github.com/gitpoint/git-point/issues/371)) ([35379d1](https://github.com/gitpoint/git-point/commit/35379d1))
* **notifications:** add pull to refresh if notifications is empty ([#365](https://github.com/gitpoint/git-point/issues/365)) ([2674716](https://github.com/gitpoint/git-point/commit/2674716))
* **repo:** add label to show watch status ([#227](https://github.com/gitpoint/git-point/issues/227)) ([e2e993e](https://github.com/gitpoint/git-point/commit/e2e993e)), closes [#103](https://github.com/gitpoint/git-point/issues/103)
* **repository:** Hide readme button if no readme ([#335](https://github.com/gitpoint/git-point/issues/335)) ([3f1e4a4](https://github.com/gitpoint/git-point/commit/3f1e4a4))
* **repository:** Show issues only when is enable ([#328](https://github.com/gitpoint/git-point/issues/328)) ([e4ee75f](https://github.com/gitpoint/git-point/commit/e4ee75f))
* **repository:** use sort=updated to sort repos ([#286](https://github.com/gitpoint/git-point/issues/286)) ([#300](https://github.com/gitpoint/git-point/issues/300)) ([a7e2ff3](https://github.com/gitpoint/git-point/commit/a7e2ff3))
* **repository-list-item:** add forks count ([#373](https://github.com/gitpoint/git-point/issues/373)) ([2010038](https://github.com/gitpoint/git-point/commit/2010038))
* **screen:** add support for landscape orientation ([#333](https://github.com/gitpoint/git-point/issues/333)) ([a21e920](https://github.com/gitpoint/git-point/commit/a21e920))
* ignore editors ([#377](https://github.com/gitpoint/git-point/issues/377)) ([35287aa](https://github.com/gitpoint/git-point/commit/35287aa))
* navigate to auth profile screen for the current user ([#211](https://github.com/gitpoint/git-point/issues/211)) ([1000a25](https://github.com/gitpoint/git-point/commit/1000a25))
* **starred-count:** show starred count ([#271](https://github.com/gitpoint/git-point/issues/271)) ([4e9b4f2](https://github.com/gitpoint/git-point/commit/4e9b4f2))
* **tabbar:** show notifications count ([#360](https://github.com/gitpoint/git-point/issues/360)) ([ec4610b](https://github.com/gitpoint/git-point/commit/ec4610b))
* **ux:** Move check for updates into settings screen ([#329](https://github.com/gitpoint/git-point/issues/329)) ([2f4e534](https://github.com/gitpoint/git-point/commit/2f4e534))
* **ux:** introduce our standardized <Button /> ([#374](https://github.com/gitpoint/git-point/issues/374)) ([fa38099](https://github.com/gitpoint/git-point/commit/fa38099))



<a name="1.2.0"></a>
# 1.2.0 (2017-08-03)

### Bug Fixes

* Fixed fonts on Android (#121)
* Fixed the displayed repositories for the current user (#105)
* Fixed NaN in number of repositories (#64)

### Features

* Added the ability to watch a repository (#56)
* Added the intro screen (#174)
* Added repository sharing (#173)
* Added privacy policy (#169)
* Added the ability to submit a new issue (#166)
* Added number and type to issue screen title (#160)
* Added the application version display (#144)
* Added company to user profile (#143)
* Added the ability to zoom profile image (#139)
* Added stars display in repositories list (#138)
* Added autocompletion for usernames (#133)
* Added pull down to refresh on profile and repository (#132)
* Added main language in repository view (#119)
* Added all organizations display in user profile (#115)
* Added forked repositories in search results (#113)
* Added location on user profile (#104)
* Added issues and PR counts (#100)
* Added ability to logout from the app (#99)
* Added syntax highlighting for PR diffs (#80)
* Added support for rendering emojis (#69)
* Added syntax highlighting in code files (#60)
* Added the ability to fork a repository (#50)
* Added Android support (#49)
* Added iPad support (#39)

<a name="1.0.0"></a>
# 1.0.0 (2017-08-06)

* Initial version with iOS support

