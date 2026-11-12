import { DateTime } from 'luxon'

import { DATE_FORMAT, TIME_FORMAT } from '../constants/date'
import { ValueOf } from './typescript'

export type DateFormat = ValueOf<typeof DATE_FORMAT>
export type TimeFormat = ValueOf<typeof TIME_FORMAT>

export type FormatDateOptions = {
  toFormat?: DateFormat | TimeFormat
  fromFormat?: DateFormat | TimeFormat
}

export type FormatDateFromApiOptions = {
  toFormat?: DateFormat | TimeFormat
}

export type FormatDateToApiOptions = {
  fromFormat?: DateFormat | TimeFormat
}

export type RelativeTimeTexts = {
  /** Luxon locale for the dates of older items ('' keeps Luxon's default). */
  locale: string
  /** Luxon format of dates older than a month, unless `toFormat` is given. */
  dateFormat: string
  minutesAgo: (minutes: number) => string
  hoursAgo: (hours: number) => string
  daysAgo: (days: number) => string
}

export type FormatRelativeTimeOptions = {
  reference?: DateTime
  toFormat?: DateFormat | TimeFormat
  lowerCaseTimeIndicator?: boolean
  /** Replaces the default English texts (`RELATIVE_TIME_TEXTS`), e.g. to translate them. */
  texts?: RelativeTimeTexts
}
