// Theme exports - Add new themes here
export { midnightTheme } from './midnight'
export { auroraTheme } from './aurora'
export { forestTheme } from './forest'
export { sunsetTheme } from './sunset'
export type { ThemeConfig, CustomThemeColors } from './types'

import { midnightTheme } from './midnight'
import { auroraTheme } from './aurora'
import { forestTheme } from './forest'
import { sunsetTheme } from './sunset'
import { ThemeConfig } from './types'

// ============================================
// THEME CONFIGURATION
// ============================================
// To change the active theme, simply change this line:
export const ACTIVE_THEME_ID = 'midnight'

// All available themes
export const themes: ThemeConfig[] = [
  midnightTheme,
  auroraTheme,
  forestTheme,
  sunsetTheme,
]

// Get theme by ID
export const getThemeById = (id: string): ThemeConfig => {
  return themes.find((t) => t.id === id) || midnightTheme
}

// Get the currently active theme
export const getActiveTheme = (): ThemeConfig => {
  return getThemeById(ACTIVE_THEME_ID)
}

