export const DATE_FORMAT = {
  0: 'MM/dd/yy',
  1: 'MM/dd/yyyy',
  2: 'LLL d, yyyy',
  3: 'dd MMM yyyy',
  api: 'yyyy-MM-dd',
  iso: 'yyyy-MM-ddTHH:mm:ss.SSS',
} as const

export const TIME_FORMAT = {
  0: 'hh:mma',
  1: 'HH:mm',
  2: 'hh:mm a',
  3: 'h:mm a',
} as const

/** Namespace of `RELATIVE_TIME_TEXTS` for `useTextOverrides`. */
export const RELATIVE_TIME_TEXTS_NAMESPACE = 'utils.relativeTime'

/** Default texts of `formatRelativeTime`. */
export const RELATIVE_TIME_TEXTS = {
  locale: '',
  dateFormat: DATE_FORMAT[2] as string,
  minutesAgo: (minutes: number) => (minutes >= 2 ? `${minutes} minutes ago` : '1 minute ago'),
  hoursAgo: (hours: number) => (hours >= 2 ? `${hours} hours ago` : '1 hour ago'),
  daysAgo: (days: number) => (days >= 2 ? `${days} days ago` : '1 day ago'),
}
