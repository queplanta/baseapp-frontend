---
"@baseapp-frontend/utils": patch
"@baseapp-frontend/authentication": patch
---

Token cookies are `Secure` only when the page is served over HTTPS. Keying the flag on
`NODE_ENV` broke login on production builds served over plain HTTP (a LAN or a staging host
without TLS): browsers drop `Secure` cookies set from HTTP pages, so the tokens were never
stored and `/users/me` answered 401.

- New `shouldUseSecureCookies()` in `@baseapp-frontend/utils`: the page's protocol in the
  browser, the previous `NODE_ENV` rule elsewhere.
- `useLogin` and `refreshAccessToken` use it.
