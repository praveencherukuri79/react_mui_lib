import { Box, Typography, Chip } from '@mui/material'
import { JsonConfigEditor } from '@/components/examples/JsonConfigEditor'

export function JsonEditorPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        JSON Config Editor
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Edit JSON configuration with Form or Tree view. Uses Immer for immutable updates.
        </Typography>
        <Chip label="Immer" size="small" color="primary" />
      </Box>

      <JsonConfigEditor />
    </Box>
  )
}

