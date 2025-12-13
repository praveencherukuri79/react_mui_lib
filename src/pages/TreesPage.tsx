import { Box, Typography } from '@mui/material'
import { TreeViewExample } from '@/components/examples/TreeViewExample'

export const TreesPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Tree Views
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        MUI X TreeView examples with custom icons and interactive file explorer patterns.
      </Typography>
      
      <TreeViewExample />
    </Box>
  )
}

