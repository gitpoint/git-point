export const tr = {
  auth: {
    login: {
      welcomeTitle: 'GitPoint\'e Hoşgeldiniz',
      welcomeMessage: 'En zengin özelliklere sahip GitHub client\'ı ve 100% ücretsiz',
      notificationsTitle: 'Bildirimleri Kontrol Et',
      notificationsMessage:
        'Okunmamış ve katılımcı olduğunuz bildirimlerinizin tümünü görüntüleyin ve kontrol edin',
      reposTitle: 'Repository\'ler ve Kullanıcılar',
      reposMessage:
        'Repository\'leri, kullanıcıları ve organizasyon bilgilerini kolayca edinin',
      issuesTitle: 'Issue\'lar ve Pull Request\'ler',
      issuesMessage:
        'Sohbet ederek iletişim kurun, pull request\'leri merge edin ve daha fazlası',
      signInButton: 'GİRİŞ YAP',
    },
    welcome: {
      welcomeTitle: 'GitPoint\'e Hoşgeldiniz',
    },
    events: {
      welcomeMessage:
        'Hoşgeldiniz! Bu, haber kaynağınızdır - izlediğiniz repository\'lerde ve takip ettiğiniz kişilerle ilgili son etkinlikleri takip etmenize yardımcı olur.',
      commitCommentEvent: 'commit\'e yorum yapıldı',
      createEvent: '{{object}} oluşturuldu',
      deleteEvent: '{{object}} silindi',
      issueCommentEvent: '{{type}} {{action}}',
      issueEditedEvent: '{{type}}\'daki yorum {{action}}',
      issueRemovedEvent: '{{type}}\'den yorum {{action}}',
      issuesEvent: '{{action}} issue',
      publicEvent: {
        action: 'made',
        connector: 'public',
      },
      pullRequestEvent: 'pull request {{action}}',
      pullRequestReviewEvent: 'pull request incelemesi {{action}}',
      pullRequestReviewCommentEvent: 'pull request\'e {{action}}',
      pullRequestReviewEditedEvent: 'pull request\'deki yorum {{action}}',
      pullRequestReviewDeletedEvent: 'pull request\'deki yorum {{action}}',
      releaseEvent: 'release {{action}}',
      atConnector: 'de',
      toConnector: 'dan',
      types: {
        pullRequest: 'pull request',
        issue: 'issue',
      },
      objects: {
        repository: 'repository',
        branch: 'dal',
        tag: 'etiket',
      },
      actions: {
        added: 'eklendi',
        created: 'oluşturuldu',
        edited: 'düzenlendi',
        deleted: 'silindi',
        assigned: 'atandı',
        unassigned: 'atanmadı',
        labeled: 'etiketli',
        unlabeled: 'etiketsiz',
        opened: 'açıldı',
        milestoned: 'milestoned',
        demilestoned: 'demilestoned',
        closed: 'kapandı',
        reopened: 'yeniden açıldı',
        review_requested: 'inceleme istendi',
        review_request_removed: 'inceleme isteği silindi',
        submitted: 'gönderildi',
        dismissed: 'reddedildi',
        published: 'yayımlandı',
        publicized: 'Halka açıldı',
        privatized: 'Özel yapıldı',
        starred: 'yıldızlı',
        pushedTo: '\'a push edildi',
        forked: 'fork edildi',
        commented: 'yorum yaptı',
        removed: 'silindi',
      },
    },
    profile: {
      orgsRequestApprovalTop: 'Tüm organizasyonlarınızı göremiyor musunuz?',
      orgsRequestApprovalBottom: 'Onlar için onay istemeniz gerekebilir',
      codePushCheck: 'Güncellemeleri kontrol et',
      codePushChecking: 'Güncellemeler kontrol ediliyor...',
      codePushUpdated: 'Uygulama güncel',
      codePushAvailable: 'Güncelleme mevcut!',
      codePushNotApplicable: 'Hata ayıklama modunda uygulanamaz',
    },
    userOptions: {
      title: 'Ayarlar',
      language: 'Dil',
      privacyPolicy: 'Gizlilik Politikası',
      signOut: 'Çıkış Yap',
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      effectiveDate: 'Last updated: July 15, 2017',
      introduction:
        'We\'re glad you decided to use GitPoint. This Privacy Policy is here to inform you about what we do — and do not do — with our user\'s data.',
      userDataTitle: 'USER DATA',
      userData1:
        'We do not do anything with your GitHub information. After authenticating, the user\'s OAuth token is persisted directly on their device storage. It is not possible for us to retrieve that information. We never view a user\'s access token nor store it whatsoever.',
      userData2:
        'This means that in no way, shape or form do we ever view, use or share a user\'s GitHub data. If private data ever becomes visible at any point we will not record or view it. If it happens to be accidentally recorded, we will delete it immediately using secure erase methods. Again, we\'ve set up authentication specifically so that this never happens.',
      analyticsInfoTitle: 'ANALYTICS INFORMATION',
      analyticsInfo1:
        'We currently use Google Analytics and iTunes App Analytics to help us measure traffic and usage trends for the GitPoint. These tools collect information sent by your device including device and platform version, region and referrer. This information cannot reasonably be used to identify any particular individual user and no personal information is extracted.',
      analyticsInfo2:
        'If we happen to include another third party platform to collect stack traces, error logs or more analytics information, we\'ll make sure that user data remains anonymized and encrypted.',
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
      unread: 'okunmamış',
      participating: 'katılımcı',
      all: 'tümü',
      unreadButton: 'Okunmamış',
      participatingButton: 'Katılımda',
      allButton: 'Tümü',
      retrievingMessage: 'Bildirim alınıyor',
      noneMessage: 'Bu türde hiçbir bildirime sahip değilsiniz',
    },
  },
  search: {
    main: {
      repositoryButton: 'Repository\'ler',
      userButton: 'Kullanıcılar',
      searchingMessage: '{{query}} aranıyor',
      searchMessage: 'Herhangi bir {{type}} ara',
      repository: 'repository',
      user: 'kullanıcı',
    },
  },
  user: {
    profile: {
      userActions: 'Kullanıcı Hareketleri',
      unfollow: 'Takibi bırak',
      follow: 'Takip et',
    },
    repositoryList: {
      title: 'Repository\'ler',
    },
    followerList: {
      title: 'Takipçiler',
    },
    followingList: {
      title: 'Takip',
    },
    followYou: {
      title: 'Seni takip ediyor',
    },
  },
  repository: {
    main: {
      shareRepositoryTitle: 'Paylaş {{repoName}}',
      shareRepositoryMessage: 'GitHub\'daki {{repoName}}\'i kontrol edin. {{repoUrl}}',
      repoActions: 'Repository Hareketleri',
      forkAction: 'Fork',
      starAction: 'Star',
      unstarAction: 'Unstar',
      shareAction: 'Paylaş',
      unwatchAction: 'İzleme',
      watchAction: 'İzle',
      ownerTitle: 'SAHİBİ',
      contributorsTitle: 'KATKIDA BULUNANLAR',
      noContributorsMessage: 'katkıda bulunan bulunamadı',
      sourceTitle: 'KAYNAK',
      readMe: 'BENİ OKU',
      viewSource: 'View Code',
      issuesTitle: 'ISSUE\'LER',
      noIssuesMessage: 'issue yok',
      noOpenIssuesMessage: 'Açık issue yok',
      viewAllButton: 'Tümünü Göster',
      newIssueButton: 'Yeni Issue',
      pullRequestTitle: 'PULL REQUEST\'LER',
      noPullRequestsMessage: 'Pull request Yok',
      noOpenPullRequestsMessage: 'Açık pull request\'ler',
      starsTitle: 'Stars',
      forksTitle: 'Forks',
      forkedFromMessage: 'buradan fork edildi:',
      starred: 'Starred',
      watching: 'İzleniyor',
    },
    codeList: {
      title: 'Code',
    },
    issueList: {
      title: 'Issue\'ler',
      openButton: 'Açık',
      closedButton: 'Kapalı',
      searchingMessage: '{{query}} aranıyor',
      noOpenIssues: 'Açık issue bulunamadı!',
      noClosedIssues: 'Kapalı issue bulunamadı!',
    },
    pullList: {
      title: 'Pull Request\'ler',
      openButton: 'Açık',
      closedButton: 'Kapalı',
      searchingMessage: '{{query}} aranıyor',
      noOpenPulls: 'Açık pull request bulunamadı!',
      noClosedPulls: 'Kapalı pull request bulunamadı!',
    },
    pullDiff: {
      title: 'Farklar',
      numFilesChanged: '{{numFilesChanged}} dosya',
      new: 'YENİ',
      deleted: 'SİLİNDİ',
      fileRenamed: 'Dosya herhangi bir değişiklik yapılmaksızın yeniden adlandırıldı',
    },
  },
  organization: {
    main: {
      membersTitle: 'ÜYELER',
      descriptionTitle: 'AÇIKLAMA',
    },
  },
  issue: {
    settings: {
      title: 'Ayarlar',
      pullRequestType: 'Pull Request',
      issueType: 'Issue',
      applyLabelButton: 'Etiketi Uygula',
      noneMessage: 'Henüz yok',
      labelsTitle: 'ETİKETLER',
      assignYourselfButton: 'Kendini Ata',
      assigneesTitle: 'ATANANLAR',
      actionsTitle: 'HAREKETLER',
      unlockIssue: 'Kilidini aç {{issueType}}',
      lockIssue: 'Kilitle {{issueType}}',
      closeIssue: 'Kapat {{issueType}}',
      reopenIssue: 'Yeniden aç {{issueType}}',
      areYouSurePrompt: 'Emin misiniz?',
      applyLabelTitle: 'Bu issue\'ya bir etiket uygulayın',
    },
    main: {
      assignees: 'Atananlar',
      mergeButton: 'Merge Pull Request',
      noDescription: 'Açıklama sağlanmadı.',
      lockedCommentInput: 'Kilitli, ancak yine de yorum yapabilirsiniz...',
      commentInput: 'Yorum ekle...',
      commentButton: 'Ekle',
      lockedIssue: 'Issue kilitli',
      states: {
        open: 'Açık',
        closed: 'Kapalı',
        merged: 'Merged',
      },
      screenTitles: {
        issue: 'Issue',
        pullRequest: 'Pull Request',
      },
    },
    newIssue: {
      title: 'Yeni Issue',
      missingTitleAlert: 'Bir konu başlığı gerekiyor!',
      issueTitle: 'Issue Başlığı',
      writeATitle: 'Buraya issue için bir başlık yazınız',
      issueComment: 'Issue Yorumu',
      writeAComment: 'Buraya issue için bir yorum yazınız',
    },
    pullMerge: {
      title: 'Merge Pull Request',
      createMergeCommit: 'Create a merge commit',
      squashAndMerge: 'Squash and merge',
      merge: 'merge',
      squash: 'squash',
      missingTitleAlert: 'Bir commit başlığı girmelisiniz!',
      commitTitle: 'Commit Title',
      writeATitle: 'Buraya commit için bir başlık yazınız',
      commitMessage: 'Commit Message',
      writeAMessage: 'Buraya commit için bir mesaj yazınız',
      mergeType: 'Merge Type',
      changeMergeType: 'Merge Tipini Seçiniz',
    },
  },
  common: {
    bio: 'Biyografi',
    stars: 'Stars',
    orgs: 'ORGANİZASYONLAR',
    noOrgsMessage: 'Organizasyon yok',
    info: 'BİLGİ',
    company: 'Şirket',
    location: 'Konum',
    email: 'Email',
    website: 'Website',
    repositories: 'Repository\'ler',
    followers: 'Takipçiler',
    following: 'Takip',
    cancel: 'Vazgeç',
    yes: 'Evet',
    ok: 'TAMAM',
    submit: 'Gönder',
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
