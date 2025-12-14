import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Alert,
  Snackbar,
  Tooltip,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RefreshIcon from '@mui/icons-material/Refresh'
import DownloadIcon from '@mui/icons-material/Download'
import { themes, ThemeConfig } from '@/themes'

// =============================================================================
// TYPES
// =============================================================================

interface ColorValue {
  label: string
  path: string
  value: string
}

interface ColorSection {
  title: string
  colors: ColorValue[]
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getNestedValue(obj: unknown, path: string): string {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part]
    }
    return ''
  }, obj) as string
}

function setNestedValue(obj: unknown, path: string, value: string): unknown {
  const parts = path.split('.')
  const result = JSON.parse(JSON.stringify(obj)) // Deep clone

  let current: Record<string, unknown> = result
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {}
    current = current[parts[i]] as Record<string, unknown>
  }
  current[parts[parts.length - 1]] = value

  return result
}

function generateThemeCode(theme: ThemeConfig): string {
  return `import { ThemeConfig } from './types'

export const ${theme.id}Theme: ThemeConfig = ${JSON.stringify(theme, null, 2)}
`
}

// =============================================================================
// COLOR PICKER COMPONENT
// =============================================================================

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    // Only update if valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue) || /^rgba?\(/.test(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="input"
        type="color"
        value={value.startsWith('#') ? value.slice(0, 7) : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          width: 40,
          height: 40,
          border: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          p: 0,
          '&::-webkit-color-swatch-wrapper': { p: 0 },
          '&::-webkit-color-swatch': { borderRadius: 4, border: '2px solid rgba(255,255,255,0.2)' },
        }}
      />
      <TextField
        size="small"
        label={label}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        sx={{ flex: 1 }}
      />
    </Box>
  )
}

// =============================================================================
// THEME EDITOR COMPONENT
// =============================================================================

