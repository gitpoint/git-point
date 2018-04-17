export const repoQuery = `fragment IssuesList on IssueEdge {
  node {
    state
    title
    number
    createdAt
    closedAt
    resourcePath
    author {
      login
    }
    comments {
      totalCount
    }
  }
}

fragment PullRequestsList on PullRequestEdge {
  node {
    state
    title
    number
    createdAt
    closedAt
    resourcePath
    author {
      login
    }
    comments {
      totalCount
    }
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
      edges {
        node {
          name
          color
        }
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
    watchers(first: 10) {
      totalCount
    }
    viewerSubscription
    forkCount
    description
    repositoryTopics(first: 10) {
      edges {
        node {
          topic {
            name
          }
        }
      }
    }
    openIssues: issues(first: 3, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      edges {
        ...IssuesList
      }
    }
    openPullRequests: pullRequests(first: 3, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      edges {
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
    }
    issues: issues(first: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      edges {
        ...IssuesList
      }
    }
    pullRequests: pullRequests(first: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      edges {
        ...PullRequestsList
      }
    }
  }
}

`;
