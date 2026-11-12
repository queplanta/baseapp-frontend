import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Typography, useTheme } from '@mui/material'

import { ACTIVITY_LOG_TEXTS, ACTIVITY_LOG_TEXTS_NAMESPACE } from '../constants'
import { getUpdateMessage } from '../utils'
import { LogDiff, LogItemProps } from './types'

const LogItem: FC<LogItemProps> = ({ log, sx }) => {
  const theme = useTheme()
  const texts = useTextOverrides(ACTIVITY_LOG_TEXTS_NAMESPACE, ACTIVITY_LOG_TEXTS)
  if (!log?.verb) return null

  const verbMapping: { [key: string]: string } = {
    'comments.add_comment': texts.verbAddComment,
    'comments.change_comment': texts.verbChangeComment,
    'comments.delete_comment': texts.verbDeleteComment,
    'comments.reply_comment': texts.verbReplyComment,
    'comments.pin_comment': texts.verbPinComment,
    'baseapp_reactions.add_reaction': texts.verbAddReaction,
  }

  const getLogMessage = (verb: string, diff?: LogDiff) => {
    if (diff) return getUpdateMessage(verb, diff, texts)
    return verbMapping[verb] ?? verb
  }

  const diff = log.events?.edges?.[0]?.node?.diff ?? null
  const displayText = getLogMessage(log.verb, diff)

  return (
    <Box
      sx={sx}
      display="flex"
      alignItems="center"
      borderLeft={`1px solid ${theme.palette.text.disabled}`}
      marginLeft="20px"
    >
      <Typography ml="30px" lineHeight="22px" color={theme.palette.text.secondary} variant="body2">
        {displayText}
      </Typography>
    </Box>
  )
}

export default LogItem
