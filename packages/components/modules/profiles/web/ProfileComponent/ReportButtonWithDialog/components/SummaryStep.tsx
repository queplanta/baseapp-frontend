import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Button, Divider, Typography } from '@mui/material'

import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../../common/constants'
import { SummaryStepProps } from '../types'

const SummaryStep: FC<SummaryStepProps> = ({
  reportType,
  reportSubType,
  reportText,
  isMutationInFlight,
  handleReport,
}) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const smDown = useResponsive('down', 'sm')

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportSummaryTitle}
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportAnonymous}
      </Typography>
      <Divider sx={{ marginX: '-32px' }} />
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">{texts.reportWhy}</Typography>
        <Typography variant="caption" color="text.secondary">
          {reportType?.label}
        </Typography>
      </Box>
      {reportSubType && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2">
            {texts.reportSubTypeQuestion(reportType?.label ?? '')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {reportSubType?.label}
          </Typography>
        </Box>
      )}
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">{texts.reportAbout}</Typography>
        <Typography variant="caption" color="text.secondary">
          {reportText}
        </Typography>
      </Box>
      <Button disabled={isMutationInFlight} onClick={handleReport} sx={{ marginTop: 2 }}>
        {texts.submitReport}
      </Button>
    </Box>
  )
}

export default SummaryStep
