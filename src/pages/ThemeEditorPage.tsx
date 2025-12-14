import { Box, Typography, Chip } from '@mui/material'
import { ThemeEditor } from '@/components/examples/ThemeEditor'

export function ThemeEditorPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Theme Editor
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Customize theme colors and export the configuration
        </Typography>
        <Chip label="Experimental" size="small" color="warning" />
      </Box>

      <ThemeEditor />
    </Box>
  )
}

