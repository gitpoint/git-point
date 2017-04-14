import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR,
  HYDRATE_ISSUE_DESC_IS_PENDING,
  HYDRATE_ISSUE_DESC_WAS_SUCCESSFUL,
  HYDRATE_ISSUE_DESC_HAD_ERROR,
  HYDRATE_COMMENT_IS_PENDING,
  HYDRATE_COMMENT_WAS_SUCCESSFUL,
  HYDRATE_COMMENT_HAD_ERROR,
  CREATE_ISSUE_REACTION_IS_PENDING,
  CREATE_ISSUE_REACTION_WAS_SUCCESSFUL,
  CREATE_ISSUE_REACTION_HAD_ERROR,
  CREATE_COMMENT_REACTION_IS_PENDING,
  CREATE_COMMENT_REACTION_WAS_SUCCESSFUL,
  CREATE_COMMENT_REACTION_HAD_ERROR,
  DELETE_COMMENT_REACTION_IS_PENDING,
  DELETE_COMMENT_REACTION_WAS_SUCCESSFUL,
  DELETE_COMMENT_REACTION_HAD_ERROR,
  DELETE_ISSUE_REACTION_IS_PENDING,
  DELETE_ISSUE_REACTION_WAS_SUCCESSFUL,
  DELETE_ISSUE_REACTION_HAD_ERROR,
  EDIT_ISSUE_IS_PENDING,
  EDIT_ISSUE_WAS_SUCCESSFUL,
  EDIT_ISSUE_HAD_ERROR,
} from '../constants';

const initialState = {
  issue: {},
  comments: [],
  isPendingComments: false,
  isPendingHydratedComment: false,
  isPendingHydratedIssueDesc: false,
  isPostingComment: false,
  isCreatingReaction: false,
  isCreatingReactionForID: null,
  isDeletingReaction: false,
  isEditingIssue: false,
  error: '',
}

export default function issueReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_ISSUE_COMMENTS_IS_PENDING:
        return {
          ...state,
          issue: action.payload,
          isPendingComments: true,
        };
      case GET_ISSUE_COMMENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: action.payload,
          isPendingComments: false,
        };
      case GET_ISSUE_COMMENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingComments: false,
        };
      case POST_ISSUE_COMMENT_IS_PENDING:
        return {
          ...state,
          isPostingComment: true,
        };
      case POST_ISSUE_COMMENT_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: [...state.comments, action.payload],
          isPostingComment: false,
        };
      case POST_ISSUE_COMMENT_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPostingComment: false,
        };
      case HYDRATE_ISSUE_DESC_IS_PENDING:
        return {
          ...state,
          isPendingHydratedIssueDesc: true,
        };
      case HYDRATE_ISSUE_DESC_WAS_SUCCESSFUL:
        return {
          ...state,
          issue: {...state.issue, completeReactions: action.payload},
          isPendingHydratedIssueDesc: false,
        };
      case HYDRATE_ISSUE_DESC_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingHydratedIssueDesc: false,
        };
      case HYDRATE_COMMENT_IS_PENDING:
        return {
          ...state,
          isPendingHydratedComment: true,
        };
      case HYDRATE_COMMENT_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: state.comments.map(
               (comment) => comment.id === action.commentID ? {...comment, completeReactions: action.payload} : comment
           ),
          isPendingHydratedComment: false,
        };
      case HYDRATE_COMMENT_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingHydratedComment: false,
        };
      case CREATE_ISSUE_REACTION_IS_PENDING:
        return {
          ...state,
          isCreatingReactionForID: action.payload,
          isCreatingReaction: true,
        };
      case CREATE_ISSUE_REACTION_WAS_SUCCESSFUL:
        return {
          ...state,
          issue: {...state.issue, completeReactions: [...state.issue.completeReactions, action.payload]},
          isCreatingReactionForID: null,
          isCreatingReaction: false,
        };
      case CREATE_ISSUE_REACTION_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isCreatingReactionForID: null,
          isCreatingReaction: false,
        };
      case CREATE_COMMENT_REACTION_IS_PENDING:
        return {
          ...state,
          isCreatingReactionForID: action.payload,
          isCreatingReaction: true,
        };
      case CREATE_COMMENT_REACTION_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: state.comments.map(
               (comment) => {
                 if (comment.id === action.commentID) {
                   return comment.completeReactions ? {...comment, completeReactions: [...comment.completeReactions, action.payload]} : {...comment, completeReactions: [action.payload]};
                 } else {
                   return comment;
                 }
               }
           ),
          isCreatingReactionForID: null,
          isCreatingReaction: false,
        };
      case CREATE_COMMENT_REACTION_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isCreatingReactionForID: null,
          isCreatingReaction: false,
        };
      case DELETE_ISSUE_REACTION_IS_PENDING:
        return {
          ...state,
          isDeletingReaction: true,
        };
      case DELETE_ISSUE_REACTION_WAS_SUCCESSFUL:
        return {
          ...state,
          issue: {...state.issue, completeReactions: state.issue.completeReactions.filter(reaction => reaction.id !== action.reactionID)},
          isDeletingReaction: false,
        };
      case DELETE_ISSUE_REACTION_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isDeletingReaction: false,
        };
      case DELETE_COMMENT_REACTION_IS_PENDING:
        return {
          ...state,
          isDeletingReaction: true,
        };
      case DELETE_COMMENT_REACTION_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: state.comments.map(
               (comment) => {
                 if (comment.id === action.commentID) {
                   return {...comment, completeReactions: comment.completeReactions.filter(reaction => reaction.id !== action.reactionID)};
                 } else {
                   return comment;
                 }
               }
           ),
          isDeletingReaction: false,
        };
      case DELETE_COMMENT_REACTION_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isDeletingReaction: false,
        };
      case EDIT_ISSUE_IS_PENDING:
        return {
          ...state,
          isEditingIssue: true,
        };
      case EDIT_ISSUE_WAS_SUCCESSFUL:
        return {
          ...state,
          issue: action.payload,
          isEditingIssue: false,
        };
      case EDIT_ISSUE_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isEditingIssue: false,
        };
      default:
        return state;
  }
}
