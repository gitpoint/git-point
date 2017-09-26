import { v3 } from 'api';

export const fetchDiff = (url, accessToken) => v3.getDiff(url, accessToken);

export const fetchMergeStatus = (repo, issueNum, accessToken) =>
  v3.get(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken);

export const fetchMergePullRequest = (
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod,
  accessToken
) =>
  v3.put(`/repos/${repo}/pulls/${issueNum}/merge`, accessToken, {
    commit_title: commitTitle,
    commit_message: commitMessage,
    merge_method: mergeMethod,
  });

export const fetchSubmitNewIssue = (
  owner,
  repo,
  issueTitle,
  issueComment,
  accessToken
) =>
  v3.postJson(`/repos/${owner}/${repo}/issues`, accessToken, {
    title: issueTitle,
    body: issueComment,
  });

export const fetchPostIssueComment = (
  body,
  owner,
  repoName,
  issueNum,
  accessToken
) =>
  v3.postJson(
    `/repos/${owner}/${repoName}/issues/${issueNum}/comments`,
    accessToken,
    { body }
  );

export const fetchEditIssue = (
  owner,
  repoName,
  issueNum,
  editParams,
  updateParams,
  accessToken
) =>
  v3.patch(
    `/repos/${owner}/${repoName}/issues/${issueNum}`,
    accessToken,
    editParams
  );

export const fetchChangeIssueLockStatus = (
  owner,
  repoName,
  issueNum,
  currentStatus,
  accessToken
) =>
  v3[currentStatus ? 'delete' : 'put'](
    `/repos/${owner}/${repoName}/issues/${issueNum}/lock`,
    accessToken
  );
