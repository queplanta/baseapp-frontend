import type { PropsWithChildren } from 'react'

/** A component's UI texts: plain strings, or functions for texts that interpolate values. */
export type TextsRecord = Record<string, string | ((...args: any[]) => string)>

/**
 * Overrides of the components' default (English) texts, keyed by namespace (each component
 * declares its own, e.g. `'comments.CommentCreate'`). Any key may be left out: the default
 * text is used for it.
 */
export type TextOverrides = Record<string, Partial<TextsRecord> | undefined>

export interface TextOverridesProviderProps extends PropsWithChildren {
  overrides?: TextOverrides
}
