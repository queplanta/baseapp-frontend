export const NUMBER_OF_COMMENTS_TO_LOAD_NEXT = 5

// Must match the @connection key and the orderBy default declared in the
// CommentsList_comments fragment (graphql/queries/CommentsList.ts).
export const COMMENTS_LIST_CONNECTION_KEY = 'CommentsList_comments'

export const DEFAULT_COMMENTS_ORDER_BY = '-is_pinned,-created'

export const DEFAULT_MAX_THREAD_DEPTH = 5

export const COMMENTS_TEXTS_NAMESPACE = 'comments'

/** Default (English) texts of the comments components; see `useTextOverrides`. */
export const COMMENTS_TEXTS = {
  shareComment: 'Share Comment',
  pinComment: 'Pin Comment',
  unpinComment: 'Unpin Comment',
  editComment: 'Edit Comment',
  deleteComment: 'Delete Comment',
  attachFiles: 'Attach files',
  mention: 'mention',
  commentPlaceholder: 'Comment...',
  pinned: 'Pinned',
  showMoreReplies: (count: number) => `Show more replies (${count})`,
  deletedUser: 'Deleted User',
  comment: 'Comment',
  avatarAlt: "Comment's user avatar",
  loadingMoreComments: 'loading more comments',
}
