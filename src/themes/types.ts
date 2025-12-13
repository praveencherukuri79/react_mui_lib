import { ThemeOptions } from '@mui/material'

export interface CustomThemeColors {
  accent: string
  accentLight: string
  accentDark: string
  surface: string
  surfaceLight: string
  surfaceDark: string
  textMuted: string
  border: string
  success: string
  warning: string
  error: string
  info: string
}

declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomThemeColors
  }
  interface ThemeOptions {
    custom?: CustomThemeColors
  }
  interface Palette {
    custom: CustomThemeColors
  }
  interface PaletteOptions {
    custom?: CustomThemeColors
  }
}

export interface ThemeConfig {
  name: string
  id: string
  options: ThemeOptions
}

