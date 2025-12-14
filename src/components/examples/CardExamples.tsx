import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Chip,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  GradientBorderCard,
  GlassCard,
  NeonCard,
  StatsCard,
} from '../styled/StyledCard'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'

// ============================================
// CARD EXAMPLES
// ============================================

// Stats Card Component
interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const theme = useTheme()
  const isPositive = change >= 0

  return (
    <StatsCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: `${theme.palette.primary.main}15`,
            color: theme.palette.primary.main,
          }}
        >
          {icon}
        </Box>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Chip
          size="small"
          icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
          label={`${isPositive ? '+' : ''}${change}%`}
          sx={{
            height: 24,
            bgcolor: isPositive ? 'success.main' : 'error.main',
            color: '#fff',
            '& .MuiChip-icon': { color: '#fff', fontSize: 16 },
          }}
        />
      </Box>
    </StatsCard>
  )
}

// Project Card Component
const ProjectCard = () => {
  const theme = useTheme()

  return (
    <GradientBorderCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Chip label="In Progress" size="small" color="primary" />
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        Website Redesign
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Redesigning the company website with a modern look and improved UX.
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            Progress
          </Typography>
          <Typography variant="body2" color="primary.main" fontWeight={600}>
            68%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={68}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: `${theme.palette.primary.main}20`,
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>A</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>B</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.success.main }}>C</Avatar>
          <Avatar sx={{ bgcolor: theme.palette.warning.main }}>D</Avatar>
        </AvatarGroup>
        <Typography variant="caption" color="text.secondary">
          Due in 5 days
        </Typography>
      </Box>
    </GradientBorderCard>
  )
}

// Team Member Card
const TeamMemberCard = () => {
  const theme = useTheme()

  return (
    <GlassCard>
      <Box sx={{ textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            fontSize: '2rem',
          }}
        >
          JD
        </Avatar>
        <Typography variant="h6" fontWeight={600}>
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Senior Developer
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          <Chip label="React" size="small" variant="outlined" />
          <Chip label="TypeScript" size="small" variant="outlined" />
        </Box>
        <Button variant="contained" fullWidth>
          View Profile
        </Button>
      </Box>
    </GlassCard>
  )
}

// Pricing Card
const PricingCard = () => {
  const theme = useTheme()

  return (
    <NeonCard>
      <Box sx={{ textAlign: 'center' }}>
        <Chip label="Popular" size="small" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
          Pro Plan
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 3 }}>
          <Typography variant="h3" fontWeight={700}>
            $29
          </Typography>
          <Typography variant="body2" color="text.secondary">
            /month
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left', mb: 3 }}>
          {['Unlimited projects', 'Priority support', 'Custom branding', 'Analytics dashboard'].map(
            (feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                  }}
                >
                  ✓
                </Box>
                <Typography variant="body2">{feature}</Typography>
              </Box>
            )
          )}
        </Box>
        <Button variant="contained" fullWidth size="large">
          Get Started
        </Button>
      </Box>
    </NeonCard>
  )
}

export const CardExamples = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Card Variations
      </Typography>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value="24,580"
            change={12.5}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Revenue"
            value="$89,420"
            change={8.2}
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Orders"
            value="1,248"
            change={-3.1}
            icon={<ShoppingCartIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Page Views"
            value="142K"
            change={24.8}
            icon={<VisibilityIcon />}
          />
        </Grid>
      </Grid>

      {/* Card Variants */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProjectCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TeamMemberCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PricingCard />
        </Grid>
      </Grid>
    </Box>
  )
}

