export const EVENT_FILTER_OPTIONS = ['All', 'Comments', 'Reactions', 'Posts'] as const

export const ACTIVITY_LOG_TEXTS_NAMESPACE = 'activity-log'

/** Default (English) texts of the activity log; see `useTextOverrides`. */
export const ACTIVITY_LOG_TEXTS = {
  title: 'Activity Log',
  searchPlaceholder: 'Search by user',
  noResultsForDateRange: 'No results found for the selected date range.',
  loadingMore: 'loading more activity logs',
  filter: 'Filter',
  clearFilter: 'Clear Filter',
  /** Label of an event filter option (`EVENT_FILTER_OPTIONS`). */
  eventFilterOption: (option: string) => option,
  period: 'Period',
  periodFrom: (date: string) => `From ${date}`,
  periodUntil: (date: string) => `Until ${date}`,
  startDate: 'Start date',
  endDate: 'End date',
  endBeforeStart: 'End date cannot be earlier than start date.',
  invalidDate: 'Your date is not valid',
  /** Luxon locale of the dates and date pickers ('' keeps the default). */
  dateLocale: '',
  verbAddComment: 'Created a comment',
  verbChangeComment: 'Edited a comment',
  verbDeleteComment: 'Deleted a comment',
  verbReplyComment: 'Replied to a comment',
  verbPinComment: 'Pinned a comment',
  verbAddReaction: 'Added a reaction',
  updatedProfilePicture: 'Updated their profile picture',
  updatedProfileBanner: 'Updated their profile banner',
  updatedBio: 'Updated their bio',
  updated: (what: string) => `Updated ${what}`,
}
