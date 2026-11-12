'use client'

import { FC } from 'react'

import { TextField } from '@baseapp-frontend/design-system/components/web/inputs'
import { useTextOverrides } from '@baseapp-frontend/utils'

import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

import { CONTENT_FEED_TEXTS, CONTENT_FEED_TEXTS_NAMESPACE } from '../../common/constants'
import PostImageDropzone from '../PostImageDropzone'
import { ButtonContainer, HeaderContainer, RootContainer } from '../styled'
import { PostFormProps } from './types'

const PostForm: FC<PostFormProps> = ({ form, onSubmit, onCancel, isSaving }) => {
  const texts = useTextOverrides(CONTENT_FEED_TEXTS_NAMESPACE, CONTENT_FEED_TEXTS)
  const isReactionsEnabled = form.watch('isReactionsEnabled')
  const {
    formState: { isDirty, isValid },
  } = form

  return (
    <RootContainer>
      <form onSubmit={onSubmit}>
        <HeaderContainer>
          <Typography component="h4" variant="h4">
            {texts.newPost}
          </Typography>
          <ButtonContainer>
            <Button variant="outlined" color="inherit" onClick={onCancel} disableRipple>
              {texts.cancel}
            </Button>
            <LoadingButton
              color="inherit"
              type="submit"
              loading={isSaving}
              disabled={!isDirty || !isValid || isSaving}
              sx={{ maxWidth: 'fit-content', justifySelf: 'end' }}
            >
              {texts.publish}
            </LoadingButton>
          </ButtonContainer>
        </HeaderContainer>
        <PostImageDropzone form={form} />
        <Box>
          <TextField
            name="content"
            type="text"
            placeholder={texts.contentPlaceholder}
            multiline
            rows={4}
            control={form.control}
          />
        </Box>
        <Controller
          name="isReactionsEnabled"
          control={form.control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked={!isReactionsEnabled}
                  onChange={(e: { target: { checked: boolean } }) =>
                    field.onChange(!e.target.checked)
                  }
                />
              }
              label={texts.disableReactions}
            />
          )}
        />
      </form>
    </RootContainer>
  )
}

export default PostForm
