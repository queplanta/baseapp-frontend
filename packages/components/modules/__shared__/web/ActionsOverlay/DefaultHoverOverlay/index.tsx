import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { ACTIONS_OVERLAY_TEXTS, ACTIONS_OVERLAY_TEXTS_NAMESPACE } from '../constants'
import { ActionOverlayTooltipContainer } from '../styled'
import { DefaultHoverOverlayProps } from './types'

const DefaultHoverOverlay: FC<DefaultHoverOverlayProps> = ({
  offsetRight,
  offsetTop,
  showDeleteButton,
  isDeletingItem,
  disableDeleteButton,
  handleDeleteDialogOpen,
  actions = [],
  handleLongPressItemOptionsClose,
}) => {
  const texts = useTextOverrides(ACTIONS_OVERLAY_TEXTS_NAMESPACE, ACTIONS_OVERLAY_TEXTS)

  return (
    <ActionOverlayTooltipContainer
      offsetRight={offsetRight}
      offsetTop={offsetTop}
      aria-label={texts.actionsOverlay}
    >
      {showDeleteButton && (
        <IconButton
          onClick={handleDeleteDialogOpen}
          disabled={isDeletingItem || disableDeleteButton}
          aria-label={texts.deleteItem}
        >
          <TrashCanIcon />
        </IconButton>
      )}
      {actions?.map(({ label, icon, onClick, disabled, hasPermission, closeOnClick }) => {
        if (!hasPermission) return null

        const handleClick = () => {
          onClick?.()
          if (closeOnClick) {
            handleLongPressItemOptionsClose()
          }
        }

        return (
          <IconButton key={label} onClick={handleClick} disabled={disabled} aria-label={label}>
            {icon}
          </IconButton>
        )
      })}
    </ActionOverlayTooltipContainer>
  )
}

export default DefaultHoverOverlay
