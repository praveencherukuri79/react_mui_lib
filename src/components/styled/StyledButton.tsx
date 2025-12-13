import { styled, Button, ButtonProps } from '@mui/material'

// ============================================
// STYLED BUTTON VARIANTS
// ============================================
// Demonstrates how to create custom styled MUI components

// Gradient Button with glow effect
export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: '#fff',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    boxShadow: `0 6px 28px ${theme.palette.primary.main}60`,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&:disabled': {
    background: theme.palette.action.disabledBackground,
    boxShadow: 'none',
  },
}))

// Outline Button with animated border
export const AnimatedOutlineButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  background: 'transparent',
  color: theme.palette.primary.main,
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  border: `2px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    background: `${theme.palette.primary.main}10`,
    borderColor: theme.palette.primary.light,
    '&::before': {
      left: '100%',
    },
  },
}))

// Soft Button (subtle background)
export const SoftButton = styled(Button)(({ theme }) => ({
  background: `${theme.palette.primary.main}15`,
  color: theme.palette.primary.main,
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  border: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: `${theme.palette.primary.main}25`,
  },
}))

// Glass Button (glassmorphism effect)
export const GlassButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  color: theme.palette.text.primary,
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
}))

// Icon Button with pulse animation
export const PulseIconButton = styled(Button)(({ theme }) => ({
  minWidth: 48,
  width: 48,
  height: 48,
  padding: 0,
  borderRadius: '50%',
  background: theme.palette.primary.main,
  color: '#fff',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}60`,
    },
    '70%': {
      boxShadow: `0 0 0 12px ${theme.palette.primary.main}00`,
    },
    '100%': {
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}00`,
    },
  },
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}))

// Loading Button with spinner
interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

export const LoadingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'loading',
})<LoadingButtonProps>(({ theme, loading }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  pointerEvents: loading ? 'none' : 'auto',
  '&::after': loading
    ? {
        content: '""',
        position: 'absolute',
        width: 20,
        height: 20,
        border: '2px solid transparent',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }
    : {},
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    opacity: loading ? 0 : 1,
  },
  '& span': {
    opacity: loading ? 0 : 1,
  },
}))

