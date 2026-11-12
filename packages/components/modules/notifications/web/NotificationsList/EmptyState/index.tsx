import { FC } from 'react'

import { NotificationBellIcon as DefaultNotificationBellIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

import { NOTIFICATIONS_TEXTS, NOTIFICATIONS_TEXTS_NAMESPACE } from '../../../common/constants'
import { Container as DefaultContainer } from './styled'
import { EmptyStateProps } from './types'

const EmptyState: FC<EmptyStateProps> = ({
  Container = DefaultContainer,
  NotificationBellIcon = DefaultNotificationBellIcon,
  NotificationBellIconProps = {},
}) => {
  const texts = useTextOverrides(NOTIFICATIONS_TEXTS_NAMESPACE, NOTIFICATIONS_TEXTS)

  return (
    <Container>
      <NotificationBellIcon
        sx={{ color: 'primary.main', fontSize: 32 }}
        {...NotificationBellIconProps}
      />
      <Box textAlign="center">
        <Typography variant="subtitle2">{texts.emptyTitle}</Typography>
        <Typography variant="caption" color="text.secondary">
          {texts.emptyDescription}
        </Typography>
      </Box>
    </Container>
  )
}

export default EmptyState
