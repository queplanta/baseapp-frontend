import React, { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { ThreeDotsIcon, TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { ACTIONS_OVERLAY_TEXTS, ACTIONS_OVERLAY_TEXTS_NAMESPACE } from '../constants'
import { TooltipContainer } from './styled'
import { ThreeDotsMenuHoverOverlayProps } from './types'

const ThreeDotsMenuHoverOverlay: FC<ThreeDotsMenuHoverOverlayProps> = ({
  offsetRight,
  offsetTop,
  showDeleteButton,
  isDeletingItem,
  disableDeleteButton,
  handleDeleteDialogOpen,
  actions = [],
  handleClosePopover,
  popover,
}) => {
  const texts = useTextOverrides(ACTIONS_OVERLAY_TEXTS_NAMESPACE, ACTIONS_OVERLAY_TEXTS)

  return (
    <TooltipContainer
      offsetRight={offsetRight}
      offsetTop={offsetTop}
      aria-label={texts.actionsOverlay}
    >
      <IconButton onClick={popover.onOpen} aria-label={texts.showMenuOptions}>
        <ThreeDotsIcon sx={{ fontSize: '18px' }} />
      </IconButton>
      <Popover open={popover.open} onClose={handleClosePopover}>
        <MenuList>
          {actions?.map(({ label, icon, onClick, disabled, hasPermission }) => {
            if (!hasPermission) return null

            return (
              <MenuItem
                key={label}
                onClick={() => {
                  onClick?.()
                  handleClosePopover()
                }}
                disabled={disabled}
              >
                {icon}
                <Typography variant="body2" color="text.primary">
                  {label}
                </Typography>
              </MenuItem>
            )
          })}
          {showDeleteButton && (
            <MenuItem
              onClick={handleDeleteDialogOpen}
              disabled={isDeletingItem || disableDeleteButton}
              color="disabled"
            >
              <TrashCanIcon sx={{ color: disableDeleteButton ? 'text.disabled' : 'error.main' }} />
              <Typography
                variant="body2"
                color={disableDeleteButton ? 'text.disabled' : 'error.main'}
              >
                {texts.delete}
              </Typography>
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </TooltipContainer>
  )
}

export default ThreeDotsMenuHoverOverlay
