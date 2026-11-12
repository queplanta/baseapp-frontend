import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import LoadingButton from '@mui/lab/LoadingButton'

import { useNotificationsMarkAllAsRead } from '../../../common'
import { NOTIFICATIONS_TEXTS, NOTIFICATIONS_TEXTS_NAMESPACE } from '../../../common/constants'
import { MarkAllAsReadButtonProps } from './types'

const MarkAllAsReadButton: FC<MarkAllAsReadButtonProps> = ({ refetch }) => {
  const texts = useTextOverrides(NOTIFICATIONS_TEXTS_NAMESPACE, NOTIFICATIONS_TEXTS)
  const [commitMutation, isLoading] = useNotificationsMarkAllAsRead()
  const markAsRead = () => {
    commitMutation({
      onCompleted: refetch,
      variables: {
        input: {
          read: true,
        },
      },
    })
  }

  return (
    <LoadingButton color="primary" onClick={markAsRead} loading={isLoading}>
      {texts.markAllAsRead}
    </LoadingButton>
  )
}

export default MarkAllAsReadButton
