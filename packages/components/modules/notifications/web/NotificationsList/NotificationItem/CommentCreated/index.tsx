import { FC } from 'react'

import {
  RELATIVE_TIME_TEXTS,
  RELATIVE_TIME_TEXTS_NAMESPACE,
  formatRelativeTime,
  useTextOverrides,
} from '@baseapp-frontend/utils'

import { NOTIFICATIONS_TEXTS, NOTIFICATIONS_TEXTS_NAMESPACE } from '../../../../common/constants'
import DefaultNotificationAvatar from '../Notification/NotificationAvatar'
import DefaultNotificationBody from '../Notification/NotificationBody'
import DefaultNotificationHeader from '../Notification/NotificationHeader'
import {
  NotificationContent as DefaultNotificationContent,
  NotificationRoot as DefaultNotificationRoot,
} from '../styled'
import { CommentCreatedProps } from './types'

const CommentCreated: FC<CommentCreatedProps> = ({
  notification,
  NotificationRoot = DefaultNotificationRoot,
  NotificationContent = DefaultNotificationContent,
  NotificationAvatar = DefaultNotificationAvatar,
  NotificationAvatarProps = {},
  NotificationHeader = DefaultNotificationHeader,
  NotificationHeaderProps = {},
  NotificationBody = DefaultNotificationBody,
  NotificationBodyProps = {},
}) => {
  const texts = useTextOverrides(NOTIFICATIONS_TEXTS_NAMESPACE, NOTIFICATIONS_TEXTS)
  const relativeTimeTexts = useTextOverrides(RELATIVE_TIME_TEXTS_NAMESPACE, RELATIVE_TIME_TEXTS)
  // eslint-disable-next-line no-underscore-dangle
  const message = texts.commentCreated(notification.target?.__typename?.toLowerCase?.() ?? '')

  return (
    <NotificationRoot>
      <NotificationAvatar
        actorAvatar={notification.actor?.image ?? undefined}
        actorName={notification.actor?.name}
        {...NotificationAvatarProps}
      />
      <NotificationContent>
        <NotificationHeader
          message={message}
          timestamp={formatRelativeTime(notification.timestamp, { texts: relativeTimeTexts })}
          actorName={notification.actor?.name}
          unread={notification.unread}
          {...NotificationHeaderProps}
        />
        <NotificationBody content={notification.actionObject?.body} {...NotificationBodyProps} />
      </NotificationContent>
    </NotificationRoot>
  )
}

export default CommentCreated
