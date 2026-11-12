import { FC } from 'react'

import { PinIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'

import { COMMENTS_TEXTS, COMMENTS_TEXTS_NAMESPACE } from '../../../common/constants'
import { BadgeContainer } from './styled'
import { CommentPinnedBadgeProps } from './types'

const CommentPinnedBadge: FC<CommentPinnedBadgeProps> = ({ isPinned }) => {
  const texts = useTextOverrides(COMMENTS_TEXTS_NAMESPACE, COMMENTS_TEXTS)
  if (!isPinned) return null

  return (
    <BadgeContainer>
      <PinIcon />
      <Typography variant="body2" color="text.secondary">
        {texts.pinned}
      </Typography>
    </BadgeContainer>
  )
}

export default CommentPinnedBadge
