import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { NOTIFICATIONS_TEXTS, NOTIFICATIONS_TEXTS_NAMESPACE } from '../../../../../common/constants'
import { NotificationAvatarProps } from './types'

const NotificationAvatar: FC<NotificationAvatarProps> = ({ actorAvatar, actorName }) => {
  const texts = useTextOverrides(NOTIFICATIONS_TEXTS_NAMESPACE, NOTIFICATIONS_TEXTS)

  return (
    <AvatarWithPlaceholder
      width={40}
      height={40}
      alt={actorName ?? texts.avatarAlt}
      src={actorAvatar ?? ''}
    />
  )
}

export default NotificationAvatar
