import { styled, Card, CardProps } from '@mui/material'

// ============================================
// STYLED CARD VARIANTS
// ============================================

// Gradient Border Card
export const GradientBorderCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  borderRadius: 16,
  padding: 24,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    padding: 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
}))

// Glass Card
export const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  padding: 24,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    border: `1px solid ${theme.palette.primary.main}40`,
  },
}))

// Elevated Card with hover effect
export const ElevatedCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  padding: 24,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
  },
}))

// Neon Glow Card
export const NeonCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  padding: 24,
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: `
    0 0 10px ${theme.palette.primary.main}40,
    0 0 20px ${theme.palette.primary.main}20,
    0 0 30px ${theme.palette.primary.main}10
  `,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `
      0 0 15px ${theme.palette.primary.main}60,
      0 0 30px ${theme.palette.primary.main}40,
      0 0 45px ${theme.palette.primary.main}20
    `,
  },
}))

// Interactive Card with press effect
interface InteractiveCardProps extends CardProps {
  isActive?: boolean
}

export const InteractiveCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<InteractiveCardProps>(({ theme, isActive }) => ({
  background: isActive
    ? `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`
    : theme.palette.background.paper,
  borderRadius: 16,
  padding: 20,
  border: isActive
    ? `2px solid ${theme.palette.primary.main}`
    : '2px solid transparent',
  boxShadow: isActive
    ? `0 4px 20px ${theme.palette.primary.main}30`
    : '0 2px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.02)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}))

// Stats Card with accent bar
export const StatsCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  borderRadius: 16,
  padding: 24,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}))

