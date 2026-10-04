import { shouldUseSecureCookies } from '..'

describe('shouldUseSecureCookies', () => {
  const originalLocation = window.location

  const setProtocol = (protocol: string) => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, protocol },
    })
  }

  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation })
  })

  it('is secure on HTTPS pages', () => {
    setProtocol('https:')
    expect(shouldUseSecureCookies()).toBe(true)
  })

  it('is not secure on plain-HTTP pages, whatever NODE_ENV says', () => {
    setProtocol('http:')
    expect(shouldUseSecureCookies()).toBe(false)
  })
})
