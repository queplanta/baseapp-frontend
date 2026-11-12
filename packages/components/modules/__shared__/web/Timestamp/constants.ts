import { DATE_FORMAT, TIME_FORMAT } from '@baseapp-frontend/utils'

export const TIMESTAMP_TEXTS_NAMESPACE = '__shared__.Timestamp'

export const TIMESTAMP_TEXTS = {
  today: 'Today',
  /** Luxon locale of the time and date ('' keeps Luxon's default). */
  locale: '',
  timeFormat: TIME_FORMAT[3] as string,
  dateFormat: DATE_FORMAT[2] as string,
}
