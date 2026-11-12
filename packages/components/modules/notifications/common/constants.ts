export const NOTIFICATION_VERB = {
  commentCreated: 'COMMENTS.COMMENT_CREATED',
  commentReplyCreated: 'COMMENTS.COMMENT_REPLY_CREATED',
  reactionCreated: 'REACTIONS.REACTION_CREATED',
}

export const USER_NOTIFICATIONS_KEY = 'user_notifications'

export const NUMBER_OF_NOTIFICATIONS_TO_LOAD_NEXT = 5

export const NOTIFICATIONS_TEXTS_NAMESPACE = 'notifications'

/** Default (English) texts of the notifications components; see `useTextOverrides`. */
export const NOTIFICATIONS_TEXTS = {
  title: 'Notifications',
  seeNotifications: 'see notifications',
  closeNotifications: 'close notifications',
  markAllAsRead: 'Mark all as read',
  older: 'Older',
  emptyTitle: 'You don’t have notifications.',
  emptyDescription: 'Your future notifications will be shown here.',
  avatarAlt: "Notification's user avatar",
  /** `target` is the lower-cased GraphQL type of what was commented on, e.g. `post`. */
  commentCreated: (target: string) => `commented in your ${target}`,
  commentReply: 'replied to your comment',
  /** `target` is the lower-cased GraphQL type of what was liked, e.g. `comment`. */
  reactionCreated: (target: string) => `liked your ${target}`,
}
