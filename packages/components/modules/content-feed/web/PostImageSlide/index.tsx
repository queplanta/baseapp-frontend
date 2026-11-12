'use client'

import { FC } from 'react'

import { useTextOverrides } from '@baseapp-frontend/utils'

import { useFragment } from 'react-relay'

import { CONTENT_FEED_TEXTS, CONTENT_FEED_TEXTS_NAMESPACE } from '../../common/constants'
import { ContentPostImageFragment } from '../../common/graphql/fragments/ContentPostImage'
import { ImageSlide } from './styled'
import { PostImageSlideProps } from './types'

const PostImageSlide: FC<PostImageSlideProps> = ({ imagesRef }) => {
  const texts = useTextOverrides(CONTENT_FEED_TEXTS_NAMESPACE, CONTENT_FEED_TEXTS)
  const target = useFragment(ContentPostImageFragment, imagesRef)

  if (!target?.image) return null

  return <ImageSlide draggable={false} src={target.image ?? undefined} alt={texts.postImageAlt} />
}

export default PostImageSlide
