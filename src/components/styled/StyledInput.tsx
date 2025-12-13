import { styled, TextField, Chip, Badge, Avatar } from '@mui/material'

// ============================================
// STYLED INPUT VARIANTS
// ============================================

// Modern Input with floating label
export const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: theme.palette.background.paper,
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: theme.palette.divider,
      transition: 'all 0.2s ease',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      background: `${theme.palette.primary.main}05`,
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}))

// Search Input with icon
export const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    background: `${theme.palette.background.paper}`,
    paddingLeft: 8,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}))

// Underline Input (material style)
export const UnderlineInput = styled(TextField)(({ theme }) => ({
  '& .MuiInput-underline': {
    '&:before': {
      borderBottomColor: theme.palette.divider,
    },
    '&:hover:before': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
  },
}))

// ============================================
// STYLED CHIP VARIANTS
// ============================================

// Gradient Chip
export const GradientChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: '#fff',
  fontWeight: 600,
  border: 'none',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: '#fff',
    },
  },
}))

// Soft Chip
export const SoftChip = styled(Chip)(({ theme }) => ({
  background: `${theme.palette.primary.main}15`,
  color: theme.palette.primary.main,
  fontWeight: 500,
  border: 'none',
  '&:hover': {
    background: `${theme.palette.primary.main}25`,
  },
}))

// Outlined Chip with glow
export const GlowChip = styled(Chip)(({ theme }) => ({
  background: 'transparent',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontWeight: 500,
  boxShadow: `0 0 10px ${theme.palette.primary.main}30`,
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: `0 0 15px ${theme.palette.primary.main}50`,
    background: `${theme.palette.primary.main}10`,
  },
}))

// Status Chip with dot indicator
interface StatusChipProps {
  status: 'success' | 'warning' | 'error' | 'info'
}

export const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<StatusChipProps>(({ status }) => {
  const colors = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  }
  const color = colors[status]
  
  return {
    background: `${color}15`,
    color: color,
    fontWeight: 500,
    paddingLeft: 8,
    '&::before': {
      content: '""',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color,
      marginRight: 8,
    },
  }
})

// ============================================
// STYLED BADGE VARIANTS
// ============================================

// Pulsing Badge
export const PulsingBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'pulse-badge 1.2s infinite ease-in-out',
      border: `2px solid ${theme.palette.error.main}`,
      content: '""',
    },
  },
  '@keyframes pulse-badge': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
}))

// ============================================
// STYLED AVATAR VARIANTS
// ============================================

// Gradient Avatar
export const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  fontWeight: 600,
}))

// Bordered Avatar
export const BorderedAvatar = styled(Avatar)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
}))

// Status Avatar with online indicator
interface StatusAvatarProps {
  isOnline?: boolean
}

export const StatusAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})<StatusAvatarProps>(({ theme, isOnline }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: isOnline ? '#10B981' : '#6B7280',
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))

