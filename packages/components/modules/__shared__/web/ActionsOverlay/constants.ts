export const HOVER_OVERLAY_MODES = {
  default: 'default',
  threeDotsMenu: 'three-dots-menu',
} as const

export const ACTIONS_OVERLAY_TEXTS_NAMESPACE = '__shared__.ActionsOverlay'

export const ACTIONS_OVERLAY_TEXTS = {
  defaultTitle: 'Item',
  deleteTitle: (title: string) => `Delete ${title}?`,
  deleteContent: 'Are you sure you want to delete? This action cannot be undone.',
  delete: 'Delete',
  actionsOverlay: 'actions overlay',
  deleteItem: 'delete item',
  showMenuOptions: 'Show menu options',
}
