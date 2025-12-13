import { Box, Typography } from '@mui/material'
import { NavbarExamples } from '@/components/examples/NavbarExamples'

export const NavbarsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Navigation Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Multiple navbar variations including gradient, glass, minimal, and sidebar navigation patterns.
      </Typography>
      
      <NavbarExamples />
    </Box>
  )
}

