import { Box, Typography } from '@mui/material'
import { DialogExamples } from '@/components/examples/DialogExample'

export const DialogsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Async Dialog System
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Promise-based dialog wrappers that simplify dialog management. No more tracking dialog state manually!
      </Typography>
      
      <DialogExamples />
    </Box>
  )
}

