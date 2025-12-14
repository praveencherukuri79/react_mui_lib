import { Box, Typography, Paper, Button, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import { GradientButton } from '@/components/styled/StyledButton'
import { StatsCard } from '@/components/styled/StyledCard'
import TableChartIcon from '@mui/icons-material/TableChart'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import NavigationIcon from '@mui/icons-material/Navigation'
import DynamicFormIcon from '@mui/icons-material/DynamicForm'
import ChatIcon from '@mui/icons-material/Chat'
import StyleIcon from '@mui/icons-material/Style'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface FeatureCard {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  gradient: string
}

const features: FeatureCard[] = [
  {
    title: 'Data Tables',
    description: 'MUI X DataGrid with custom styling, sorting, and filtering',
    icon: <TableChartIcon sx={{ fontSize: 28 }} />,
    path: '/tables',
    gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
  },
  {
    title: 'Tree Views',
    description: 'File explorer-style tree views with custom icons',
    icon: <AccountTreeIcon sx={{ fontSize: 28 }} />,
    path: '/trees',
    gradient: 'linear-gradient(135deg, #10B981, #84CC16)',
  },
  {
    title: 'Cards',
    description: 'Various card styles: glass, neon, gradient borders',
    icon: <ViewCarouselIcon sx={{ fontSize: 28 }} />,
    path: '/cards',
    gradient: 'linear-gradient(135deg, #EC4899, #F97316)',
  },
  {
    title: 'Navbars',
    description: 'Multiple navbar variants and sidebar navigation',
    icon: <NavigationIcon sx={{ fontSize: 28 }} />,
    path: '/navbars',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  {
    title: 'Form Controls',
    description: 'Config-based form inputs with Zod validation',
    icon: <DynamicFormIcon sx={{ fontSize: 28 }} />,
    path: '/forms',
    gradient: 'linear-gradient(135deg, #14B8A6, #22D3EE)',
  },
  {
    title: 'Async Dialogs',
    description: 'Promise-based dialog system for clean async flows',
    icon: <ChatIcon sx={{ fontSize: 28 }} />,
    path: '/dialogs',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  },
  {
    title: 'Styled Components',
    description: 'Custom styled MUI components with animations',
    icon: <StyleIcon sx={{ fontSize: 28 }} />,
    path: '/styled',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)',
  },
]

export const Dashboard = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: '30%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            React MUI Library
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600 }}
          >
            A comprehensive example repository demonstrating best practices for building
            React applications with Material-UI, TypeScript, Recoil, and Zod.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <GradientButton
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/forms')}
            >
              Explore Components
            </GradientButton>
            <Button variant="outlined" size="large">
              View on GitHub
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tech Stack */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {[
            { name: 'React 18', color: '#61DAFB' },
            { name: 'TypeScript', color: '#3178C6' },
            { name: 'MUI v6', color: '#007FFF' },
            { name: 'Vite', color: '#646CFF' },
            { name: 'Recoil', color: '#3578E5' },
            { name: 'Day.js', color: '#FF5F5F' },
            { name: 'Zod', color: '#3068B7' },
          ].map((tech) => (
            <Box
              key={tech.name}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                bgcolor: `${tech.color}15`,
                border: `1px solid ${tech.color}30`,
                color: tech.color,
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {tech.name}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Feature Cards */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Components & Examples
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid key={feature.title} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Paper
              onClick={() => navigate(feature.path)}
              sx={{
                p: 3,
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: `1px solid ${theme.palette.divider}`,
                animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 40px ${theme.palette.primary.main}15`,
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  background: feature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Key Features */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Key Features
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: 'Multi-Theme Support',
              desc: 'Switch between themes with a single line of code',
            },
            {
              title: 'Responsive Design',
              desc: 'Fully responsive for mobile, tablet, and desktop',
            },
            {
              title: 'Type-Safe Forms',
              desc: 'Config-driven forms with Zod validation',
            },
            {
              title: 'Async Dialogs',
              desc: 'Promise-based dialog system for cleaner code',
            },
          ].map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <StatsCard sx={{ height: '100%' }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

