import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { TIMESTAMP_TEXTS, TIMESTAMP_TEXTS_NAMESPACE } from './constants'
import { Dot } from './styled'
import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const texts = useTextOverrides(TIMESTAMP_TEXTS_NAMESPACE, TIMESTAMP_TEXTS)
  const parsed = DateTime.fromISO(date)
  const dateTime = texts.locale && parsed.isValid ? parsed.setLocale(texts.locale) : parsed
  const isToday = dateTime.hasSame(DateTime.now(), 'day')

  return (
    <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
      {isToday ? texts.today : dateTime.toFormat(texts.timeFormat)}
      <Dot />
      {dateTime.toFormat(texts.dateFormat)}
    </Typography>
  )
}

export default Timestamp
