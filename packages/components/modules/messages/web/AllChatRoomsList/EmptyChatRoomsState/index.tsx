import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/web/illustrations'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

import { MESSAGES_TEXTS, MESSAGES_TEXTS_NAMESPACE } from '../../../common/texts'

const EmptyChatRoomsState = () => {
  const texts = useTextOverrides(MESSAGES_TEXTS_NAMESPACE, MESSAGES_TEXTS)

  return (
    <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
      <SocialMediaDiscussionImage sx={{ color: 'grey.500' }} />
      <Typography variant="subtitle2" color="text.secondary">
        {texts.emptyChatRooms}
      </Typography>
    </Box>
  )
}

export default EmptyChatRoomsState
