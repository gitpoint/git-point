import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
} from 'repository/repository.type';

import { initialState, repositoryReducer } from 'repository/repository.reducer';

describe('Repository Reducer', () => {
  it('should set initial state', () => {
    expect(repositoryReducer(undefined)).toEqual(initialState);
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
});
