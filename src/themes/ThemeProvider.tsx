import { ReactNode, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { themeIdState } from '@/state/themeState'
import { getThemeById } from './index'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeId = useRecoilValue(themeIdState)
  
  const theme = useMemo(() => {
    const themeConfig = getThemeById(themeId)
    return createTheme(themeConfig.options)
  }, [themeId])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

