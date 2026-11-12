import { DATE_FORMAT, isToday, isYesterday } from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

import { MESSAGES_TEXTS } from '../../../common/texts'

export const displayFormattedDate = (
  date: string,
  texts: Pick<typeof MESSAGES_TEXTS, 'today' | 'yesterday' | 'dateLocale'> = MESSAGES_TEXTS,
) => {
  if (isToday(date)) return texts.today
  if (isYesterday(date)) return texts.yesterday
  const parsed = DateTime.fromISO(date)
  const dateTime = texts.dateLocale && parsed.isValid ? parsed.setLocale(texts.dateLocale) : parsed
  return dateTime.toFormat(DATE_FORMAT[2])
}
