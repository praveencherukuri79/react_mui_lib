import { Box, Typography, Paper, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'

export const ThemeColorsPage = () => {
  const theme = useTheme()

  const colorGroups = [
    {
      name: 'Primary',
      colors: [
        { label: 'Main', color: theme.palette.primary.main },
        { label: 'Light', color: theme.palette.primary.light },
        { label: 'Dark', color: theme.palette.primary.dark },
        { label: 'Contrast Text', color: theme.palette.primary.contrastText, bg: theme.palette.primary.main },
      ],
    },
    {
      name: 'Secondary',
      colors: [
        { label: 'Main', color: theme.palette.secondary.main },
        { label: 'Light', color: theme.palette.secondary.light },
        { label: 'Dark', color: theme.palette.secondary.dark },
        { label: 'Contrast Text', color: theme.palette.secondary.contrastText, bg: theme.palette.secondary.main },
      ],
    },
    {
      name: 'Background',
      colors: [
        { label: 'Default', color: theme.palette.background.default },
        { label: 'Paper', color: theme.palette.background.paper },
      ],
    },
    {
      name: 'Text',
      colors: [
        { label: 'Primary', color: theme.palette.text.primary },
        { label: 'Secondary', color: theme.palette.text.secondary },
        { label: 'Disabled', color: theme.palette.text.disabled },
      ],
    },
    {
      name: 'Status',
      colors: [
        { label: 'Success', color: theme.palette.success.main },
        { label: 'Warning', color: theme.palette.warning.main },
        { label: 'Error', color: theme.palette.error.main },
        { label: 'Info', color: theme.palette.info.main },
      ],
    },
  ]

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Theme Colors
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Current theme color palette. Switch themes using the sidebar selector.
      </Typography>

      {colorGroups.map((group) => (
        <Paper key={group.name} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {group.name}
          </Typography>
          <Grid container spacing={2}>
            {group.colors.map((item) => (
              <Grid key={item.label} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  sx={{
                    height: 80,
                    borderRadius: 2,
                    bgcolor: item.bg || item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 1,
                  }}
                >
                  {item.bg && (
                    <Typography sx={{ color: item.color, fontWeight: 600 }}>
                      Aa
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" fontWeight={500}>
                  {item.label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {item.color}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}

