import { ThemeConfig } from './types'

// Aurora - Vibrant gradient-inspired light theme
export const auroraTheme: ThemeConfig = {
  name: 'Aurora',
  id: 'aurora',
  options: {
    palette: {
      mode: 'light',
      primary: {
        main: '#7C3AED',
        light: '#A78BFA',
        dark: '#5B21B6',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#EC4899',
        light: '#F472B6',
        dark: '#DB2777',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#FAF5FF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1E1B4B',
        secondary: '#4C1D95',
      },
      divider: 'rgba(124, 58, 237, 0.12)',
      custom: {
        accent: '#7C3AED',
        accentLight: '#A78BFA',
        accentDark: '#5B21B6',
        surface: '#FFFFFF',
        surfaceLight: '#F5F3FF',
        surfaceDark: '#EDE9FE',
        textMuted: '#6B7280',
        border: 'rgba(124, 58, 237, 0.2)',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#06B6D4',
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
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6D28D9 0%, #DB2777 100%)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: '#FFFFFF',
            border: '1px solid rgba(124, 58, 237, 0.1)',
            boxShadow: '0 4px 24px rgba(124, 58, 237, 0.08)',
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
              borderRadius: 12,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  },
}

