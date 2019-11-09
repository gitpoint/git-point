import React from 'react';
import {
  POST_ISSUE_COMMENT,
  DELETE_ISSUE_COMMENT,
  EDIT_ISSUE_COMMENT,
  EDIT_ISSUE,
  EDIT_ISSUE_BODY,
  CHANGE_LOCK_STATUS,
  GET_ISSUE_DIFF,
  GET_ISSUE_MERGE_STATUS,
  GET_PULL_REQUEST_FROM_URL,
  MERGE_PULL_REQUEST,
  SUBMIT_NEW_ISSUE,
} from 'issue/issue.type';
import { initialState, issueReducer } from 'issue/issue.reducer';
import { open } from 'testData/api/issue';

describe('Issuer Reducer', () => {
  it('should have initial state', () => {
    expect(issueReducer()).toEqual(initialState);
  });

  describe('POST_ISSUE_COMMENT', () => {
    it('.PEDNING should set pending state', () => {
      const action = { type: POST_ISSUE_COMMENT.PENDING };
      const expectedState = { ...initialState, isPostingComment: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: POST_ISSUE_COMMENT.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isPostingComment: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set comments', () => {
      const action = { type: POST_ISSUE_COMMENT.SUCCESS, payload: { id: 1 } };
      const expectedState = {
        ...initialState,
        isPostingComment: false,
        comments: [action.payload],
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should append payload to comments', () => {
      const comments = [0];
      const action = { type: POST_ISSUE_COMMENT.SUCCESS, payload: {} };
      const expectedState = {
        ...initialState,
        isPostingComment: false,
        comments: [...comments, action.payload],
      };

      expect(issueReducer({ ...initialState, comments }, action)).toEqual(
        expectedState
      );
    });
  });

  describe('DELETE_ISSUE_COMMENT', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: DELETE_ISSUE_COMMENT.PENDING };
      const expectedState = { ...initialState, isDeletingComment: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: DELETE_ISSUE_COMMENT.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isDeletingComment: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [
      { comments: undefined, expectedComments: [], id: 1 },
      { comments: [], expectedComments: [], id: 1 },
      { comments: [{ id: 1 }], expectedComments: [], id: 1 },
      {
        comments: [{ id: 1 }, { id: 2 }],
        expectedComments: [{ id: 2 }],
        id: 1,
      },
      {
        comments: [{ id: 1 }, { id: 2 }],
        expectedComments: [{ id: 1 }],
        id: 2,
      },
    ].forEach(({ comments, expectedComments, id: payload }) => {
      it(
        '.SUCCESS should remove comment from state' +
          JSON.stringify({ comments, expectedComments, payload }),
        () => {
          const action = { type: DELETE_ISSUE_COMMENT.SUCCESS, payload };
          const expectedState = {
            ...initialState,
            isDeletingComment: false,
            comments: expectedComments,
          };

          expect(
            issueReducer(
              { ...initialState, comments: comments || initialState.comments },
              action
            )
          ).toEqual(expectedState);
        }
      );
    });
  });

  describe('EDIT_ISSUE_COMMENT', () => {
    it('should set pending state', () => {
      const action = { type: EDIT_ISSUE_COMMENT.PENDING };
      const expectedState = { ...initialState, isEditingComment: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: EDIT_ISSUE_COMMENT.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isEditingComment: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [
      {
        comments: undefined,
        payload: { id: 1, body: 'body', body_html: 'body_html' },
        expectedComments: [],
      },
      {
        comments: [],
        payload: { id: 1, body: 'body', body_html: 'body_html' },
        expectedComments: [],
      },
      {
        comments: [{ id: 1 }],
        payload: { id: 1, body: 'body', body_html: 'body_html' },
        expectedComments: [{ id: 1, body: 'body', body_html: 'body_html' }],
      },
      {
        comments: [{ id: 1 }, { id: 2 }, { id: 3 }],
        payload: { id: 2, body: 'body', body_html: 'body_html' },
        expectedComments: [
          { id: 1 },
          { id: 2, body: 'body', body_html: 'body_html' },
          { id: 3 },
        ],
      },
    ].forEach(({ comments, payload, expectedComments }) => {
      it(
        '.SUCCESS should set comment body ' +
          JSON.stringify({ comments, payload, expectedComments }),
        () => {
          const action = {
            type: EDIT_ISSUE_COMMENT.SUCCESS,
            payload,
          };
          const expectedState = {
            ...initialState,
            isEditingComment: false,
            comments: expectedComments,
          };

          expect(
            issueReducer(
              { ...initialState, comments: comments || initialState.comments },
              action
            )
          ).toEqual(expectedState);
        }
      );
    });
  });

  describe('EDIT_ISSUE', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: EDIT_ISSUE.PENDING };
      const expectedState = { ...initialState, isEditingIssue: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: EDIT_ISSUE.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isEditingIssue: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set issue', () => {
      const action = { type: EDIT_ISSUE.SUCCESS, payload: open };
      const expectedState = {
        ...initialState,
        issue: action.payload,
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('EDIT_ISSUE_BODY', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: EDIT_ISSUE_BODY.PENDING };
      const expectedState = { ...initialState, isEditingComment: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: EDIT_ISSUE_BODY.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isEditingComment: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [
      { issue: undefined, payload: { body: 'body', body_html: 'body_html' } },
      { issue: open, payload: { body: 'body', body_html: 'body_html' } },
    ].forEach(({ issue, payload }) => {
      it(
        '.SUCCESS should set issue body when issue is ' + issue
          ? 'defined'
          : 'undefined',
        () => {
          const action = { type: EDIT_ISSUE_BODY.SUCCESS, payload };
          const expectedState = {
            ...initialState,
            isEditingComment: false,
            issue: { ...issue, ...payload },
          };

          expect(
            issueReducer(
              { ...initialState, issue: issue || initialState.issue },
              action
            )
          ).toEqual(expectedState);
        }
      );
    });
  });

  describe('CHANGE_LOCK_STATUS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: CHANGE_LOCK_STATUS.PENDING };
      const expectedState = { ...initialState, isChangingLockStatus: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: CHANGE_LOCK_STATUS.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isChangingLockStatus: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [
      { issue: undefined, expectedLocked: true },
      { issue: { ...open, locked: true }, expectedLocked: false },
      { issue: { ...open, locked: false }, expectedLocked: true },
    ].forEach(({ issue, expectedLocked }) => {
      it(
        '.SUCCESS should set issue locked' +
          JSON.stringify({
            isLocked: (issue || initialState.issue).locked,
            expectedLocked,
          }),
        () => {
          const action = { type: CHANGE_LOCK_STATUS.SUCCESS };
          const expectedState = {
            ...initialState,
            isChangingLockStatus: false,
            issue: { ...issue, locked: expectedLocked },
          };

          expect(
            issueReducer(
              { ...initialState, issue: issue || initialState.issue },
              action
            )
          ).toEqual(expectedState);
        }
      );
    });
  });

  describe('GET_ISSUE_DIFF', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_ISSUE_DIFF.PENDING };
      const expectedState = { ...initialState, isPendingDiff: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_ISSUE_DIFF.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isPendingDiff: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set diff', () => {
      const action = { type: GET_ISSUE_DIFF.SUCCESS, payload: { id: 1 } };
      const expectedState = {
        ...initialState,
        isPendingDiff: false,
        diff: action.payload,
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_ISSUE_MERGE_STATUS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_ISSUE_MERGE_STATUS.PENDING };
      const expectedState = { ...initialState, isPendingCheckMerge: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_ISSUE_MERGE_STATUS.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isPendingCheckMerge: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [{ isMerged: true }, { isMerged: false }].forEach(({ isMerged }) => {
      it('.SUCCESS should set isMerged to ' + JSON.stringify(isMerged), () => {
        const action = {
          type: GET_ISSUE_MERGE_STATUS.SUCCESS,
          payload: isMerged,
        };
        const expectedState = {
          ...initialState,
          isPendingCheckMerge: false,
          isMerged,
        };

        expect(issueReducer(initialState, action)).toEqual(expectedState);
      });
    });
  });

  describe('MERGE_PULL_REQUEST', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: MERGE_PULL_REQUEST.PENDING };
      const expectedState = { ...initialState, isPendingMerging: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: MERGE_PULL_REQUEST.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isPendingMerging: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    [{ isMerged: true }, { isMerged: false }].forEach(({ isMerged }) => {
      it('.SUCCESS should set isMerged to ' + JSON.stringify(isMerged), () => {
        const action = {
          type: MERGE_PULL_REQUEST.SUCCESS,
          payload: isMerged,
        };
        const expectedState = {
          ...initialState,
          isPendingMerging: false,
          isMerged,
        };

        expect(issueReducer(initialState, action)).toEqual(expectedState);
      });
    });
  });

  describe('GET_PULL_REQUEST_FROM_URL', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_PULL_REQUEST_FROM_URL.PENDING };
      const expectedState = { ...initialState, isPendingPR: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = {
        type: GET_PULL_REQUEST_FROM_URL.ERROR,
        payload: 'error',
      };
      const expectedState = {
        ...initialState,
        isPendingPR: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set pr', () => {
      const action = {
        type: GET_PULL_REQUEST_FROM_URL.SUCCESS,
        payload: { pr: 1 },
      };
      const expectedState = {
        ...initialState,
        isPendingPR: false,
        pr: action.payload,
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SUBMIT_NEW_ISSUE', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SUBMIT_NEW_ISSUE.PENDING };
      const expectedState = { ...initialState, isPendingSubmitting: true };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error', () => {
      const action = { type: SUBMIT_NEW_ISSUE.ERROR, payload: 'error' };
      const expectedState = {
        ...initialState,
        isPendingSubmitting: false,
        error: 'error',
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set issue', () => {
      const action = { type: SUBMIT_NEW_ISSUE.SUCCESS, payload: open };
      const expectedState = {
        ...initialState,
        isPendingSubmitting: false,
        issue: action.payload,
      };

      expect(issueReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
