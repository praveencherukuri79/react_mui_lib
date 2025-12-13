import { useState, MouseEvent } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableChartIcon from '@mui/icons-material/TableChart'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import NavigationIcon from '@mui/icons-material/Navigation'
import DynamicFormIcon from '@mui/icons-material/DynamicForm'
import ChatIcon from '@mui/icons-material/Chat'
import StyleIcon from '@mui/icons-material/Style'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

interface NavItem {
  label: string
  path?: string
  icon?: React.ReactNode
  children?: { label: string; path: string; icon?: React.ReactNode }[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  {
    label: 'Data',
    children: [
      { label: 'Data Tables', path: '/tables', icon: <TableChartIcon /> },
      { label: 'Tree Views', path: '/trees', icon: <AccountTreeIcon /> },
    ],
  },
  {
    label: 'UI Elements',
    children: [
      { label: 'Cards', path: '/cards', icon: <ViewCarouselIcon /> },
      { label: 'Navbars', path: '/navbars', icon: <NavigationIcon /> },
      { label: 'Buttons', path: '/buttons', icon: <TouchAppIcon /> },
    ],
  },
  {
    label: 'Forms & Dialogs',
    children: [
      { label: 'Forms', path: '/forms', icon: <DynamicFormIcon /> },
      { label: 'Dialogs', path: '/dialogs', icon: <ChatIcon /> },
    ],
  },
  {
    label: 'Theming',
    children: [
      { label: 'Styled Components', path: '/styled', icon: <StyleIcon /> },
      { label: 'Theme Colors', path: '/theme-colors', icon: <ColorLensIcon /> },
      { label: 'Typography', path: '/typography', icon: <TextFieldsIcon /> },
    ],
  },
]

export const TopNavbar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, menuId: string) => {
    setAnchorEls((prev) => ({ ...prev, [menuId]: event.currentTarget }))
  }

  const handleMenuClose = (menuId: string) => {
    setAnchorEls((prev) => ({ ...prev, [menuId]: null }))
  }

  const handleNavigation = (path: string, menuId?: string) => {
    navigate(path)
    if (menuId) {
      handleMenuClose(menuId)
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 2px 20px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mr: 4,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
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
              fontSize: '1.1rem',
            }}
          >
            R
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              display: { xs: 'none', sm: 'block' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            React MUI
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flex: 1 }}>
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isOpen = Boolean(anchorEls[item.label])

            return (
              <Box key={item.label}>
                <Button
                  onClick={(e) => {
                    if (hasChildren) {
                      handleMenuOpen(e, item.label)
                    } else if (item.path) {
                      handleNavigation(item.path)
                    }
                  }}
                  endIcon={hasChildren ? <KeyboardArrowDownIcon /> : undefined}
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  {item.label}
                </Button>

                {hasChildren && (
                  <Menu
                    anchorEl={anchorEls[item.label]}
                    open={isOpen}
                    onClose={() => handleMenuClose(item.label)}
                    MenuListProps={{
                      sx: { py: 1 },
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                        border: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  >
                    {item.children?.map((child) => (
                      <MenuItem
                        key={child.path}
                        onClick={() => handleNavigation(child.path, item.label)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: 1,
                          mx: 1,
                          '&:hover': {
                            bgcolor: `${theme.palette.primary.main}10`,
                          },
                        }}
                      >
                        {child.icon && (
                          <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                            {child.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            )
          })}
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': { bgcolor: `${theme.palette.primary.main}10` },
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': { bgcolor: `${theme.palette.primary.main}10` },
            }}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
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
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(null)}
            PaperProps={{
              sx: {
                minWidth: 200,
                mt: 1,
                borderRadius: 2,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                john@example.com
              </Typography>
            </Box>
            <Divider />
            <MenuItem sx={{ py: 1.5 }}>Profile</MenuItem>
            <MenuItem sx={{ py: 1.5 }}>Settings</MenuItem>
            <Divider />
            <MenuItem sx={{ py: 1.5, color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

