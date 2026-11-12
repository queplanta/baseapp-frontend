import { z } from 'zod'

import { ProfileUpdateForm } from './types'
import { PROFILE_FORM_VALIDATION } from './zod'

export const PROFILE_FORM_VALUE: Record<keyof ProfileUpdateForm, keyof ProfileUpdateForm> = {
  id: 'id',
  bannerImage: 'bannerImage',
  biography: 'biography',
  image: 'image',
  name: 'name',
  phoneNumber: 'phoneNumber',
  urlPath: 'urlPath',
}

export const DEFAULT_PROFILE_FORM_VALUES: ProfileUpdateForm = {
  id: '',
  bannerImage: '',
  biography: '',
  image: '',
  name: '',
  phoneNumber: '',
  urlPath: '',
}

export const DEFAULT_PROFILE_FORM_VALIDATION = z.object({
  [PROFILE_FORM_VALUE.id]: z.any(),
  [PROFILE_FORM_VALUE.bannerImage]: z.any(),
  [PROFILE_FORM_VALUE.biography]: z.string(),
  [PROFILE_FORM_VALUE.image]: z.any(),
  [PROFILE_FORM_VALUE.name]: z.string().min(1, { message: PROFILE_FORM_VALIDATION.name.empty }),
  [PROFILE_FORM_VALUE.phoneNumber]: z.string(),
  [PROFILE_FORM_VALUE.urlPath]: z
    .string()
    .min(8, { message: PROFILE_FORM_VALIDATION.urlPath.empty })
    .regex(/^[a-zA-Z0-9]+$/, { message: PROFILE_FORM_VALIDATION.urlPath.invalid }),
})

// .svg is not supported by the backend, so better not use 'image/*'
export const DEFAULT_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_IMAGE_MAX_SIZE = 10 * 1024 * 1024
export const DEFAULT_BANNER_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_BANNER_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_BANNER_IMAGE_MAX_SIZE = 10 * 1024 * 1024

export const PROFILES_TEXTS_NAMESPACE = 'profiles'

/** Default (English) texts of the profile page components; see `useTextOverrides`. */
export const PROFILES_TEXTS = {
  editProfile: 'Edit Profile',
  shareProfile: 'Share profile',
  profileUrlCopied: 'Profile URL copied to clipboard!',
  bannerAlt: 'Home Banner',
  followers: 'Followers',
  following: 'Following',
  follow: 'Follow',
  blockProfile: 'Block profile',
  unblockProfile: 'Unblock profile',
  unblock: 'Unblock',
  blockTitle: (name: string) => `Block ${name}?`,
  unblockTitle: (name: string) => `Unblock ${name}?`,
  blockContent:
    "This person won’t be able to send you messages, find your profile or content. They won’t see your comments and reactions, and won't be able to mention or follow your profile. We won't notify them that they have been blocked.",
  unblockContent:
    "This person will be able to send you messages, find your profile or content. They will see your comments and reactions, and will be able to mention or follow your profile. We won't notify them that they have been unblocked.",
  blockAction: 'Block',
  unblockAction: 'Unblock',
  blockedToast: (name: string) => `${name} is blocked`,
  unblockedToast: (name: string) => `${name} is unblocked`,
  reportProfile: 'Report profile',
  report: 'Report',
  reportWhy: 'Why are you reporting this?',
  reportAnonymous:
    "Your report is anonymous. If someone is in immediate danger, call the local emergency services - don't wait.",
  reportDescribeTitle: 'How would you describe the problem?',
  reportDescribeHint: 'Use the text field below to explain what the problem you are reporting is.',
  reportPlaceholder: 'I find the post to be offensive...',
  confirm: 'Confirm',
  reportSummaryTitle: "You're about to submit a report",
  reportSubTypeQuestion: (type: string) => `What type of ${type}?`,
  reportAbout: 'About the problem',
  submitReport: 'Submit Report',
  reportThanks: (type: string) => `Thanks for reporting ${type}`,
  close: 'Close',
  alreadyReported: 'You have already reported this profile.',
}
