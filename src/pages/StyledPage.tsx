import { Box, Typography, Paper, useTheme, InputAdornment, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  GradientButton,
  AnimatedOutlineButton,
  SoftButton,
  GlassButton,
  PulseIconButton,
  LoadingButton,
} from '@/components/styled/StyledButton'
import {
  GradientBorderCard,
  GlassCard,
  ElevatedCard,
  NeonCard,
  StatsCard,
} from '@/components/styled/StyledCard'
import {
  ModernTextField,
  SearchInput,
  GradientChip,
  SoftChip,
  GlowChip,
  StatusChip,
  GradientAvatar,
  BorderedAvatar,
  PulsingBadge,
} from '@/components/styled/StyledInput'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

export const StyledPage = () => {
  const theme = useTheme()

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Styled Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Custom styled MUI components demonstrating how to create reusable, branded UI elements.
      </Typography>

      {/* Buttons Section */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Button Variants
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <GradientButton>Gradient Button</GradientButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <AnimatedOutlineButton>Animated Outline</AnimatedOutlineButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <SoftButton>Soft Button</SoftButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <GlassButton>Glass Button</GlassButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <PulseIconButton>
              <AddIcon />
            </PulseIconButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
            <LoadingButton loading>Loading</LoadingButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Cards Section */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Card Variants
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <GradientBorderCard>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Gradient Border
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Card with animated gradient border effect
              </Typography>
            </GradientBorderCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <GlassCard>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Glass Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frosted glass effect with blur backdrop
              </Typography>
            </GlassCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ElevatedCard>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Elevated Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hover to see the lift animation
              </Typography>
            </ElevatedCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <NeonCard>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Neon Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Glowing neon border effect
              </Typography>
            </NeonCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <StatsCard>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Stats Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Card with accent bar indicator
              </Typography>
            </StatsCard>
          </Grid>
        </Grid>
      </Paper>

      {/* Inputs Section */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Input Variants
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ModernTextField label="Modern Input" placeholder="Type something..." />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SearchInput
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Chips Section */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Chip Variants
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <GradientChip label="Gradient Chip" onDelete={() => {}} />
          <SoftChip label="Soft Chip" />
          <GlowChip label="Glow Chip" />
          <StatusChip status="success" label="Success" />
          <StatusChip status="warning" label="Warning" />
          <StatusChip status="error" label="Error" />
          <StatusChip status="info" label="Info" />
        </Box>
      </Paper>

      {/* Avatars Section */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Avatar & Badge Variants
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <GradientAvatar sx={{ width: 56, height: 56 }}>JD</GradientAvatar>
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Gradient
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <BorderedAvatar sx={{ width: 56, height: 56 }}>AB</BorderedAvatar>
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Bordered
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <PulsingBadge badgeContent={3}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: theme.palette.primary.main }}>
                CD
              </Avatar>
            </PulsingBadge>
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Pulsing Badge
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Code Example */}
      <Paper sx={{ p: 4, borderRadius: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          How to Create Styled Components
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.default',
            overflow: 'auto',
            fontSize: '0.85rem',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
{`import { styled, Button } from '@mui/material'

// Create a gradient button using MUI's styled API
export const GradientButton = styled(Button)(({ theme }) => ({
  background: \`linear-gradient(135deg, 
    \${theme.palette.primary.main} 0%, 
    \${theme.palette.secondary.main} 100%)\`,
  color: '#fff',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: 12,
  boxShadow: \`0 4px 20px \${theme.palette.primary.main}40\`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: \`0 6px 28px \${theme.palette.primary.main}60\`,
  },
}))`}
        </Box>
      </Paper>
    </Box>
  )
}

