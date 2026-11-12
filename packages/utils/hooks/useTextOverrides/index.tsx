'use client'

import { createContext, useContext, useMemo } from 'react'

import type { TextOverrides, TextOverridesProviderProps, TextsRecord } from './types'

const TextOverridesContext = createContext<TextOverrides>({})

/**
 * Lets an app replace the default (English) texts of the shared components, e.g. to translate
 * them: `overrides` maps each component's namespace to the texts it replaces. Providers can be
 * nested; inner overrides win, key by key.
 */
export const TextOverridesProvider = ({ overrides = {}, children }: TextOverridesProviderProps) => {
  const parent = useContext(TextOverridesContext)
  const value = useMemo(() => {
    const merged: TextOverrides = { ...parent }
    Object.entries(overrides).forEach(([namespace, texts]) => {
      merged[namespace] = { ...parent[namespace], ...texts }
    })
    return merged
  }, [parent, overrides])

  return <TextOverridesContext.Provider value={value}>{children}</TextOverridesContext.Provider>
}

/**
 * A component's texts: its `defaults`, with whatever the closest `TextOverridesProvider` sets
 * for `namespace` on top. Overrides with the wrong type (a string for a function text, or the
 * other way round) are ignored.
 */
const useTextOverrides = <T extends TextsRecord>(namespace: string, defaults: T): T => {
  const overrides = useContext(TextOverridesContext)[namespace]
  return useMemo(() => {
    if (!overrides) return defaults
    const texts: Record<string, unknown> = { ...defaults }
    Object.entries(overrides).forEach(([key, value]) => {
      if (key in defaults && typeof value === typeof defaults[key]) texts[key] = value
    })
    return texts as T
  }, [defaults, overrides])
}

export default useTextOverrides
