import { Box, Typography, Paper, Divider, useTheme } from '@mui/material'

export const TypographyPage = () => {
  const theme = useTheme()

  const typographyVariants = [
    { variant: 'h1', label: 'Heading 1', sample: 'The quick brown fox' },
    { variant: 'h2', label: 'Heading 2', sample: 'The quick brown fox jumps' },
    { variant: 'h3', label: 'Heading 3', sample: 'The quick brown fox jumps over' },
    { variant: 'h4', label: 'Heading 4', sample: 'The quick brown fox jumps over the lazy dog' },
    { variant: 'h5', label: 'Heading 5', sample: 'The quick brown fox jumps over the lazy dog' },
    { variant: 'h6', label: 'Heading 6', sample: 'The quick brown fox jumps over the lazy dog' },
    { variant: 'subtitle1', label: 'Subtitle 1', sample: 'The quick brown fox jumps over the lazy dog' },
    { variant: 'subtitle2', label: 'Subtitle 2', sample: 'The quick brown fox jumps over the lazy dog' },
    { variant: 'body1', label: 'Body 1', sample: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { variant: 'body2', label: 'Body 2', sample: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { variant: 'caption', label: 'Caption', sample: 'This is caption text used for smaller annotations' },
    { variant: 'overline', label: 'Overline', sample: 'Overline text' },
    { variant: 'button', label: 'Button', sample: 'Button Text Style' },
  ] as const

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Typography
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Typography scale and text styles. Font family: {theme.typography.fontFamily}
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {typographyVariants.map((item, index) => (
          <Box key={item.variant}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  minWidth: 80,
                  fontFamily: 'monospace',
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              >
                {item.variant}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
            </Box>
            <Typography
              variant={item.variant}
              sx={{
                mb: 2,
                display: 'block',
              }}
            >
              {item.sample}
            </Typography>
            {index < typographyVariants.length - 1 && (
              <Divider sx={{ my: 3 }} />
            )}
          </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 3, mt: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Font Weights
        </Typography>
        {[300, 400, 500, 600, 700].map((weight) => (
          <Typography
            key={weight}
            sx={{
              fontWeight: weight,
              mb: 2,
            }}
          >
            Font Weight {weight} - The quick brown fox jumps over the lazy dog
          </Typography>
        ))}
      </Paper>
    </Box>
  )
}

