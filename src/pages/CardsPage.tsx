import { Box, Typography } from '@mui/material'
import { CardExamples } from '@/components/examples/CardExamples'

export const CardsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Card Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Various card styles including stats cards, project cards, team member cards, and pricing cards.
      </Typography>
      
      <CardExamples />
    </Box>
  )
}

