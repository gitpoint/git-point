export const zhTW = {
  auth: {
    login: {
      connectingToGitHub: '連線至 GitHub...',
      preparingGitPoint: 'GitPoint 準備中...',
      cancel: '取消',
      troubles: "Can't login?",
      welcomeTitle: '歡迎使用 GitPoint',
      welcomeMessage: '完全免費，功能最強大的 GitHub 應用程式！',
      notificationsTitle: '通知設定',
      notificationsMessage: '檢視並設定所有未讀與參與的通知',
      reposTitle: '版本庫與使用者',
      reposMessage: '便捷地獲得版本庫、使用者與組織的資訊',
      issuesTitle: '議題 與 合併請求',
      issuesMessage: '參與議題討論、合併請求',
      signInButton: '登入',
    },
    networkError: 'Oops! it seems that you are not connected to the internet!',
    welcome: {
      welcomeTitle: '歡迎使用 GitPoint',
    },
    events: {
      welcomeMessage:
        '歡迎！這是您的消息動態，在這裡你可以看到你關注的版本庫與使用者最近的動態',
      commitCommentEvent: '在 commit 上評論',
      createEvent: '建立了{{object}}',
      deleteEvent: '刪除了{{object}}',
      issueCommentEvent: '在{{type}}{{action}}',
      issueEditedEvent: '{{action}}了他們對{{type}}的評論',
      issueRemovedEvent: '{{action}}了他們對{{type}}的評論',
      issuesEvent: '{{action}}議題',
      publicEvent: {
        action: '使得',
        connector: '公開',
      },
      pullRequestEvent: '{{action}}合併請求',
      pullRequestReviewEvent: '{{action}}合併請求審查',
      pullRequestReviewCommentEvent: '{{action}}了合併請求',
      pullRequestReviewEditedEvent: '{{action}}他們對合併請求的意見',
      pullRequestReviewDeletedEvent: '{{action}}他們對合併請求的意見',
      releaseEvent: '{{action}}發佈',
      atConnector: '在',
      toConnector: '到',
      types: {
        pullRequest: '合併請求',
        issue: '議題',
      },
      objects: {
        repository: '版本庫',
        branch: '分支',
        tag: 'tag',
      },
      actions: {
        added: '新增了',
        created: '建立了',
        edited: '編輯了',
        deleted: '刪除了',
        assigned: '指派了',
        unassigned: '取消指派了',
        labeled: '下標籤了',
        unlabeled: '取消標籤了',
        opened: '打開了',
        milestoned: '建立里程碑了',
        demilestoned: '取消里程碑了',
        closed: '關閉了',
        reopened: '重新打開了',
        review_requested: '建立了審查請求',
        review_request_removed: '取消了審查請求',
        submitted: '送出了',
        dismissed: '駁回了',
        published: '發佈了',
        publicized: '設為公開了',
        privatized: '設為私人了',
        starred: '給星',
        pushedTo: '推送至',
        forked: 'fork 了',
        commented: '留下了評論',
        removed: '移除了',
      },
    },
    profile: {
      orgsRequestApprovalTop: '看不到你所屬的所有組織？',
      orgsRequestApprovalBottom: '你可能需要請求許可',
      codePushCheck: '檢查更新',
      codePushChecking: '檢查更新中...',
      codePushUpdated: 'App 已經是最新版本',
      codePushAvailable: '有新版本！',
      codePushNotApplicable: '無法在除錯模式中使用',
    },
    userOptions: {
      donate: '贊助我們',
      title: '設定',
      language: '語言',
      privacyPolicy: '隱私條款',
      signOut: '登出',
    },
    privacyPolicy: {
      title: '隱私條款',
      effectiveDate: '最後更新：2017年7月15日',
      introduction:
        '我們很高興您選擇使用 GitPoint。您可以在本隱私條款中查閱我們使用哪些與不使用哪些使用者資料。',
      userDataTitle: '使用者資料',
      userData1:
        '我們不會把您的 GitHub 資訊用於任何用途。授權登入後，使用者的 OAuth token 只會被保留在使用者裝置的儲存空間中。我們無法取得此類資訊。我們不會查看或儲存使用者的 access token。',
      userData2:
        '這代表我們不可能查看、使用，與分享使用者的 GitHub 資料。即使私人資料變為可見，我們也不會查看或儲存它。如果它意外地被儲存下來，我們將立即使用安全的清除方式刪除它。再次重申，我們已經特別地建立了授權機制，以保證此類情事不會發生。',
      analyticsInfoTitle: '分析資料',
      analyticsInfo1:
        '目前我們使用 Google Analytics 和 iTunes App Analytics 來幫助我們分析 GitPoint 的流量和使用趨勢。這些工具從您的裝置上蒐集包含裝置、系統版本、地區、來源等資訊。這些資訊並無法被用來識別任一特定使用者或取得任何個人資訊。',
      analyticsInfo2:
        '如果我們使用第三方平台來蒐集堆棧跟蹤訊息（stack traces）、錯誤紀錄（error logs）或更多的分析資訊，我們將保證使用者的資訊均為匿名且加密的。',
      openSourceTitle: '開源',
      openSource1:
        'GitPoint 是開源軟體，所有對本軟體的歷史貢獻資訊都會一直向外界公開。',
      openSource2:
        '每個向本 App 送交的程式碼貢獻都會經過我們的審查，以防止任何人注入任何形式的惡意程式碼。',
      contactTitle: '聯絡方式',
      contact1:
        '感謝閱讀我們的隱私條款。我們希望您能如同我們享受開發 GitPoint 的過程般，也很享受地使用它！',
      contact2: '如果您對本條款或 GitPoint 有任何問題，請將問題發送至',
      contactLink: 'GitPoint 的 repository',
    },
  },
  notifications: {
    main: {
      unread: '未讀',
      participating: '參與中',
      all: '全部',
      unreadButton: '查看未讀',
      participatingButton: '查看參與中',
      allButton: '查看全部',
      retrievingMessage: '正在取得通知',
      noneMessage: '您沒有這個類型的通知',
      markAllAsRead: '全部標記為已讀',
    },
  },
  search: {
    main: {
      repositoryButton: '版本庫',
      userButton: '使用者',
      searchingMessage: '正在搜尋 {{query}}',
      searchMessage: '搜尋任意 {{type}}',
      repository: '版本庫',
      user: '使用者',
      noUsersFound: '未找到符合條件的使用者 :(',
      noRepositoriesFound: '未找到符合條件的版本庫 :(',
    },
  },
  user: {
    profile: {
      userActions: '使用者操作',
      unfollow: '取消關注',
      follow: '關注',
    },
    repositoryList: {
      title: '版本庫',
      allReposButton: 'All',
      ownedReposButton: 'Owner',
      memberReposButton: 'Member',
      privateReposButton: 'Private',
      publicReposButton: 'Public',
    },
    starredRepositoryList: {
      title: 'Stars',
      text: 'Stars',
    },
    followers: {
      title: '追蹤者',
      text: '追蹤者',
      followsYou: '已關注您',
    },
    following: {
      title: '關注',
      text: '關注',
      followingYou: '您已關注',
    },
  },
  repository: {
    main: {
      notFoundRepo: 'Repository is not found',
      unknownLanguage: 'Unknown',
      shareRepositoryTitle: '分享 {{repoName}}',
      shareRepositoryMessage: '快來看看 GitHub上 的 {{repoName}} {{repoUrl}}',
      repoActions: '版本庫操作',
      forkAction: 'Fork',
      starAction: '加星',
      unstarAction: '取消加星',
      shareAction: '分享',
      unwatchAction: '取消關注',
      watchAction: '關注',
      ownerTitle: '擁有者',
      contributorsTitle: '貢獻者',
      noContributorsMessage: '沒有貢獻者',
      sourceTitle: '來源',
      readMe: 'README',
      viewSource: '查看程式碼',
      issuesTitle: '議題',
      noIssuesMessage: '沒有議題',
      noOpenIssuesMessage: '沒有未解決的議題',
      viewAllButton: '查看全部',
      newIssueButton: '新增議題',
      pullRequestTitle: '合併請求',
      noPullRequestsMessage: '沒有合併請求',
      noOpenPullRequestsMessage: '沒有未處理的合併請求',
      starsTitle: '星數',
      forksTitle: '分支',
      forkedFromMessage: '分岔自',
      starred: '已加星',
      watching: '關注中',
      watchers: '關注者',
      topicsTitle: 'TOPICS',
    },
    codeList: {
      title: '程式碼',
    },
    issueList: {
      title: '議題',
      openButton: '待解決',
      closedButton: '已關閉',
      searchingMessage: '正在搜尋 {{query}}',
      noOpenIssues: '沒有待解決的議題！',
      noClosedIssues: '沒有已關閉的議題！',
    },
    pullList: {
      title: '合併請求',
      openButton: '未處理',
      closedButton: '已關閉',
      searchingMessage: '正在搜尋 {{query}}',
      noOpenPulls: '沒有未處理的合併請求！',
      noClosedPulls: '沒有已關閉的合併請求！',
    },
    pullDiff: {
      title: '差異',
      numFilesChanged: '{{numFilesChanged}} 個檔案',
      new: '新增',
      deleted: '移除',
      fileRenamed: '相同檔案更名',
    },
    readMe: {
      readMeActions: 'README 操作',
      noReadMeFound: '找不到 README.md',
    },
  },
  organization: {
    main: {
      membersTitle: '成員',
      descriptionTitle: '簡介',
    },
    organizationActions: '組織操作',
  },
  issue: {
    settings: {
      title: '設定',
      pullRequestType: '合併請求',
      issueType: '議題',
      applyLabelButton: '套用標籤',
      noneMessage: '尚無',
      labelsTitle: '標籤',
      assignYourselfButton: '指派給自己',
      assigneesTitle: '被指派者',
      actionsTitle: '操作',
      unlockIssue: '解鎖 {{issueType}}',
      lockIssue: '鎖定 {{issueType}}',
      closeIssue: '關閉 {{issueType}}',
      reopenIssue: '重新開啟 {{issueType}}',
      areYouSurePrompt: '您確定嗎？',
      applyLabelTitle: '新增標籤至此議題',
    },
    comment: {
      commentActions: '評論操作',
      editCommentTitle: '編輯評論',
      editAction: '編輯',
      deleteAction: '刪除',
    },
    main: {
      assignees: '被指派者',
      mergeButton: '接受合併請求',
      noDescription: '沒有提供描述',
      lockedCommentInput: '已鎖定，但您可以繼續評論...',
      commentInput: '新增評論...',
      lockedIssue: '議題已鎖定',
      states: {
        open: '未處理',
        closed: '已關閉',
        merged: '已合併',
      },
      screenTitles: {
        issue: '議題',
        pullRequest: '合併請求',
      },
      openIssueSubTitle: '{{user}} 在 {{time}}前新增了 #{{number}}。',
      closedIssueSubTitle: '{{user}} 在 {{time}}前關閉了 #{{number}}。',
      issueActions: '議題操作',
    },
    newIssue: {
      title: '新增議題',
      missingTitleAlert: '請提供一個標題',
      issueTitle: '議題標題',
      writeATitle: '在此填入議題的標題',
      issueComment: '議題評論',
      writeAComment: '在此填入您對議題的評論',
    },
    pullMerge: {
      title: '接受合併請求',
      createMergeCommit: '建立合併提交',
      squashAndMerge: '整併與合併',
      merge: '合併',
      squash: '整併',
      missingTitleAlert: '請提供一個提交的標題',
      commitTitle: '提交標題',
      writeATitle: '載此填入您提交的標題',
      commitMessage: '提交說明',
      writeAMessage: '在此填入您提交的說明',
      mergeType: '合併類型',
      changeMergeType: '改變合併類型',
    },
  },
  common: {
    bio: '簡介',
    stars: '給星',
    orgs: '組織',
    noOrgsMessage: '沒有組織',
    info: '資訊',
    company: '公司',
    location: '地點',
    email: 'Email',
    website: '網站',
    repositories: '版本庫',
    cancel: '取消',
    yes: '是',
    ok: 'OK',
    submit: '送出',
    relativeTime: {
      lessThanXSeconds: '{{count}}s',
      xSeconds: '{{count}}秒',
      halfAMinute: '30秒',
      lessThanXMinutes: '{{count}}分',
      xMinutes: '{{count}}分',
      aboutXHours: '{{count}}時',
      xHours: '{{count}}時',
      xDays: '{{count}}日',
      aboutXMonths: '{{count}}月',
      xMonths: '{{count}}月',
      aboutXYears: '{{count}}年',
      xYears: '{{count}}年',
      overXYears: '{{count}}年',
      almostXYears: '{{count}}年',
    },
    abbreviations: {
      thousand: '千',
    },
    openInBrowser: '在瀏覽器中打開',
  },
};
