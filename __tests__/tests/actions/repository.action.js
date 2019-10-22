import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_COMMITS,
  GET_COMMIT,
  GET_COMMIT_DIFF,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
} from 'repository/repository.type';
import {
  getContents,
  getRepositoryFile,
  getCommits,
  getCommitFromUrl,
  getCommitDiffFromUrl,
  getReadMe,
  getLabels,
  getCommitDetails,
} from 'repository/repository.action';
import { fetchDiff, fetchReadMe, v3 } from 'api';

jest.mock('api', () => ({
  v3: {
    getJson: jest.fn(),
    getRaw: jest.fn(),
  },
  fetchDiff: jest.fn(),
  fetchReadMe: jest.fn(),
}));

const store = configureStore([thunk])({ auth: { accessToken: 'ABCXYZ' } });

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  store.clearActions();
});

describe('getContents()', () => {
  it('should return a success response', async () => {
    const level = 'some-level';
    const expectedData = { key: 'value ' };

    v3.getJson.mockResolvedValue(expectedData);

    await store.dispatch(getContents('', level));

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_CONTENTS.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_CONTENTS.SUCCESS,
      results: expectedData,
      level,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_CONTENTS.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    v3.getJson.mockRejectedValue(expectedData);

    await store.dispatch(getContents());

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_CONTENTS.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_CONTENTS.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_CONTENTS.ERROR,
      payload: expectedData,
    });
  });
});

describe('getRepositoryFile()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    v3.getRaw.mockResolvedValue(expectedData);

    await store.dispatch(getRepositoryFile(''));

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_FILE.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_FILE.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_FILE.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    v3.getRaw.mockRejectedValue(expectedData);

    await store.dispatch(getRepositoryFile());

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_FILE.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_FILE.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_FILE.ERROR,
      payload: expectedData,
    });
  });
});

describe('getCommits()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    v3.getJson.mockResolvedValue(expectedData);

    await store.dispatch(getCommits(''));

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_COMMITS.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_COMMITS.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_COMMITS.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    v3.getJson.mockRejectedValue(expectedData);

    await store.dispatch(getCommits());

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_COMMITS.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_COMMITS.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_COMMITS.ERROR,
      payload: expectedData,
    });
  });
});

describe('getCommitFromUrl()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    v3.getJson.mockResolvedValue(expectedData);

    await store.dispatch(getCommitFromUrl(''));

    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_COMMIT.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    v3.getJson.mockRejectedValue(expectedData);

    await store.dispatch(getCommitFromUrl());

    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_COMMIT.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT.ERROR,
      payload: expectedData,
    });
  });
});

describe('getCommitDiffFromUrl()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    fetchDiff.mockResolvedValue(expectedData);

    await store.dispatch(getCommitDiffFromUrl(''));

    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT_DIFF.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT_DIFF.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_COMMIT_DIFF.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    fetchDiff.mockRejectedValue(expectedData);

    await store.dispatch(getCommitDiffFromUrl());

    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT_DIFF.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_COMMIT_DIFF.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_COMMIT_DIFF.ERROR,
      payload: expectedData,
    });
  });
});

describe('getReadMe()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    fetchReadMe.mockResolvedValue(expectedData);

    await store.dispatch(getReadMe(''));

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_README.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_README.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_README.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    fetchReadMe.mockRejectedValue(expectedData);

    await store.dispatch(getReadMe());

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_README.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_README.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_README.ERROR,
      payload: expectedData,
    });
  });
});

describe('getLabels()', () => {
  it('should return a success response', async () => {
    const expectedData = { key: 'value ' };

    v3.getJson.mockResolvedValue(expectedData);

    await store.dispatch(getLabels(''));

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_LABELS.PENDING,
    });
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_LABELS.SUCCESS,
      payload: expectedData,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_LABELS.ERROR,
      })
    );
  });

  it('should return an error response', async () => {
    const expectedData = 'ERROR';

    v3.getJson.mockRejectedValue(expectedData);

    await store.dispatch(getLabels());

    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_LABELS.PENDING,
    });
    expect(store.getActions()).not.toContainEqual(
      expect.objectContaining({
        type: GET_REPOSITORY_LABELS.SUCCESS,
      })
    );
    expect(store.getActions()).toContainEqual({
      type: GET_REPOSITORY_LABELS.ERROR,
      payload: expectedData,
    });
  });

});

describe('getCommitDetails()', () => {
  it('should get commit and commit diff', async () => {
    const commit = { url: 'url.com' };

    v3.getJson.mockResolvedValue({});

    await store.dispatch(getCommitDetails(commit));

    expect(v3.getJson).toHaveBeenCalledWith(commit.url, expect.any(String));
    expect(fetchDiff).toHaveBeenCalledWith(commit.url, expect.any(String));
  });

  it('should get commit and commit diff when commit has nested commit', async () => {
    const nestedCommit = { commit: { url: 'nestedUrl.dev' } };

    v3.getJson.mockResolvedValue({});

    await store.dispatch(getCommitDetails(nestedCommit));

    expect(v3.getJson).toHaveBeenCalledWith(nestedCommit.commit.url, expect.any(String));
    expect(fetchDiff).toHaveBeenCalledWith(nestedCommit.commit.url, expect.any(String));
  });
});