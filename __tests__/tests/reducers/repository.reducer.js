import {
  GET_REPOSITORY,
  GET_REPOSITORY_CONTRIBUTORS,
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
  SEARCH_OPEN_ISSUES,
  SEARCH_CLOSED_ISSUES,
  SEARCH_OPEN_PULLS,
  SEARCH_CLOSED_PULLS,
} from 'repository/repository.type';

import { initialState, repositoryReducer } from 'repository/repository.reducer';

describe('Repository Reducer', () => {
  it('should set initial state', () => {
    expect(repositoryReducer(undefined)).toEqual(initialState);
  });

  describe('GET_REPOSITORY', () => {
    it('.PENDING should set state to pending', () => {
      const action = { type: GET_REPOSITORY.PENDING };
      const expectedState = {
        ...initialState,
        isPendingRepository: true,
        contributors: [],
        issues: [],
        readMe: '',
        hasRepoExist: false,
        hasReadMe: false,
        error: '',
        topics: [],
        isPendingRepository: true,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORY.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set repository', () => {
      const action = { type: GET_REPOSITORY.SUCCESS, payload: { id: 1 } };
      const expectedState = {
        ...initialState,
        repository: action.payload,
        hasRepoExist: true,
        error: '',
        isPendingRepository: false,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_REPOSITORY_CONTRIBUTORS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORY_CONTRIBUTORS.PENDING };
      const expectedState = { ...initialState, isPendingContributors: true };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = {
        type: GET_REPOSITORY_CONTRIBUTORS.ERROR,
        payload: 'error',
      };
      const expectedState = {
        ...initialState,
        error: action.payload,
        isPendingContributors: false,
        contributors: [],
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set contributors', () => {
      const action = {
        type: GET_REPOSITORY_CONTRIBUTORS.SUCCESS,
        payload: [{ id: 1 }],
      };
      const expectedState = {
        ...initialState,
        isPendingContributors: false,
        contributors: action.payload,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_REPOSITORY_CONTENTS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORY_CONTENTS.PENDING };
      const expectedState = { ...initialState, isPendingContents: true };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORY_CONTENTS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set repository top content', () => {
      const action = {
        type: GET_REPOSITORY_CONTENTS.SUCCESS,
        level: 'top',
        results: [{ id: 1 }],
      };
      const expectedState = {
        ...initialState,
        contents: { top: action.results },
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    [undefined, { top: 'test' }].forEach(initialContents => {
      it(
        '.SUCCESS should append repository content with initialContent: ' +
          JSON.stringify(initialContents),
        () => {
          const level = 'bottom';
          const action = {
            type: GET_REPOSITORY_CONTENTS.SUCCESS,
            level,
            results: [{ id: 1 }],
          };
          const expectedState = {
            ...initialState,
            contents: { ...initialContents, [level]: action.results },
          };

          expect(
            repositoryReducer(
              { ...initialState, contents: initialContents },
              action
            )
          ).toEqual(expectedState);
        }
      );
    });
  });

  describe('GET_REPOSITORY_FILE', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORY_FILE.PENDING };
      const expectedState = { ...initialState, isPendingFile: true };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORY_FILE.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set file content', () => {
      const action = { type: GET_REPOSITORY_FILE.SUCCESS, payload: 'content' };
      const expectedState = { ...initialState, fileContent: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_REPOSITORY_README', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORY_README.PENDING };
      const expectedState = { ...initialState, isPendingReadMe: true };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORY_README.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set readme', () => {
      const action = {
        type: GET_REPOSITORY_README.SUCCESS,
        payload: 'content',
      };
      const expectedState = { ...initialState, readMe: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_REPOSITORY_LABELS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORY_LABELS.PENDING };
      const expectedState = { ...initialState, isPendingLabels: true };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORY_LABELS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set labels', () => {
      const action = {
        type: GET_REPOSITORY_LABELS.SUCCESS,
        payload: [{ id: 1 }],
      };
      const expectedState = { ...initialState, labels: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SEARCH_OPEN_ISSUES', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SEARCH_OPEN_ISSUES.PENDING };
      const expectedState = {
        ...initialState,
        searchedOpenIssues: [],
        isPendingSearchOpenIssues: true,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: SEARCH_OPEN_ISSUES.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set searched open issues', () => {
      const action = { type: SEARCH_OPEN_ISSUES.SUCCESS, payload: [{ id: 1 }] };
      const expectedState = {
        ...initialState,
        searchedOpenIssues: action.payload,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SEARCH_CLOSED_ISSUES', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SEARCH_CLOSED_ISSUES.PENDING };
      const expectedState = {
        ...initialState,
        searchedClosedIssues: [],
        isPendingSearchClosedIssues: true,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: SEARCH_CLOSED_ISSUES.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set searched closed issues', () => {
      const action = {
        type: SEARCH_CLOSED_ISSUES.SUCCESS,
        payload: [{ id: 1 }],
      };
      const expectedState = {
        ...initialState,
        searchedClosedIssues: action.payload,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SEARCH_OPEN_PULLS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SEARCH_OPEN_PULLS.PENDING };
      const expectedState = {
        ...initialState,
        searchedOpenPulls: [],
        isPendingSearchOpenPulls: true,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: SEARCH_OPEN_PULLS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set search open pulls', () => {
      const action = { type: SEARCH_OPEN_PULLS.SUCCESS, payload: [{ id: 1 }] };
      const expectedState = {
        ...initialState,
        searchedOpenPulls: action.payload,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SEARCH_CLOSED_PULLS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SEARCH_CLOSED_PULLS.PENDING };
      const expectedState = {
        ...initialState,
        searchedClosedPulls: [],
        isPendingSearchClosedPulls: true,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: SEARCH_CLOSED_PULLS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set search closed pulls', () => {
      const action = {
        type: SEARCH_CLOSED_PULLS.SUCCESS,
        payload: [{ id: 1 }],
      };
      const expectedState = {
        ...initialState,
        searchedClosedPulls: action.payload,
      };

      expect(repositoryReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
