import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Button, Divider, TextField, Typography } from '@mui/material'

import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../../common/constants'
import { STEPS } from '../constants'
import { TextStepProps } from '../types'

const TextStep: FC<TextStepProps> = ({ reportText, setReportText, setCurrentStep }) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const smDown = useResponsive('down', 'sm')

  return (
    <>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportDescribeTitle}
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportDescribeHint}
      </Typography>
      <Divider sx={{ marginX: '-32px' }} />
      <TextField
        fullWidth
        multiline
        rows={4}
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        placeholder={texts.reportPlaceholder}
      />
      <Button onClick={() => setCurrentStep(STEPS.summary)} disabled={!reportText}>
        {texts.confirm}
      </Button>
    </>
  )
}

export default TextStep