export function ThemeEditor() {
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.id || '')
  const [editedTheme, setEditedTheme] = useState<ThemeConfig | null>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Load theme when selection changes
  useEffect(() => {
    const theme = themes.find((t) => t.id === selectedThemeId)
    if (theme) {
      setEditedTheme(JSON.parse(JSON.stringify(theme))) // Deep clone
    }
  }, [selectedThemeId])

  if (!editedTheme) return null

  // Define color sections
  const colorSections: ColorSection[] = [
    {
      title: 'Primary Colors',
      colors: [
        { label: 'Main', path: 'options.palette.primary.main', value: getNestedValue(editedTheme, 'options.palette.primary.main') },
        { label: 'Light', path: 'options.palette.primary.light', value: getNestedValue(editedTheme, 'options.palette.primary.light') },
        { label: 'Dark', path: 'options.palette.primary.dark', value: getNestedValue(editedTheme, 'options.palette.primary.dark') },
        { label: 'Contrast', path: 'options.palette.primary.contrastText', value: getNestedValue(editedTheme, 'options.palette.primary.contrastText') },
      ],
    },
    {
      title: 'Secondary Colors',
      colors: [
        { label: 'Main', path: 'options.palette.secondary.main', value: getNestedValue(editedTheme, 'options.palette.secondary.main') },
        { label: 'Light', path: 'options.palette.secondary.light', value: getNestedValue(editedTheme, 'options.palette.secondary.light') },
        { label: 'Dark', path: 'options.palette.secondary.dark', value: getNestedValue(editedTheme, 'options.palette.secondary.dark') },
        { label: 'Contrast', path: 'options.palette.secondary.contrastText', value: getNestedValue(editedTheme, 'options.palette.secondary.contrastText') },
      ],
    },
    {
      title: 'Background',
      colors: [
        { label: 'Default', path: 'options.palette.background.default', value: getNestedValue(editedTheme, 'options.palette.background.default') },
        { label: 'Paper', path: 'options.palette.background.paper', value: getNestedValue(editedTheme, 'options.palette.background.paper') },
      ],
    },
    {
      title: 'Text',
      colors: [
        { label: 'Primary', path: 'options.palette.text.primary', value: getNestedValue(editedTheme, 'options.palette.text.primary') },
        { label: 'Secondary', path: 'options.palette.text.secondary', value: getNestedValue(editedTheme, 'options.palette.text.secondary') },
      ],
    },
    {
      title: 'Custom Colors',
      colors: [
        { label: 'Accent', path: 'options.palette.custom.accent', value: getNestedValue(editedTheme, 'options.palette.custom.accent') },
        { label: 'Success', path: 'options.palette.custom.success', value: getNestedValue(editedTheme, 'options.palette.custom.success') },
        { label: 'Warning', path: 'options.palette.custom.warning', value: getNestedValue(editedTheme, 'options.palette.custom.warning') },
        { label: 'Error', path: 'options.palette.custom.error', value: getNestedValue(editedTheme, 'options.palette.custom.error') },
        { label: 'Info', path: 'options.palette.custom.info', value: getNestedValue(editedTheme, 'options.palette.custom.info') },
      ],
    },
  ]

  const handleColorChange = (path: string, value: string) => {
    setEditedTheme((prev) => {
      if (!prev) return prev
      return setNestedValue(prev, path, value) as ThemeConfig
    })
  }

  const handleCopyCode = () => {
    const code = generateThemeCode(editedTheme)
    navigator.clipboard.writeText(code)
    setSnackbar({ open: true, message: 'Theme code copied to clipboard!' })
  }

  const handleDownload = () => {
    const code = generateThemeCode(editedTheme)
    const blob = new Blob([code], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${editedTheme.id}.ts`
    a.click()
    URL.revokeObjectURL(url)
    setSnackbar({ open: true, message: 'Theme file downloaded!' })
  }

  const handleReset = () => {
    const original = themes.find((t) => t.id === selectedThemeId)
    if (original) {
      setEditedTheme(JSON.parse(JSON.stringify(original)))
      setSnackbar({ open: true, message: 'Theme reset to original values' })
    }
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Theme Editor</Typography>

      <Grid container spacing={4}>
        {/* Left: Editor */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            {/* Theme Selector */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select Theme</InputLabel>
                <Select
                  value={selectedThemeId}
                  label="Select Theme"
                  onChange={(e) => setSelectedThemeId(e.target.value)}
                >
                  {themes.map((t) => (
                    <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                label="Theme Name"
                value={editedTheme.name}
                onChange={(e) => setEditedTheme({ ...editedTheme, name: e.target.value })}
                sx={{ flex: 1 }}
              />

              <Tooltip title="Reset to original">
                <IconButton onClick={handleReset}><RefreshIcon /></IconButton>
              </Tooltip>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Color Sections */}
            {colorSections.map((section) => (
              <Box key={section.title} sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  {section.title}
                </Typography>
                <Grid container spacing={2}>
                  {section.colors.map((color) => (
                    <Grid key={color.path} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ColorPicker
                        label={color.label}
                        value={color.value || '#000000'}
                        onChange={(val) => handleColorChange(color.path, val)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {/* Typography Settings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Typography
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Font Family"
                    value={getNestedValue(editedTheme, 'options.typography.fontFamily') || ''}
                    onChange={(e) => handleColorChange('options.typography.fontFamily', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Border Radius"
                    value={getNestedValue(editedTheme, 'options.shape.borderRadius') || 12}
                    onChange={(e) => handleColorChange('options.shape.borderRadius', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={handleCopyCode}>
                Copy Code
              </Button>
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>
                Download File
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Preview */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
              Preview
            </Typography>

            {/* Color Swatches */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary">Primary</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {['primary.dark', 'primary.main', 'primary.light'].map((key) => (
                  <Box
                    key={key}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: getNestedValue(editedTheme, `options.palette.${key}`),
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary">Secondary</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {['secondary.dark', 'secondary.main', 'secondary.light'].map((key) => (
                  <Box
                    key={key}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: getNestedValue(editedTheme, `options.palette.${key}`),
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary">Background</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {['background.default', 'background.paper'].map((key) => (
                  <Box
                    key={key}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: getNestedValue(editedTheme, `options.palette.${key}`),
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Sample Components */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: getNestedValue(editedTheme, 'options.palette.background.paper'),
              }}
            >
              <Typography
                sx={{
                  color: getNestedValue(editedTheme, 'options.palette.text.primary'),
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Sample Text
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: getNestedValue(editedTheme, 'options.palette.text.secondary'),
                  mb: 2,
                }}
              >
                Secondary text color preview
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    bgcolor: getNestedValue(editedTheme, 'options.palette.primary.main'),
                    color: getNestedValue(editedTheme, 'options.palette.primary.contrastText'),
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Primary
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    bgcolor: getNestedValue(editedTheme, 'options.palette.secondary.main'),
                    color: getNestedValue(editedTheme, 'options.palette.secondary.contrastText'),
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Secondary
                </Box>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mt: 3 }}>
              Edit colors and copy the generated code to update your theme file.
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

