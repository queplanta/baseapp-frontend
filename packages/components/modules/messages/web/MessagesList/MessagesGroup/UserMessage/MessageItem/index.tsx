import { FC, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  BlockIcon,
  CopyIcon,
  DownloadIcon,
  PenEditIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification, useTextOverrides } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ActionsOverlay, HOVER_OVERLAY_MODES } from '../../../../../../__shared__/web'
import { MessageItemFragment } from '../../../../../common'
import { MESSAGES_TEXTS, MESSAGES_TEXTS_NAMESPACE } from '../../../../../common/texts'
import { useMessageDeleteMutation } from '../../../../../common/graphql/mutations/MessageDelete'
import MessageUpdate from '../../../../MessageUpdate'
import { MessageContent, MessageItemContainer } from './styled'
import { MessageItemProps } from './types'

const MessageItem: FC<MessageItemProps> = ({
  messageRef,
  isFirstGroupedMessage,
  isGroup = false,
}) => {
  const texts = useTextOverrides(MESSAGES_TEXTS_NAMESPACE, MESSAGES_TEXTS)
  const { currentProfile } = useCurrentProfile()
  const message = useFragment(MessageItemFragment, messageRef)
  const isOwnMessage = currentProfile?.id === message?.profile?.id
  const deletedMessage = message?.deleted
  const messageCardRef = useRef<HTMLDivElement>(null)
  const { sendToast } = useNotification()

  const [isEditMode, setIsEditMode] = useState(false)

  const [commitUpdate, isMutationInFlight] = useMessageDeleteMutation()

  const onDeleteClick = async () => {
    if (isMutationInFlight) return

    commitUpdate({
      variables: {
        input: {
          id: message.id,
        },
      },
      onCompleted: (response, errors) => {
        if (!errors) {
          sendToast(texts.messageDeleted, { type: 'error' })
        }
      },
    })
  }

  const deleteDialogContent = isGroup ? texts.deleteMessageInGroup : texts.deleteMessageInChat

  const renderMessageContent = () => {
    if (isEditMode) {
      return <MessageUpdate message={message} onCancel={() => setIsEditMode(false)} />
    }

    if (deletedMessage) {
      return (
        <Typography variant="body2" color="text.disabled" sx={{ maxWidth: '100%' }}>
          <BlockIcon sx={{ fontSize: '20px', color: 'grey.500' }} /> {message?.content}
        </Typography>
      )
    }

    return <MessageContent isOwnMessage={isOwnMessage}>{message?.content}</MessageContent>
  }

  return (
    <ActionsOverlay
      title={texts.message}
      actions={[
        {
          disabled: false,
          icon: <CopyIcon />,
          label: texts.copy,
          onClick: () => {
            navigator.clipboard.writeText(message?.content || '')
            sendToast(texts.messageCopied, { type: 'info', shouldShowProgress: true })
          },
          hasPermission: true,
        },
        {
          disabled: deletedMessage || !isOwnMessage,
          icon: <PenEditIcon />,
          label: texts.edit,
          onClick: () => {
            setIsEditMode(true)
          },
          hasPermission: isOwnMessage,
          closeOnClick: true,
        },
        {
          disabled: false,
          icon: <DownloadIcon />,
          label: texts.downloadAttachments,
          onClick: () => {}, // TODO: Implement download attachments
          hasPermission: true,
        },
      ]}
      hoverOverlayMode={HOVER_OVERLAY_MODES.threeDotsMenu}
      showDeleteButton
      handleDeleteItem={() => onDeleteClick()}
      isDeletingItem={isMutationInFlight}
      disableDeleteButton={!isOwnMessage || deletedMessage}
      DeleteDialogProps={{
        content: texts.deleteMessageConfirm(deleteDialogContent),
      }}
      ContainerProps={{
        flexDirection: isOwnMessage ? 'row' : 'row-reverse',
      }}
      ref={messageCardRef}
    >
      <MessageItemContainer
        isOwnMessage={isOwnMessage}
        isFirstGroupedMessage={isFirstGroupedMessage}
        {...(isEditMode && { sx: { width: '100%' } })}
      >
        {renderMessageContent()}
      </MessageItemContainer>
    </ActionsOverlay>
  )
}

export default MessageItem
