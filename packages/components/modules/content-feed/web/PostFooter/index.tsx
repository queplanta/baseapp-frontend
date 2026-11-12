'use client'

import { FC } from 'react'

import { ReplyIcon, SharePostIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Circle as CircleIcon } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { CONTENT_FEED_TEXTS, CONTENT_FEED_TEXTS_NAMESPACE } from '../../common/constants'
import PostReactionButton from '../PostReactionButton'
import { PostFooterProps } from './types'

const PostFooter: FC<PostFooterProps> = ({ post }) => {
  const texts = useTextOverrides(CONTENT_FEED_TEXTS_NAMESPACE, CONTENT_FEED_TEXTS)
  const parsed = DateTime.fromISO(post.created)
  const created = texts.dateLocale && parsed.isValid ? parsed.setLocale(texts.dateLocale) : parsed
  return (
    <Stack p={1.5} gap={1.5} direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1.5}>
        <PostReactionButton target={post} />
        <IconButton aria-label={texts.reply} disableRipple sx={{ p: 0 }}>
          <ReplyIcon />
        </IconButton>
        <IconButton aria-label={texts.share} disableRipple sx={{ p: 0 }}>
          <SharePostIcon />
        </IconButton>
      </Stack>
      <Typography variant="caption">
        {created.toFormat(texts.timeFormat)} <CircleIcon color="disabled" sx={{ fontSize: 4 }} />{' '}
        {created.toFormat(texts.dateFormat)}
      </Typography>
    </Stack>
  )
}

export default PostFooter
