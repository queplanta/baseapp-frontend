import { FC, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { BlockIcon, UnblockIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification, useTextOverrides } from '@baseapp-frontend/utils'

import { Button, CircularProgress, MenuItem, Typography } from '@mui/material'
import { useFragment, useMutation } from 'react-relay'

import { BlockToggleMutation } from '../../../../../__generated__/BlockToggleMutation.graphql'
import { BlockToggleFragment, BlockToggleMutationQuery } from '../../../common'
import { PROFILES_TEXTS, PROFILES_TEXTS_NAMESPACE } from '../../../common/constants'
import { ActionButton, DialogTitleContainer } from './styled'
import { BlockButtonWithDialogProps } from './types'

const BlockButtonWithDialog: FC<BlockButtonWithDialogProps> = ({
  target: targetRef,
  isMenu,
  handleError,
  handleCloseMenu,
  currentProfileId,
}) => {
  const texts = useTextOverrides(PROFILES_TEXTS_NAMESPACE, PROFILES_TEXTS)
  const target = useFragment(BlockToggleFragment, targetRef)
  const [commitMutation, isMutationInFlight] =
    useMutation<BlockToggleMutation>(BlockToggleMutationQuery)
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [open, setOpen] = useState(false)

  const isBlockedByMe = target?.isBlockedByMe

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setOpen(false)
    handleCloseMenu?.()
  }

  const handleBlock = () => {
    if (isMutationInFlight || !currentProfileId || !target) {
      return
    }

    commitMutation({
      variables: {
        input: {
          targetObjectId: target.id,
          actorObjectId: currentProfileId,
        },
      },
      onCompleted: (response, errors) => {
        if (sendMutationErrorToast(response?.blockToggle?.errors, errors)) {
          return
        }
        handleSuccess()
        sendToast(
          response?.blockToggle?.target?.isBlockedByMe
            ? texts.blockedToast(target.name ?? '')
            : texts.unblockedToast(target.name ?? ''),
          { type: 'info' },
        )
      },
      onError: () => {
        handleError?.()
      },
    })
  }

  return (
    <>
      {isMenu ? (
        <MenuItem onClick={handleOpen} disableRipple>
          <Typography variant="body2" color="error.main" noWrap>
            {isBlockedByMe ? (
              <>
                <UnblockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {texts.unblockProfile}
              </>
            ) : (
              <>
                <BlockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {texts.blockProfile}
              </>
            )}
          </Typography>
        </MenuItem>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ justifyContent: 'center' }}
          size="medium"
        >
          <Typography variant="body2" color="inherit" noWrap>
            {isBlockedByMe ? (
              <>
                <UnblockIcon sx={{ color: 'inherit', marginRight: '5px' }} />
                {texts.unblock}
              </>
            ) : (
              <>
                <BlockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {texts.blockProfile}
              </>
            )}
          </Typography>
        </Button>
      )}
      <ConfirmDialog
        open={open}
        title={
          <DialogTitleContainer>
            {isBlockedByMe ? <UnblockIcon /> : <BlockIcon />}
            {isBlockedByMe
              ? texts.unblockTitle(target.name ?? '')
              : texts.blockTitle(target.name ?? '')}
          </DialogTitleContainer>
        }
        content={isBlockedByMe ? texts.unblockContent : texts.blockContent}
        onClose={handleClose}
        action={
          <ActionButton
            onClick={handleBlock}
            isBlocked={isBlockedByMe}
            disabled={isMutationInFlight}
          >
            {isBlockedByMe ? texts.unblockAction : texts.blockAction}
            {isMutationInFlight && <CircularProgress size={16} sx={{ marginLeft: '5px' }} />}
          </ActionButton>
        }
      />
    </>
  )
}

export default BlockButtonWithDialog
