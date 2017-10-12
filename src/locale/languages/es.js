// Hash: 01ae4880b9b4296907d680e9b909713c36c42491
// Link: https://github.com/gitpoint/git-point/pull/260

export const erase = {
  auth: {
    login: {
      welcomeTitle: 'Bienvenido a GitPoint',
      welcomeMessage:
        'El cliente GitHub más rico en funciones que es 100% gratuito',
      notificationsTitle: 'Control notifications',
      notificationsMessage:
        'View and control all of your unread and participating notifications',
      reposTitle: 'Repositorios y Usuarios',
      reposMessage:
        'Easily obtain repository, user and organization information',
      issuesTitle: 'Issues y Pull Requests',
      issuesMessage:
        'Communicate on conversations, merge pull requests and more',
      signInButton: 'SIGN IN',
    },
    welcome: {
      welcomeTitle: 'Bienvenido a GitPoint',
    },
    events: {
      welcomeMessage:
        "Welcome! This is your news feed - it'll help you keep up with recent activity on repositories you watch and people you follow.",
      commitCommentEvent: 'commented on commit',
      createEvent: 'creado {{object}}',
      deleteEvent: 'borrado {{object}}',
      issueCommentEvent: '{{action}} en {{type}}',
      issueEditedEvent: '{{action}} tu comentario en {{type}}',
      issueRemovedEvent: '{{action}} to comentario en {{type}}',
      issuesEvent: '{{action}} issue',
      publicEvent: {
        action: 'hizo',
        connector: 'publico',
      },
      pullRequestEvent: '{{action}} pull request',
      pullRequestReviewEvent: '{{action}} pull request review',
      pullRequestReviewCommentEvent: '{{action}} on pull request',
      pullRequestReviewEditedEvent: '{{action}} their comment on pull request',
      pullRequestReviewDeletedEvent: '{{action}} their comment on pull request',
      releaseEvent: '{{action}} release',
      atConnector: 'at',
      toConnector: 'at',
      types: {
        pullRequest: 'pull request',
        issue: 'issue',
      },
      objects: {
        repository: 'repositorio',
        branch: 'branch',
        tag: 'tag',
      },
      actions: {
        added: 'agregó',
        created: 'creó',
        edited: 'editó',
        deleted: 'borró',
        assigned: 'assigned',
        unassigned: 'unassigned',
        labeled: 'labeled',
        unlabeled: 'unlabeled',
        opened: 'abrió',
        milestoned: 'milestoned',
        demilestoned: 'demilestoned',
        closed: 'closed',
        reopened: 'reopened',
        review_requested: 'review requested',
        review_request_removed: 'review request removed',
        submitted: 'submitted',
        dismissed: 'dismissed',
        published: 'published',
        publicized: 'publicized',
        privatized: 'privatized',
        starred: 'starred',
        pushedTo: 'pushed to',
        forked: 'forked',
        commented: 'commented',
        removed: 'removed',
      },
    },
    profile: {
      orgsRequestApprovalTop: 'No puedes ver todas tus organizaciones?',
      orgsRequestApprovalBottom: 'You may have to request approval for them.',
      codePushCheck: 'Check for update',
      codePushChecking: 'Checking for update...',
      codePushUpdated: 'App is up to date',
      codePushAvailable: 'Update is available!',
      codePushNotApplicable: 'Not applicable in debug mode',
    },
    userOptions: {
      title: 'Opciones',
      language: 'Lenguaje',
      privacyPolicy: 'Política de privacidad',
      signOut: 'Sign Out',
    },
    privacyPolicy: {
      title: 'Política de Privacidad',
      effectiveDate: 'Last updated: July 15, 2017',
      introduction:
        "We're glad you decided to use GitPoint. This Privacy Policy is here to inform you about what we do — and do not do — with our user's data.",
      userDataTitle: 'USER DATA',
      userData1:
        "We do not do anything with your GitHub information. After authenticating, the user's OAuth token is persisted directly on their device storage. It is not possible for us to retrieve that information. We never view a user's access token nor store it whatsoever.",
      userData2:
        "This means that in no way, shape or form do we ever view, use or share a user's GitHub data. If private data ever becomes visible at any point we will not record or view it. If it happens to be accidentally recorded, we will delete it immediately using secure erase methods. Again, we've set up authentication specifically so that this never happens.",
      analyticsInfoTitle: 'ANALYTICS INFORMATION',
      analyticsInfo1:
        'We currently use Google Analytics and iTunes App Analytics to help us measure traffic and usage trends for the GitPoint. These tools collect information sent by your device including device and platform version, region and referrer. This information cannot reasonably be used to identify any particular individual user and no personal information is extracted.',
      analyticsInfo2:
        "If we happen to include another third party platform to collect stack traces, error logs or more analytics information, we'll make sure that user data remains anonymized and encrypted.",
      openSourceTitle: 'OPEN SOURCE',
      openSource1:
        'GitPoint is open source and the history of contributions to the platform will always be visible to the public.',
      openSource2:
        'With each contribution to the app, code review is always performed to prevent anybody from including malicious code of any kind.',
      contactTitle: 'CONTACT',
      contact1:
        'Thank you for reading our Privacy Policy. We hope you enjoy using GitPoint as much as we enjoyed building it.',
      contact2:
        'If you have any questions about this Privacy Policy or GitPoint in general, please file an issue in the',
      contactLink: 'GitPoint repository',
    },
  },
  notifications: {
    main: {
      unread: 'unread',
      participating: 'participating',
      all: 'all',
      unreadButton: 'Unread',
      participatingButton: 'Participating',
      allButton: 'All',
      retrievingMessage: 'Retrieving notifications',
      noneMessage: "You don't have any notifications of this type",
    },
  },
  search: {
    main: {
      repositoryButton: 'Repositories',
      userButton: 'Users',
      searchingMessage: 'Searching for {{query}}',
      searchMessage: 'Search for any {{type}}',
      repository: 'repository',
      user: 'user',
    },
  },
  user: {
    profile: {
      userActions: 'User Actions',
      unfollow: 'Unfollow',
      follow: 'Follow',
    },
    repositoryList: {
      title: 'Repositories',
    },
    followerList: {
      title: 'Followers',
    },
    followingList: {
      title: 'Following',
    },
    followYou: {
      title: 'Follows you',
    },
  },
  repository: {
    main: {
      shareRepositoryTitle: 'Share {{repoName}}',
      shareRepositoryMessage: 'Check out {{repoName}} on GitHub. {{repoUrl}}',
      repoActions: 'Repository Actions',
      forkAction: 'Fork',
      starAction: 'Star',
      unstarAction: 'Unstar',
      shareAction: 'Share',
      unwatchAction: 'Unwatch',
      watchAction: 'Watch',
      ownerTitle: 'OWNER',
      contributorsTitle: 'CONTRIBUTORS',
      noContributorsMessage: 'No contributors found',
      sourceTitle: 'SOURCE',
      readMe: 'README',
      viewSource: 'View Code',
      issuesTitle: 'ISSUES',
      noIssuesMessage: 'No issues',
      noOpenIssuesMessage: 'No open issues',
      viewAllButton: 'View All',
      newIssueButton: 'New Issue',
      pullRequestTitle: 'PULL REQUESTS',
      noPullRequestsMessage: 'No pull requests',
      noOpenPullRequestsMessage: 'No open pull requests',
      starsTitle: 'Stars',
      forksTitle: 'Forks',
      forkedFromMessage: 'forked from',
      starred: 'Starred',
      watching: 'Watching',
    },
    codeList: {
      title: 'Code',
    },
    issueList: {
      title: 'Issues',
      openButton: 'Open',
      closedButton: 'Closed',
      searchingMessage: 'Searching for {{query}}',
      noOpenIssues: 'No open issues found!',
      noClosedIssues: 'No closed issues found!',
    },
    pullList: {
      title: 'Pull Requests',
      openButton: 'Open',
      closedButton: 'Closed',
      searchingMessage: 'Searching for {{query}}',
      noOpenPulls: 'No open pull requests found!',
      noClosedPulls: 'No closed pull requests found!',
    },
    pullDiff: {
      title: 'Diff',
      numFilesChanged: '{{numFilesChanged}} files',
      new: 'NEW',
      deleted: 'DELETED',
      fileRenamed: 'File renamed without any changes',
    },
    readMe: {
      readMeActions: 'Acciones README',
      noReadMeFound: 'No se ha encontrado README.md',
    },
  },
  organization: {
    main: {
      membersTitle: 'MEMBERS',
      descriptionTitle: 'DESCRIPTION',
    },
  },
  issue: {
    settings: {
      title: 'Settings',
      pullRequestType: 'Pull Request',
      issueType: 'Issue',
      applyLabelButton: 'Apply Label',
      noneMessage: 'None yet',
      labelsTitle: 'LABELS',
      assignYourselfButton: 'Assign Yourself',
      assigneesTitle: 'ASSIGNEES',
      actionsTitle: 'ACTIONS',
      unlockIssue: 'Unlock {{issueType}}',
      lockIssue: 'Lock {{issueType}}',
      closeIssue: 'Close {{issueType}}',
      reopenIssue: 'Reopen {{issueType}}',
      areYouSurePrompt: 'Are you sure?',
      applyLabelTitle: 'Apply a label to this issue',
    },
    main: {
      assignees: 'Assignees',
      mergeButton: 'Merge Pull Request',
      noDescription: 'No description provided.',
      lockedCommentInput: 'Locked, but you can still comment...',
      commentInput: 'Add a comment...',
      commentButton: 'Post',
      lockedIssue: 'Issue is locked',
      states: {
        open: 'Open',
        closed: 'Closed',
        merged: 'Merged',
      },
      screenTitles: {
        issue: 'Issue',
        pullRequest: 'Pull Request',
      },
    },
    newIssue: {
      title: 'New Issue',
      missingTitleAlert: 'You need to have an issue title!',
      issueTitle: 'Issue Title',
      writeATitle: 'Write a title for your issue here',
      issueComment: 'Issue Comment',
      writeAComment: 'Write a comment for your issue here',
    },
    pullMerge: {
      title: 'Merge Pull Request',
      createMergeCommit: 'Create a merge commit',
      squashAndMerge: 'Squash and merge',
      merge: 'merge',
      squash: 'squash',
      missingTitleAlert: 'You need to have a commit title!',
      commitTitle: 'Commit Title',
      writeATitle: 'Write a title for your commit here',
      commitMessage: 'Commit Message',
      writeAMessage: 'Write a message for your commit here',
      mergeType: 'Merge Type',
      changeMergeType: 'Change Merge Type',
    },
  },
  common: {
    bio: 'BIO',
    stars: 'Stars',
    orgs: 'ORGANIZATIONS',
    noOrgsMessage: 'No organizations',
    info: 'INFO',
    company: 'Company',
    location: 'Location',
    email: 'Email',
    website: 'Website',
    repositories: 'Repositories',
    followers: 'Followers',
    following: 'Following',
    cancel: 'Cancel',
    yes: 'Yes',
    ok: 'OK',
    submit: 'Submit',
    relativeTime: {
      past: '%s',
      s: '%ds',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dd',
      dd: '%dd',
      M: '%dmo',
      MM: '%dmo',
      y: '%dy',
      yy: '%dy',
    },
  },
};
