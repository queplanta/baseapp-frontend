import { LoadingState as BaseAppLoadingState } from '@baseapp-frontend/design-system/components/web/displays'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

import { NOTIFICATIONS_TEXTS, NOTIFICATIONS_TEXTS_NAMESPACE } from '../../../common/constants'
import { HeaderContainer } from '../styled'

const LoadingState = () => {
  const texts = useTextOverrides(NOTIFICATIONS_TEXTS_NAMESPACE, NOTIFICATIONS_TEXTS)

  return (
    <Box
      display="grid"
      gridTemplateRows="min-content 1fr"
      height="100%"
      sx={{ backgroundColor: 'common.white' }}
    >
      <HeaderContainer>
        <Typography variant="h6">{texts.title}</Typography>
      </HeaderContainer>
      <BaseAppLoadingState />
    </Box>
  )
}

export default LoadingState
