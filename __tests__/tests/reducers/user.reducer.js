import {
  GET_USER,
  GET_ORGS,
  GET_IS_FOLLOWING,
  GET_IS_FOLLOWER,
  GET_REPOSITORIES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USER_REPOS,
  CHANGE_FOLLOW_STATUS,
  GET_STAR_COUNT,
} from 'user/user.type';
import { initialState, userReducer } from 'user/user.reducer';
import user from 'testData/api/user';
import organization from 'testData/api/organization';

describe('User Reducer', () => {
  it('should set initial state', () => {
    expect(userReducer()).toEqual(initialState);
  });

  describe('GET_USER', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_USER.PENDING };
      const expectedState = { ...initialState, isPendingUser: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_USER.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set user', () => {
      const action = { type: GET_USER.SUCCESS, payload: user };
      const expectedState = { ...initialState, user: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_ORGS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_ORGS.PENDING };
      const expectedState = { ...initialState, isPendingOrgs: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_ORGS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set organizations', () => {
      const action = { type: GET_ORGS.SUCCESS, payload: [organization] };
      const expectedState = { ...initialState, orgs: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_STAR_COUNT', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_STAR_COUNT.PENDING };
      const expectedState = { ...initialState, isPendingStarCount: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_STAR_COUNT.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set star count', () => {
      const action = { type: GET_STAR_COUNT.SUCCESS, payload: 9001 };
      const expectedState = { ...initialState, starCount: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_IS_FOLLOWING', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_IS_FOLLOWING.PENDING };
      const expectedState = { ...initialState, isPendingCheckFollowing: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_IS_FOLLOWING.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set is following', () => {
      const action = { type: GET_IS_FOLLOWING.SUCCESS, payload: true };
      const expectedState = { ...initialState, isFollowing: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_IS_FOLLOWER', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_IS_FOLLOWER.PENDING };
      const expectedState = { ...initialState, isPendingCheckFollower: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_IS_FOLLOWER.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set is follower', () => {
      const action = { type: GET_IS_FOLLOWER.SUCCESS, payload: true };
      const expectedState = { ...initialState, isFollower: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('CHANGE_FOLLOW_STATUS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: CHANGE_FOLLOW_STATUS.PENDING };
      const expectedState = { ...initialState, isPendingChangeFollowing: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: CHANGE_FOLLOW_STATUS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    [1, -1].forEach(incrementBy => {
      it(`.SUCCESS should increment followers with ${incrementBy}`, () => {
        const isFollowing = incrementBy > 0;
        let initialUser = { ...user, followers: 1 };
        const action = {
          type: CHANGE_FOLLOW_STATUS.SUCCESS,
          changeTo: isFollowing,
          authUser: initialUser.login,
        };
        const expectedState = {
          ...initialState,
          user: {
            ...initialUser,
            followers: initialUser.followers + incrementBy,
          },
          followers: [],
          isFollowing,
        };

        expect(
          userReducer(
            {
              ...initialState,
              user: initialUser,
              followers: [],
            },
            action
          )
        ).toEqual(expectedState);
      });
    });
    it('.SUCCESS should set followers', () => {
      const initialUser = { ...user, followers: 1 };
      const follower = { ...user, login: 'test' };

      const action = {
        type: CHANGE_FOLLOW_STATUS.SUCCESS,
        changeTo: true,
        authUser: initialUser.login,
      };
      const expectedState = {
        ...initialState,
        user: {
          ...initialUser,
          followers: 2,
        },
        followers: [follower],
        isFollowing: true,
      };

      expect(
        userReducer(
          {
            ...initialState,
            user: initialUser,
            followers: [initialUser, follower],
          },
          action
        )
      ).toEqual(expectedState);
    });
  });

  describe('GET_REPOSITORIES', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_REPOSITORIES.PENDING };
      const expectedState = { ...initialState, isPendingRepositories: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_REPOSITORIES.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set repositories', () => {
      const action = { type: GET_REPOSITORIES.SUCCESS, payload: [{ id: 1 }] };
      const expectedState = { ...initialState, repositories: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_FOLLOWERS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_FOLLOWERS.PENDING };
      const expectedState = { ...initialState, isPendingFollowers: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_FOLLOWERS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set follwers', () => {
      const action = { type: GET_FOLLOWERS.SUCCESS, payload: [{ id: 1 }] };
      const expectedState = { ...initialState, followers: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_FOLLOWING', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: GET_FOLLOWING.PENDING };
      const expectedState = { ...initialState, isPendingFollowing: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: GET_FOLLOWING.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set following', () => {
      const action = { type: GET_FOLLOWING.SUCCESS, payload: true };
      const expectedState = { ...initialState, following: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SEARCH_USER_REPOS', () => {
    it('.PENDING should set pending state', () => {
      const action = { type: SEARCH_USER_REPOS.PENDING };
      const expectedState = { ...initialState, isPendingSearchUserRepos: true };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.ERROR should set error state', () => {
      const action = { type: SEARCH_USER_REPOS.ERROR, payload: 'error' };
      const expectedState = { ...initialState, error: action.payload };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('.SUCCESS should set searchedUserRepos', () => {
      const action = {
        type: SEARCH_USER_REPOS.SUCCESS,
        searchedUserRepos: [{ id: 1 }],
      };
      const expectedState = {
        ...initialState,
        searchedUserRepos: action.payload,
      };

      expect(userReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
