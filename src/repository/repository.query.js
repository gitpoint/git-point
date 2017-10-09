export const issuesQuery = (owner, name) => {
  return `query {
    repository(owner: "${owner}", name: "${name}") {
      issues(first: 100, states: [OPEN, CLOSED], orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          state
          title
          createdAt
          lastEditedAt
          number
          locked
          repository {
            nameWithOwner
          }
          author {
            login
          }
          comments(first: 0) {
            totalCount
          }
        }
      }
    }
  }`;
};

export const pullRequestsQuery = (owner, name) => {
  return `query {
    repository(owner: "${owner}", name: "${name}") {
      pullRequests(first: 100, states: [OPEN, CLOSED, MERGED], orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          state
          title
          createdAt
          lastEditedAt
          number
          locked
          repository {
            nameWithOwner
          }
          author {
            login
          }
          comments(first: 0) {
            totalCount
          }
        }
      }
    }
  }`;
};
