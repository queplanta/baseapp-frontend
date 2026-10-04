import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { getAccessToken } from '../getAccessToken'
import { removeTokenAsync } from '../removeTokenAsync'
import { setTokenAsync } from '../setTokenAsync'
import { shouldUseSecureCookies } from '../shouldUseSecureCookies'
import { RefreshAccessTokenParams } from './types'

export const refreshAccessToken = async ({
  refreshToken,
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
}: RefreshAccessTokenParams) => {
  try {
    const accessToken = await getAccessToken(refreshToken)

    await setTokenAsync(accessKeyName, accessToken, {
      secure: shouldUseSecureCookies(),
    })

    return accessToken
  } catch (error) {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)

    return Promise.reject(error)
  }
}
