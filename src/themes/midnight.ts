import { ThemeConfig } from './types'

// Midnight Blue - Deep, sophisticated dark theme
export const midnightTheme: ThemeConfig = {
  name: 'Midnight',
  id: 'midnight',
  options: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
        contrastText: '#0F172A',
      },
      secondary: {
        main: '#A78BFA',
        light: '#C4B5FD',
        dark: '#8B5CF6',
        contrastText: '#0F172A',
      },
      background: {
        default: '#0F172A',
        paper: '#1E293B',
      },
      text: {
        primary: '#F1F5F9',
        secondary: '#94A3B8',
      },
      divider: 'rgba(148, 163, 184, 0.12)',
      custom: {
        accent: '#60A5FA',
        accentLight: '#93C5FD',
        accentDark: '#3B82F6',
        surface: '#1E293B',
        surfaceLight: '#334155',
        surfaceDark: '#0F172A',
        textMuted: '#64748B',
        border: 'rgba(148, 163, 184, 0.2)',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#38BDF8',
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
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
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

