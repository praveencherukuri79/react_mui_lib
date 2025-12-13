import { ReactNode } from 'react'
import { Box } from '@mui/material'
import { TopNavbar } from './TopNavbar'

interface TopNavLayoutProps {
  children: ReactNode
}

export const TopNavLayout = ({ children }: TopNavLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopNavbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

