import { useState, ReactNode } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Collapse,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableChartIcon from '@mui/icons-material/TableChart'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import NavigationIcon from '@mui/icons-material/Navigation'
import DynamicFormIcon from '@mui/icons-material/DynamicForm'
import DialogIcon from '@mui/icons-material/Chat'
import StyleIcon from '@mui/icons-material/Style'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import PaletteIcon from '@mui/icons-material/Palette'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import BuildIcon from '@mui/icons-material/Build'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import { themeIdState } from '@/state/themeState'
import { themes } from '@/themes'

const DRAWER_WIDTH = 280

interface MenuItemChild {
  label: string
  path: string
  icon: ReactNode
}

interface MenuItemType {
  label: string
  path?: string
  icon: ReactNode
  children?: MenuItemChild[]
}

const menuItems: MenuItemType[] = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Data Tables', path: '/tables', icon: <TableChartIcon /> },
  { label: 'Tree Views', path: '/trees', icon: <AccountTreeIcon /> },
  { label: 'Cards', path: '/cards', icon: <ViewCarouselIcon /> },
  { label: 'Navbars', path: '/navbars', icon: <NavigationIcon /> },
  { label: 'Forms', path: '/forms', icon: <DynamicFormIcon /> },
  { label: 'Dialogs', path: '/dialogs', icon: <DialogIcon /> },
  { 
    label: 'Components', 
    icon: <BuildIcon />,
    children: [
      { label: 'Styled Components', path: '/styled', icon: <StyleIcon /> },
      { label: 'Theme Colors', path: '/theme-colors', icon: <ColorLensIcon /> },
      { label: 'Typography', path: '/typography', icon: <TextFieldsIcon /> },
      { label: 'Buttons', path: '/buttons', icon: <TouchAppIcon /> },
    ]
  },
]

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [themeId, setThemeId] = useRecoilState(themeIdState)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuExpand = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  const isMenuExpanded = (label: string) => expandedMenus.includes(label)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (event: SelectChangeEvent) => {
    setThemeId(event.target.value)
  }

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
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
          R
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            React MUI Lib
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Component Library
          </Typography>
        </Box>
      </Box>

      {/* Theme Selector */}
      <Box sx={{ px: 2, py: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Theme</InputLabel>
          <Select
            value={themeId}
            label="Theme"
            onChange={handleThemeChange}
            startAdornment={
              <PaletteIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            }
          >
            {themes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isActive = item.path ? location.pathname === item.path : false
          const isChildActive = hasChildren && item.children?.some(child => location.pathname === child.path)
          const isExpanded = isMenuExpanded(item.label)

          return (
            <Box key={item.label}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    if (hasChildren) {
                      handleMenuExpand(item.label)
                    } else if (item.path) {
                      navigate(item.path)
                      if (isMobile) setMobileOpen(false)
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: (isActive || isChildActive) ? `${theme.palette.primary.main}15` : 'transparent',
                    '&:hover': {
                      bgcolor: (isActive || isChildActive)
                        ? `${theme.palette.primary.main}20`
                        : `${theme.palette.action.hover}`,
                    },
                    '& .MuiListItemIcon-root': {
                      color: (isActive || isChildActive) ? theme.palette.primary.main : theme.palette.text.secondary,
                    },
                    '& .MuiListItemText-primary': {
                      color: (isActive || isChildActive) ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: (isActive || isChildActive) ? 600 : 400,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {hasChildren && (
                    isExpanded ? (
                      <ExpandLess sx={{ color: theme.palette.text.secondary }} />
                    ) : (
                      <ExpandMore sx={{ color: theme.palette.text.secondary }} />
                    )
                  )}
                </ListItemButton>
              </ListItem>

              {/* Child Navigation Items */}
              {hasChildren && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children?.map((child) => {
                      const isChildItemActive = location.pathname === child.path
                      return (
                        <ListItem key={child.path} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemButton
                            onClick={() => {
                              navigate(child.path)
                              if (isMobile) setMobileOpen(false)
                            }}
                            sx={{
                              borderRadius: 2,
                              py: 1,
                              pl: 4,
                              bgcolor: isChildItemActive ? `${theme.palette.primary.main}15` : 'transparent',
                              '&:hover': {
                                bgcolor: isChildItemActive
                                  ? `${theme.palette.primary.main}20`
                                  : `${theme.palette.action.hover}`,
                              },
                              '& .MuiListItemIcon-root': {
                                color: isChildItemActive ? theme.palette.primary.main : theme.palette.text.secondary,
                              },
                              '& .MuiListItemText-primary': {
                                color: isChildItemActive ? theme.palette.primary.main : theme.palette.text.primary,
                                fontWeight: isChildItemActive ? 600 : 400,
                                fontSize: '0.875rem',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>{child.icon}</ListItemIcon>
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          )
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
            React MUI Example
          </Typography>
          <Typography variant="caption" color="text.secondary">
            A reference implementation for building React apps with MUI
          </Typography>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 600 }}
          >
            {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={3} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: '0.9rem',
                }}
              >
                JD
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { minWidth: 200, mt: 1 },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  john@example.com
                </Typography>
              </Box>
              <Divider />
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <Divider />
              <MenuItem sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

