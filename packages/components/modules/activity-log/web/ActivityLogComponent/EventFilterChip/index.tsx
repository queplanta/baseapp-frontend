import { FC, MouseEvent, useState } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { Checkbox, Chip, ListItemText, Menu, MenuItem } from '@mui/material'

import { ACTIVITY_LOG_TEXTS, ACTIVITY_LOG_TEXTS_NAMESPACE } from '../constants'
import { EventFilterOption } from '../types'
import { EventFilterChipProps } from './types'

const EventFilterChip: FC<EventFilterChipProps> = ({ options, selectedOptions, onChange }) => {
  const texts = useTextOverrides(ACTIVITY_LOG_TEXTS_NAMESPACE, ACTIVITY_LOG_TEXTS)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggle = (option: EventFilterOption) => {
    const currentIndex = selectedOptions.indexOf(option)
    const newSelectedOptions = [...selectedOptions]

    if (currentIndex === -1) {
      newSelectedOptions.push(option)
    } else {
      newSelectedOptions.splice(currentIndex, 1)
    }

    onChange(newSelectedOptions)
  }

  return (
    <>
      <Chip label={texts.filter} onClick={handleClick} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleToggle(option)}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={texts.eventFilterOption(option)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default EventFilterChip
