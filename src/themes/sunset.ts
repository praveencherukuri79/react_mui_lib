import { ThemeConfig } from './types'

// Sunset - Warm, inviting orange/coral theme
export const sunsetTheme: ThemeConfig = {
  name: 'Sunset',
  id: 'sunset',
  options: {
    palette: {
      mode: 'light',
      primary: {
        main: '#F97316',
        light: '#FB923C',
        dark: '#EA580C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#F43F5E',
        light: '#FB7185',
        dark: '#E11D48',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#FFFBEB',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#451A03',
        secondary: '#78350F',
      },
      divider: 'rgba(249, 115, 22, 0.12)',
      custom: {
        accent: '#F97316',
        accentLight: '#FDBA74',
        accentDark: '#EA580C',
        surface: '#FFFFFF',
        surfaceLight: '#FFF7ED',
        surfaceDark: '#FED7AA',
        textMuted: '#92400E',
        border: 'rgba(249, 115, 22, 0.2)',
        success: '#22C55E',
        warning: '#EAB308',
        error: '#DC2626',
        info: '#0EA5E9',
      },
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(249, 115, 22, 0.35)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #F97316 0%, #F43F5E 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #EA580C 0%, #E11D48 100%)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: '#FFFFFF',
            border: '1px solid rgba(249, 115, 22, 0.1)',
            boxShadow: '0 4px 24px rgba(249, 115, 22, 0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
            },
          },
        },
      },
    },
  },
}

