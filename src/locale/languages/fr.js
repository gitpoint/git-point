module.exports = {
  '{actor} commented on commit': '',
  '{actor} created branch {ref} at {repo}': '',
  '{actor} created tag {ref} at {repo}': '',
  '{actor} created repository {repo}': '',
  '{actor} deleted branch {ref} at {repo}': '',
  '{actor} deleted tag {ref} at {repo}': '',
  '{actor} forked {repo} at {fork}': '',
  '{actor} created the {repo} wiki': '',
  '{actor} edited the {repo} wiki': '',
  '{actor} commented on pull request {issue} at {repo}': '',
  '{actor} commented on issue {issue} at {repo}': '',
  '{actor} opened issue {issue} at {repo}': '',
  '{actor} reopened issue {issue} at {repo}': '',
  '{actor} closed issue {issue} at {repo}': '',
  '{actor} edited {member} at {repo}': '',
  '{actor} removed {member} at {repo}': '',
  '{actor} added {member} at {repo}': '',
  '{actor} made {repo} public': '',
  '{actor} opened pull request {pr} at {repo}': '',
  '{actor} reopened pull request {pr} at {repo}': '',
  '{actor} merged pull request {pr} at {repo}': '',
  '{actor} closed pull request {pr} at {repo}': '',
  '{actor} commented on pull request {pr} at {repo}': '',
  '{actor} pushed to {ref} at {repo}': '',
  '{actor} published release {id}': '',
  '{actor} starred {repo}': '{actor} a mis en favori {repo}',
  'auth.events.welcomeMessage': '',
  auth: {
    login: {
      connectingToGitHub: 'Connexion à GitHub...',
      preparingGitPoint: 'Configuration de GitPoint...',
      cancel: 'ANNULER',
      troubles: 'Problème de connexion ?',
      welcomeTitle: 'Bienvenue dans GitPoint',
      welcomeMessage:
        'Le client GitHub le plus riche en fonctionnalités tout en étant 100% gratuit',
      notificationsTitle: 'Contrôler les notifications',
      notificationsMessage:
        'Voir et contrôler toutes vos notifications de participations non lues',
      reposTitle: 'Dépôts et Utilisateurs',
      reposMessage:
        'Obtenez facilement des informations sur les dépôts, les utilisateurs et les organisations',
      issuesTitle: 'Tickets et Pull Requests',
      issuesMessage:
        'Communiquez dans les conversations, fusionnez les pull requests et plus',
      signInButton: 'CONNEXION',
    },
    networkError: 'Oops! it seems that you are not connected to the internet!',
    welcome: {
      welcomeTitle: 'Bienvenue dans GitPoint',
    },
    events: {
      welcomeMessage:
        "Bienvenue ! Ceci est votre fil d'actualité - il vous permet de vous tenir au courant des activités récentes sur les dépôts que vous surveillez et des utilisateurs que vous suivez.",
      commitCommentEvent: 'a commenté le commit',
      createEvent: 'a créé {{object}}',
      deleteEvent: 'a supprimé {{object}}',
      issueCommentEvent: '{{action}} {{type}}',
      issueEditedEvent: '{{action}} son commentaire sur {{type}}',
      issueRemovedEvent: '{{action}} son commentaire sur {{type}}',
      issuesEvent: '{{action}} ticket',
      publicEvent: {
        action: 'a rendu',
        connector: 'public',
      },
      pullRequestEvent: '{{action}} pull request',
      pullRequestReviewEvent: '{{action}} une revue de pull request',
      pullRequestReviewCommentEvent: '{{action}} la pull request',
      pullRequestReviewEditedEvent:
        '{{action}} son commentaire sur la pull request',
      pullRequestReviewDeletedEvent:
        '{{action}} son commentaire sur la pull request',
      releaseEvent: '{{action}} release /!\\',
      atConnector: 'dans',
      toConnector: 'dans',
      types: {
        pullRequest: 'pull request',
        issue: 'le ticket',
      },
      objects: {
        repository: 'le dépôt',
        branch: 'la branche',
        tag: 'le tag',
      },
      actions: {
        added: 'a ajouté',
        created: 'a créé',
        edited: 'a édité',
        deleted: 'a supprimé',
        assigned: 'a assigné',
        unassigned: 'a désassigné',
        labeled: "a ajouté l'étiquette",
        unlabeled: "a supprimé l'étiquette",
        opened: 'a ouvert',
        milestoned: 'milestoned',
        demilestoned: 'demilestoned',
        closed: 'a fermé',
        reopened: 'a réouvert',
        review_requested: 'a demandé une revue',
        review_request_removed: 'a supprimé la demande de revue',
        submitted: 'a validé',
        dismissed: 'a annulé',
        published: 'a publié',
        publicized: 'a rendu public',
        privatized: 'a rendu privé',
        starred: 'a mis en favori',
        pushedTo: 'a poussé dans',
        forked: 'a forké',
        commented: 'a commenté',
        removed: 'a enlevé',
      },
    },
    profile: {
      orgsRequestApprovalTop: 'Vous ne voyez pas toutes vos organisations ?',
      orgsRequestApprovalBottom:
        'Vous devez peut être demander une accréditation pour celles-ci.',
      codePushCheck: 'Vérifiez les mises à jour',
      codePushChecking: 'Recherche de mises à jour...',
      codePushUpdated: "L'application est à jour",
      codePushAvailable: 'Une mise à jour est disponible !',
      codePushNotApplicable: 'Non applicable en mode débogage',
    },
    userOptions: {
      donate: 'Faire un don',
      title: 'Options',
      language: 'Langue',
      privacyPolicy: 'Politique de confidentialité',
      signOut: 'Déconnexion',
    },
    privacyPolicy: {
      title: 'Politique de confidentialité',
      effectiveDate: 'Dernière mise à jour : 15 Juillet 2017',
      introduction:
        "Nous sommes ravis que vous ayez décidé d'utiliser GitPoint. Cette politique de confidentialité est là pour vous informer de ce que nous faisons - et ne faisons pas - de vos données utilisateur.",
      userDataTitle: 'DONNÉES UTILISATEUR',
      userData1:
        "Nous ne faisons rien de vos informations GitHub. Après authentification, le jeton OAuth de l'utilisateur est enregistré directement sur le stockage de l'appareil. Il nous est impossible de récupérer cette information. Nous ne lisons jamais le jeton d'accès utilisateur, ni le stockons d'une quelconque manière.",
      userData2:
        "Cela signifique que jamais, nous ne lisons, utilisons, ou partageons d'une quelconque manière les données GitHub de l'utilisateur. Si des données privées venaient à un moment donné à être visibles, nous ne les enregistrerons et regarderons pas. Si jamais cela venait à se faire par accident, nous les supprimerons immédiatement en utilisant une méthode de suppression sécurisée. Encore une fois, nous avons mis en place l'authentification de manière à ce que cela n'arrive jamais.",
      analyticsInfoTitle: 'INFORMATIONS ANALYTIQUES',
      analyticsInfo1:
        "Nous utilisons actuellement Google Analytics et iTunes App Analytics pour mesurer le trafic et les tendances d'utilisation de GitPoint. Ces outils collectent les informations envoyées par votre appareil, dont la version de l'appareil et de son système d'exploitation, votre position et votre référent. Ces informations ne peuvent être utilisées pour vous identifier de manière nominative et aucune donnée personnelle n'est extraite.",
      analyticsInfo2:
        "Si jamais nous venions à inclure un autre service de collecte de suivi de pile, journaux d'erreurs ou d'autres informations analytiques, nous nous assurerons que les données utilisateurs restent anonymes et chiffrées.",
      openSourceTitle: 'OPEN SOURCE',
      openSource1:
        "GitPoint est open source et l'historique des contributions à la plateforme restera toujours visible de manière publique.",
      openSource2:
        "A chaque contribution reçue pour la plateforme, une revue de code est toujours effectuée afin d'empêcher quiconque de glisser un code malveillant de tout type.",
      contactTitle: 'CONTACT',
      contact1:
        "Merci d'avoir pris le temps de lire notre politique de confidentialité. Nous espérons que vous apprécierez l'utilisation de GitPoint autant que nous avons apprécié son développement.",
      contact2:
        'Si vous avez des questions en rapport avec cette politique de confidentialité ou GitPoint en général, merci de soumettre un ticket sur le',
      contactLink: 'dépôt GitPoint',
    },
  },
  notifications: {
    main: {
      unread: 'non lus',
      participating: 'participant',
      all: 'tous',
      unreadButton: 'Non lus',
      participatingButton: 'Participant',
      allButton: 'Tous',
      retrievingMessage: 'Récupération des notifications',
      noneMessage: "Vous n'avez aucune notification de ce type",
      markAllAsRead: 'Marquer tous comme lus',
    },
  },
  search: {
    main: {
      repositoryButton: 'Dépôts',
      userButton: 'Utilisateurs',
      searchingMessage: 'Recherche de {{query}}',
      searchMessage: 'Recherche de tout {{type}}',
      repository: 'dépôt',
      user: 'utilisateur',
      noUsersFound: 'Aucun utilisateur trouvé :(',
      noRepositoriesFound: 'Aucun dépôt trouvé :(',
    },
  },
  user: {
    profile: {
      userActions: 'Actions utilisateur',
      unfollow: 'Ne plus suivre',
      follow: 'Suivre',
    },
    repositoryList: {
      title: 'Dépôts',
    },
    starredRepositoryList: {
      title: 'Favoris',
      text: 'Favoris',
    },
    followers: {
      title: 'Followers',
      text: 'Followers',
      followsYou: 'Vous suit',
    },
    following: {
      title: 'Following',
      text: 'Following',
      followingYou: 'Following',
    },
  },
  repository: {
    main: {
      notFoundRepo: 'Repository is not found',
      unknownLanguage: 'Unknown',
      shareRepositoryTitle: 'Partager {{repoName}}',
      shareRepositoryMessage: 'Découvre {{repoName}} sur GitHub. {{repoUrl}}',
      repoActions: 'Actions sur le dépôt',
      forkAction: 'Forker',
      starAction: 'Ajouter au favoris',
      unstarAction: 'Supprimer des favoris',
      shareAction: 'Partager',
      unwatchAction: 'Ne plus surveiller',
      watchAction: 'Surveiller',
      ownerTitle: 'PROPRIÉTAIRE',
      contributorsTitle: 'CONTRIBUTEURS',
      noContributorsMessage: 'Aucun contributeur trouvé',
      sourceTitle: 'SOURCE',
      readMe: 'README',
      viewSource: 'Voir le code',
      issuesTitle: 'TICKETS',
      noIssuesMessage: 'Aucun ticket',
      noOpenIssuesMessage: 'Aucun ticket ouvert',
      viewAllButton: 'Voir tous',
      newIssueButton: 'Nouveau ticket',
      pullRequestTitle: 'PULL REQUESTS',
      noPullRequestsMessage: 'Aucune pull request',
      noOpenPullRequestsMessage: 'Aucune pull request ouverte',
      starsTitle: 'Favoris',
      forksTitle: 'Forks',
      forkedFromMessage: 'forké depuis',
      topicsTitle: 'TOPICS',
      starred: 'Favoris',
      watching: 'Abonné',
      watchers: 'Abonnés',
    },
    codeList: {
      title: 'Code',
    },
    issueList: {
      title: 'Tickets',
      openButton: 'Ouverts',
      closedButton: 'Fermés',
      searchingMessage: 'Recherche de {{query}}',
      noOpenIssues: 'Aucun ticket ouvert trouvé !',
      noClosedIssues: 'Aucun ticket fermé trouvé !',
    },
    pullList: {
      title: 'Pull Requests',
      openButton: 'Ouvert',
      closedButton: 'Fermé',
      searchingMessage: 'Recherche de {{query}}',
      noOpenPulls: 'Aucune pull request ouvert trouvé !',
      noClosedPulls: 'Aucune pull request fermé trouvé !',
    },
    pullDiff: {
      title: 'Diff',
      numFilesChanged: '{{numFilesChanged}} fichiers',
      new: 'NOUVEAU',
      deleted: 'SUPPRIMÉ',
      fileRenamed: 'Fichier renommé sans aucune modification',
    },
    readMe: {
      readMeActions: 'Actions sur le README',
      noReadMeFound: 'Pas de README.md trouvé',
    },
  },
  organization: {
    main: {
      membersTitle: 'MEMBRES',
      descriptionTitle: 'DESCRIPTION',
    },
    organizationActions: "Actions sur l'organisation",
  },
  issue: {
    settings: {
      title: 'Réglages',
      pullRequestType: 'Pull Request',
      issueType: 'Ticket',
      applyLabelButton: 'Appliquer le libellé',
      noneMessage: 'Aucun pour le moment',
      labelsTitle: 'LIBELLÉS',
      assignYourselfButton: "S'assigner",
      assigneesTitle: 'ASSIGNÉS',
      actionsTitle: 'ACTIONS',
      unlockIssue: 'Déverrouiller {{issueType}}',
      lockIssue: 'Verrouiller {{issueType}}',
      closeIssue: 'Fermer {{issueType}}',
      reopenIssue: 'Réouvrir {{issueType}}',
      areYouSurePrompt: 'Êtes-vous certain ?',
      applyLabelTitle: 'Appliquer un libellé à ce ticket',
    },
    comment: {
      commentActions: 'Actions sur le commentaire',
      editCommentTitle: 'Editer le commentaire',
      editAction: 'Editer',
      deleteAction: 'Supprimer',
    },
    main: {
      assignees: 'Assignés',
      mergeButton: 'Fusionner la pull request',
      noDescription: 'Aucune description fournie.',
      lockedCommentInput: 'Verrouillé, mais vous pouvez encore commenter...',
      commentInput: 'Ajouter un commentaire...',
      lockedIssue: 'Ce ticket est verrouillé',
      states: {
        open: 'Ouvert',
        closed: 'Fermé',
        merged: 'Fusionné',
      },
      screenTitles: {
        issue: 'Ticket',
        pullRequest: 'Pull Request',
      },
      openIssueSubTitle: '#{{number}} ouvert il y a {{time}} par {{user}}',
      closedIssueSubTitle: '#{{number}} par {{user}} fermé il y a {{time}}',
      issueActions: 'Issue Actions',
    },
    newIssue: {
      title: 'Nouveau ticket',
      missingTitleAlert: 'Vous devez fournir un titre pour le ticket !',
      issueTitle: 'Titre du ticket',
      writeATitle: 'Écrivez le titre du ticket ici',
      issueComment: 'Commentaire du ticket',
      writeAComment: 'Écrivez un commentaire pour votre ticket ici',
    },
    pullMerge: {
      title: 'Fusionner la pull request',
      createMergeCommit: 'Créer un commit de fusion',
      squashAndMerge: 'Squasher et fusionner',
      merge: 'fusionner',
      squash: 'squasher',
      missingTitleAlert: 'Vous devez fournir un titre de commit !',
      commitTitle: 'Titre de commit',
      writeATitle: 'Écrivez un titre de commit ici',
      commitMessage: 'Message de commit',
      writeAMessage: 'Écrivez un message pour votre commit ici',
      mergeType: 'Type de fusion',
      changeMergeType: 'Changer le type de fusion',
    },
  },
  common: {
    bio: 'BIO',
    stars: 'Favoris',
    orgs: 'ORGANISATIONS',
    noOrgsMessage: 'Aucune organisation',
    info: 'INFO',
    company: 'Société',
    location: 'Emplacement',
    email: 'Email',
    website: 'Site web',
    repositories: 'Dépôts',
    cancel: 'Annuler',
    yes: 'Oui',
    ok: 'OK',
    submit: 'Envoyer',
    relativeTime: {
      lessThanXSeconds: '{{count}}s',
      xSeconds: '{{count}}s',
      halfAMinute: '30s',
      lessThanXMinutes: '{{count}}m',
      xMinutes: '{{count}}m',
      aboutXHours: '{{count}}h',
      xHours: '{{count}}h',
      xDays: '{{count}}j',
      aboutXMonths: '{{count}}mo',
      xMonths: '{{count}}mo',
      aboutXYears: '{{count}}a',
      xYears: '{{count}}a',
      overXYears: '{{count}}a',
      almostXYears: '{{count}}a',
    },
    abbreviations: {
      thousand: 'k',
    },
    openInBrowser: 'Ouvrir dans le navigateur',
  },
};
