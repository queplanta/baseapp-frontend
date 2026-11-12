import { FC } from 'react'

import { Iconify } from '@baseapp-frontend/design-system/components/web/images'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Button } from '@mui/material'

import { useFollowToggle } from '../../../common'
import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../common/constants'
import { FollowToggleButtonProps } from './types'

const FollowToggleButton: FC<FollowToggleButtonProps> = ({ targetId, isFollowedByMe }) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const { toggleFollow, isMutationInFlight } = useFollowToggle({ targetId })

  return (
    <Button
      onClick={toggleFollow}
      startIcon={
        isFollowedByMe ? <Iconify icon="ci:check-all" /> : <Iconify icon="mingcute:add-line" />
      }
      variant={isFollowedByMe ? 'soft' : 'contained'}
      color={isFollowedByMe ? 'inherit' : 'primary'}
      disabled={isMutationInFlight}
      size="medium"
    >
      {isFollowedByMe ? texts.following : texts.follow}
    </Button>
  )
}

export default FollowToggleButton
