/**
 * Whether token cookies should be `Secure`.
 *
 * Browsers drop `Secure` cookies set from plain-HTTP pages (except on localhost), so keying the
 * flag on `NODE_ENV` breaks login on a production build served over HTTP, e.g. on a LAN or a
 * staging host without TLS: the tokens are never stored and every request is anonymous. In the
 * browser this follows the page's protocol; elsewhere (SSR, native) it keeps the `NODE_ENV` rule.
 */
export const shouldUseSecureCookies = (): boolean => {
  if (typeof window !== 'undefined' && window.location?.protocol) {
    return window.location.protocol === 'https:'
  }
  return process.env.NODE_ENV === 'production'
}
