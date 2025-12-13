import { ThemeConfig } from './types'

// Forest - Earthy, natural green theme
export const forestTheme: ThemeConfig = {
  name: 'Forest',
  id: 'forest',
  options: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
        contrastText: '#022C22',
      },
      secondary: {
        main: '#84CC16',
        light: '#A3E635',
        dark: '#65A30D',
        contrastText: '#1A2E05',
      },
      background: {
        default: '#022C22',
        paper: '#064E3B',
      },
      text: {
        primary: '#ECFDF5',
        secondary: '#A7F3D0',
      },
      divider: 'rgba(167, 243, 208, 0.12)',
      custom: {
        accent: '#10B981',
        accentLight: '#34D399',
        accentDark: '#059669',
        surface: '#064E3B',
        surfaceLight: '#065F46',
        surfaceDark: '#022C22',
        textMuted: '#6EE7B7',
        border: 'rgba(167, 243, 208, 0.2)',
        success: '#22C55E',
        warning: '#EAB308',
        error: '#F87171',
        info: '#22D3EE',
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
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(145deg, #064E3B 0%, #022C22 100%)',
            border: '1px solid rgba(167, 243, 208, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
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
              borderRadius: 8,
            },
          },
        },
      },
    },
  },
}

