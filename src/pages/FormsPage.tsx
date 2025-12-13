import { Box, Typography } from '@mui/material'
import { FormExamples } from '@/components/examples/FormExample'

export const FormsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Form Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Config-based form controls with Zod validation. Build forms by passing configuration objects.
      </Typography>
      
      <FormExamples />
    </Box>
  )
}

