import { Box, Typography } from '@mui/material'
import { DataTableExample } from '@/components/examples/DataTableExample'

export const TablesPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Data Tables
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        MUI X DataGrid examples with custom styling, sorting, filtering, and pagination.
      </Typography>
      
      <DataTableExample />
    </Box>
  )
}

