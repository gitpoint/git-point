export const repoQuery = `fragment IssuesList on Issue {
  state
  title
  number
  createdAt
  closedAt
  author {
    login
  }
  comments {
    totalCount
  }
}

fragment PullRequestsList on PullRequest {
  state
  title
  number
  createdAt
  closedAt
  author {
    login
  }
  comments {
    totalCount
  }
}

query ($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    url
    name
    nameWithOwner
    isFork
    parent {
      nameWithOwner
      url
    }
    defaultBranchRef {
      name
    }
    primaryLanguage {
      name
      color
    }
    languages(first: 20, orderBy: {field: SIZE, direction: DESC}) {
      totalCount
      nodes {
        name
        color
      }
    }
    README: object(expression: "HEAD:README.md") {
      ... on Blob {
        id
      }
    }
    stargazers {
      totalCount
    }
    viewerHasStarred
    watchers(first: 1) {
      totalCount
    }
    viewerSubscription
    forkCount
    description
    repositoryTopics(first: 10) {
      totalCount
      nodes {
        topic {
          name
        }
      }
    }
    openIssuesPreview: issues(first: 3, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      nodes {
        ...IssuesList
      }
    }
    openPullRequestsPreview: pullRequests(first: 3, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      nodes {
        ...PullRequestsList
      }
    }
    hasIssuesEnabled
    pullRequestsCount: pullRequests {
      totalCount
    }
    issuesCount: issues {
      totalCount
    }
    owner {
      login
      avatarUrl
      type: __typename
    }
    viewerPermission
  }
}

`;
