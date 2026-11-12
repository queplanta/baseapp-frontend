'use client'

import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../../profiles/common'
import { CONTENT_FEED_TEXTS, CONTENT_FEED_TEXTS_NAMESPACE } from '../../common/constants'
import { PostHeaderProps } from './types'

const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  const texts = useTextOverrides(CONTENT_FEED_TEXTS_NAMESPACE, CONTENT_FEED_TEXTS)
  const profile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, post?.profile)

  if (!profile) return null

  const { image, name, urlPath } = profile
  return (
    <Stack p={1.5} gap={1} direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1}>
        <Avatar sizes="small" sx={{ p: 0 }} src={image ?? undefined} />
        <Stack>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {urlPath?.path && <>@{urlPath.path.replace('/', '')}</>}
          </Typography>
        </Stack>
      </Stack>
      <IconButton aria-label={texts.postOptions} sx={{ transform: `translateX(16px)` }}>
        <MoreVertIcon />
      </IconButton>
    </Stack>
  )
}

export default PostHeader
