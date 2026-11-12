import { DATE_FORMAT, TIME_FORMAT, isToday, isYesterday } from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

import { MESSAGES_TEXTS } from '../../../common/texts'

// Bound every regex pass so adversarial input cannot cause super-linear runtime:
// the input length is capped and every lazy-quantifier match is constrained to a
// fixed character class and length.
const MAX_PREVIEW_INPUT_LENGTH = 1000

// A `<br>` is a line break, so it splits lines just like a newline does.
const LINE_BREAK_REGEX = /\r?\n|<br(?:\s[^<>]{0,200})?\/?>/i

// Inline formatting the markdown editor serializes as raw HTML (e.g. underline as `<u>`).
const INLINE_HTML_TAG_REGEX =
  /<\/?(?:u|ins|s|del|strike|b|strong|i|em|code|mark|sup|sub|span)(?:\s[^<>]{0,200})?\/?>/gi

// The chat list shows the last message as a single line of plain text, not through the
// `Markdown` renderer the message bubble uses, so this is a best-effort strip of the common
// syntax rather than a full parse.
const stripMarkdownSafely = (line: string) =>
  line
    .replace(INLINE_HTML_TAG_REGEX, '')
    .replace(/!\[([^\]]{0,200})\]\([^)]{0,200}\)/g, '$1')
    .replace(/\[([^\]]{1,200})\]\([^)]{0,200}\)/g, '$1')
    .replace(/`{1,3}([^`]{1,200})`{1,3}/g, '$1')
    .replace(/(\*\*|__)([^*_\n]{1,200})\1/g, '$2')
    .replace(/([*_])([^*_\n]{1,200})\1/g, '$2')
    .replace(/~~([^~\n]{1,200})~~/g, '$1')
    .replace(/^\s*#{1,6}\s*/, '')
    .replace(/^\s*>\s*/, '')
    .replace(/^\s*[-*+]\s+/, '')
    .replace(/^\s*\d+\.\s+/, '')
    .trim()

export const getLastMessagePreview = (content?: string | null) => {
  if (!content) return ''

  return (
    content
      .slice(0, MAX_PREVIEW_INPUT_LENGTH)
      .split(LINE_BREAK_REGEX)
      .map(stripMarkdownSafely)
      .find((line) => line.length > 0) ?? ''
  )
}

export const formatDate = (
  date?: string | null,
  texts: Pick<
    typeof MESSAGES_TEXTS,
    'yesterday' | 'monthsAgo' | 'weeksAgo' | 'daysAgo' | 'dateLocale'
  > = MESSAGES_TEXTS,
) => {
  if (!date) return ''
  const parsed = DateTime.fromISO(date)
  const dateTime = texts.dateLocale && parsed.isValid ? parsed.setLocale(texts.dateLocale) : parsed
  if (!dateTime.isValid) return ''

  if (isToday(date)) return dateTime.toFormat(TIME_FORMAT[2])

  if (isYesterday(date)) return texts.yesterday

  const diff = dateTime.diffNow(['years', 'months', 'weeks', 'days']).toObject()

  if (diff.months && Math.abs(diff.months) > 0) {
    return texts.monthsAgo(Number(Math.abs(diff.months).toFixed(0)))
  }

  if (diff.weeks && Math.abs(diff.weeks) > 0) {
    return texts.weeksAgo(Number(Math.abs(diff.weeks).toFixed(0)))
  }

  if (diff.days && Math.abs(diff.days) > 0)
    return texts.daysAgo(Number(Math.abs(diff.days).toFixed(0)))

  return dateTime.toFormat(DATE_FORMAT[2])
}
