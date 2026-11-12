import { SearchingImage } from '@baseapp-frontend/design-system/components/web/illustrations'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

import { SearchNotFoundStateProps } from '../../common/types'
import { SEARCH_NOT_FOUND_STATE_TEXTS, SEARCH_NOT_FOUND_STATE_TEXTS_NAMESPACE } from './constants'

const SearchNotFoundState = ({ message }: SearchNotFoundStateProps) => {
  const texts = useTextOverrides(
    SEARCH_NOT_FOUND_STATE_TEXTS_NAMESPACE,
    SEARCH_NOT_FOUND_STATE_TEXTS,
  )

  return (
    <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={1.5} padding={4}>
      <SearchingImage sx={{ color: 'grey.500' }} />
      <Box display="grid" justifyItems="center" gridAutoRows="min-content" gap={0.5}>
        <Typography variant="subtitle2" color="text.primary">
          {texts.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {message ?? texts.message}
        </Typography>
      </Box>
    </Box>
  )
}

export default SearchNotFoundState
