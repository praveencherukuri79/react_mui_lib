import { atom } from 'recoil'
import { ACTIVE_THEME_ID } from '@/themes'

// Theme state - stores the current theme ID
export const themeIdState = atom<string>({
  key: 'themeIdState',
  default: ACTIVE_THEME_ID,
})

