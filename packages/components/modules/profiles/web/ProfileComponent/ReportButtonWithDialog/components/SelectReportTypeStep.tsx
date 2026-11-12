import { FC } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { Box, Divider, Typography } from '@mui/material'

import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../../common/constants'
import { STEPS } from '../constants'
import { TypeButton } from '../styled'
import { ReportTypeNode, ReportTypeSubTypeNode, SelectReportTypeStepProps } from '../types'

const SelectReportTypeStep: FC<SelectReportTypeStepProps> = ({
  reportTypes,
  reportType,
  subType = false,
  setReportType,
  setCurrentStep,
  setReportSubType,
}) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const smDown = useResponsive('down', 'sm')
  const renderReportTypeButtons = (
    types:
      | ReadonlyArray<ReportTypeNode | null | undefined>
      | ReadonlyArray<ReportTypeSubTypeNode | null | undefined>,
  ) =>
    types?.map((type) => (
      <TypeButton
        key={type?.id}
        onClick={() => {
          if (subType) {
            setReportSubType(type as ReportTypeSubTypeNode)
            setCurrentStep(STEPS.text)
            return
          }
          setReportType(type as ReportTypeNode)
          if ((type as ReportTypeNode)?.subTypes?.edges?.length) {
            setCurrentStep(STEPS.subTypes)
            return
          }
          setCurrentStep(STEPS.text)
        }}
        endIcon={<ChevronIcon position="right" />}
        sx={{ marginX: '-12px', width: 'calc(100% + 24px)' }}
      >
        <Typography variant="body2">{type?.label}</Typography>
      </TypeButton>
    ))

  return (
    <>
      {subType ? (
        <Typography variant="h5">{reportType?.label}</Typography>
      ) : (
        <>
          <Box>
            <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
              {texts.reportWhy}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
              {texts.reportAnonymous}
            </Typography>
          </Box>
        </>
      )}
      <Divider sx={{ marginX: '-32px' }} />
      <Box display="flex" flexDirection="column">
        {reportTypes && renderReportTypeButtons(reportTypes)}
      </Box>
    </>
  )
}

export default SelectReportTypeStep
