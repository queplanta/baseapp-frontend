'use client'

import type { FC } from 'react'

import { useFileSelect } from '@baseapp-frontend/components/files/common'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { COMMENTS_TEXTS, COMMENTS_TEXTS_NAMESPACE } from '../../../common/constants'
import type { CommentFilesUpsertActionsProps } from './types'

/**
 * SocialInput upsert-action bar for the comment composer: the attach icon
 * uploads files right away; they are attached to the comment once it is created
 * (see CommentCreate). The mention icon stays a placeholder until wired.
 */
const CommentFilesUpsertActions: FC<CommentFilesUpsertActionsProps> = ({
  onFilesSelected,
  isUploading = false,
  maxFiles,
  maxFileSize,
  acceptedFileTypes,
}) => {
  const texts = useTextOverrides(COMMENTS_TEXTS_NAMESPACE, COMMENTS_TEXTS)
  const { open, getInputProps } = useFileSelect({
    onFilesSelected,
    maxFiles,
    maxFileSize,
    acceptedFileTypes,
    disabled: isUploading,
  })

  return (
    <div className="grid grid-cols-[repeat(2,max-content)] gap-2">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <input {...getInputProps()} />
      <IconButton
        size="small"
        onClick={open}
        disabled={isUploading}
        isLoading={isUploading}
        aria-label={texts.attachFiles}
      >
        <AttachmentIcon />
      </IconButton>
      <IconButton disabled aria-label={texts.mention}>
        <MentionIcon />
      </IconButton>
    </div>
  )
}

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
