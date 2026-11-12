import { renderHook } from '@testing-library/react'

import useTextOverrides, { TextOverridesProvider } from '..'
import type { TextOverrides } from '../types'

const DEFAULTS = {
  title: 'Comments',
  count: (count: number) => `${count} comments`,
}

const wrapper =
  (...layers: TextOverrides[]) =>
  ({ children }: { children: React.ReactNode }) =>
    layers.reduceRight(
      (inner, overrides) => (
        <TextOverridesProvider overrides={overrides}>{inner}</TextOverridesProvider>
      ),
      <>{children}</>,
    )

describe('useTextOverrides', () => {
  it('returns the defaults without a provider', () => {
    const { result } = renderHook(() => useTextOverrides('comments', DEFAULTS))
    expect(result.current).toBe(DEFAULTS)
  })

  it('replaces only the overridden keys of its namespace', () => {
    const { result } = renderHook(() => useTextOverrides('comments', DEFAULTS), {
      wrapper: wrapper({
        comments: { title: 'Comentários' },
        other: { title: 'Ignored' },
      }),
    })
    expect(result.current.title).toBe('Comentários')
    expect(result.current.count(2)).toBe('2 comments')
  })

  it('accepts function overrides and ignores unknown keys or mismatched types', () => {
    const { result } = renderHook(() => useTextOverrides('comments', DEFAULTS), {
      wrapper: wrapper({
        comments: {
          count: (count: number) => `${count} comentários`,
          title: (() => 'not a string') as unknown as string,
          extra: 'unused',
        },
      }),
    })
    expect(result.current.count(3)).toBe('3 comentários')
    expect(result.current.title).toBe('Comments')
    expect(result.current).not.toHaveProperty('extra')
  })

  it('merges nested providers key by key, inner first', () => {
    const { result } = renderHook(() => useTextOverrides('comments', DEFAULTS), {
      wrapper: wrapper(
        { comments: { title: 'Outer', count: () => 'outer count' } },
        { comments: { title: 'Inner' } },
      ),
    })
    expect(result.current.title).toBe('Inner')
    expect(result.current.count(1)).toBe('outer count')
  })
})
