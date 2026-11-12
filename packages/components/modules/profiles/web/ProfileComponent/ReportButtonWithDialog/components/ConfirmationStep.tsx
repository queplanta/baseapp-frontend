import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Button, Typography } from '@mui/material'

import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../../common/constants'
import { ConfirmationStepProps } from '../types'

const ConfirmationStep: FC<ConfirmationStepProps> = ({ reportType, onClose }) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const smDown = useResponsive('down', 'sm')

  return (
    <>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportThanks(reportType?.label ?? '')}
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        {texts.reportAnonymous}
      </Typography>
      <Button onClick={onClose}>{texts.close}</Button>
    </>
  )
}

export default ConfirmationStep
