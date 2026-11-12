import { ACTIVITY_LOG_TEXTS } from './constants'

export const getUpdateMessage = (
  verb: string,
  diff: Record<string, any>,
  texts: Pick<
    typeof ACTIVITY_LOG_TEXTS,
    'updated' | 'updatedProfilePicture' | 'updatedProfileBanner' | 'updatedBio'
  > = ACTIVITY_LOG_TEXTS,
): string => {
  const baseMessage = texts.updated(verb.split('.')[0] ?? verb)

  if (!diff) {
    return baseMessage
  }

  const updateMessages: string[] = Object.keys(diff).map((key) => {
    switch (key) {
      case 'image':
        return texts.updatedProfilePicture
      case 'banner_image':
        return texts.updatedProfileBanner
      case 'biography':
        return texts.updatedBio
      default:
        return texts.updated(key.replace('_', ' '))
    }
  })

  return updateMessages.length > 0 ? updateMessages.join(', ') : baseMessage
}
