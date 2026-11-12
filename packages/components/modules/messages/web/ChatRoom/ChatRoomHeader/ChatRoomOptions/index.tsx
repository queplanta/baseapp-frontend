import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { MESSAGES_TEXTS, MESSAGES_TEXTS_NAMESPACE } from '../../../../common/texts'
import { ChatRoomOptionsProps } from './types'

const ChatRoomOptions: FC<ChatRoomOptionsProps> = ({
  isArchived,
  isArchiveMutationInFlight,
  isGroup,
  onArchiveClicked,
  onDetailsClicked,
  onLeaveClicked,
  onContactDetailsClicked,
}) => {
  const texts = useTextOverrides(MESSAGES_TEXTS_NAMESPACE, MESSAGES_TEXTS)

  return (
    <MenuList>
      <MenuItem onClick={onArchiveClicked} disabled={isArchiveMutationInFlight}>
        <Typography variant="body2">
          {isArchived ? texts.unarchiveChat : texts.archiveChat}
        </Typography>
      </MenuItem>
      {isGroup ? (
        <>
          <MenuItem onClick={onDetailsClicked}>
            <Typography variant="body2">{texts.groupDetails}</Typography>
          </MenuItem>
          <MenuItem onClick={onLeaveClicked}>
            <Typography variant="body2" color="error">
              {texts.leaveGroup}
            </Typography>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={onContactDetailsClicked}>
          <Typography variant="body2">{texts.contactDetails}</Typography>
        </MenuItem>
      )}
    </MenuList>
  )
}

export default ChatRoomOptions
