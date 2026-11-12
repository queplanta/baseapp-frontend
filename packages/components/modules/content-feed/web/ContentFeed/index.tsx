'use client'

import { FC, useCallback } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { CONTENT_FEED_TEXTS, CONTENT_FEED_TEXTS_NAMESPACE } from '../../common/constants'
import PostList from '../PostList'
import { HeaderContainer, RootContainer } from '../styled'
import { ContentFeedProps } from './types'

const ContentFeed: FC<ContentFeedProps> = ({ preloadedQuery }) => {
  const texts = useTextOverrides(CONTENT_FEED_TEXTS_NAMESPACE, CONTENT_FEED_TEXTS)
  const router = useRouter()

  const onNewPost = useCallback(() => {
    router.push('/posts/new')
  }, [router])

  return (
    <RootContainer>
      <HeaderContainer>
        <Typography component="h4" variant="h4">
          {texts.title}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onNewPost}
          disableRipple
          sx={{ maxWidth: 'fit-content' }}
        >
          {texts.newPost}
        </Button>
      </HeaderContainer>

      <PostList preloadedQuery={preloadedQuery} />
    </RootContainer>
  )
}

export default ContentFeed
