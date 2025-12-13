import { useState } from 'react'
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import FolderIcon from '@mui/icons-material/Folder'
import LogoutIcon from '@mui/icons-material/Logout'

// ============================================
// NAVBAR EXAMPLES
// ============================================

// Modern Gradient Navbar
export const GradientNavbar = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
        borderRadius: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          Acme Inc
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <Button
              key={item}
              sx={{
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
        <IconButton sx={{ color: '#fff' }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton sx={{ color: '#fff', ml: 1 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.3)' }}>J</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { minWidth: 180 } }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <Divider />
          <MenuItem sx={{ color: 'error.main' }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

// Glass Navbar
export const GlassNavbar = () => {
  const theme = useTheme()

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            mr: 2,
          }}
        >
          G
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          GlassUI
        </Typography>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 50,
            px: 2,
            mr: 2,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ color: 'text.primary', width: 200 }}
          />
        </Box>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <Badge badgeContent={5} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          sx={{
            ml: 2,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          U
        </Avatar>
      </Toolbar>
    </AppBar>
  )
}

// Minimal Navbar
export const MinimalNavbar = () => {
  const theme = useTheme()

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ flexGrow: 1 }}>
          minimal.
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 4 }}>
          {['Work', 'About', 'Services', 'Contact'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                cursor: 'pointer',
                fontWeight: 500,
                color: 'text.secondary',
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 50,
            px: 3,
          }}
        >
          Get in Touch
        </Button>
      </Toolbar>
    </AppBar>
  )
}

// Sidebar Navigation
export const SidebarNavbar = () => {
  const theme = useTheme()
  const [selected, setSelected] = useState('Dashboard')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const menuItems = [
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Users', icon: <PeopleIcon /> },
    { label: 'Analytics', icon: <AnalyticsIcon /> },
    { label: 'Files', icon: <FolderIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> },
  ]

  const sidebarContent = (
    <Box
      sx={{
        width: 260,
        height: '100%',
        background: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.2rem',
            }}
          >
            S
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              SideNav
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ flex: 1, p: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selected === item.label}
              onClick={() => setSelected(item.label)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: `${theme.palette.primary.main}15`,
                  '&:hover': { bgcolor: `${theme.palette.primary.main}20` },
                  '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
                  '& .MuiListItemText-primary': { color: theme.palette.primary.main },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <ListItemButton sx={{ borderRadius: 2, color: 'error.main' }}>
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  )

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        {/* Mobile Drawer Trigger */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {sidebarContent}
          </Drawer>
        </Box>

        {/* Desktop Sidebar */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: 260, flexShrink: 0 }}>
          {sidebarContent}
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            {selected}
          </Typography>
          <Typography color="text.secondary">
            This is the content area for the {selected} page. The sidebar navigation
            demonstrates a common dashboard layout pattern.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

// Export all navbar examples
export const NavbarExamples = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
        Navbar Variations
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Gradient Navbar
          </Typography>
          <GradientNavbar />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Glass Navbar
          </Typography>
          <GlassNavbar />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Minimal Navbar
          </Typography>
          <MinimalNavbar />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Sidebar Navigation
          </Typography>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              overflow: 'hidden',
              height: 400,
            }}
          >
            <SidebarNavbar />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

