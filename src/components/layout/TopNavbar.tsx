import { useState, MouseEvent } from "react";
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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Icons for dynamic rendering
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import NavigationIcon from "@mui/icons-material/Navigation";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ChatIcon from "@mui/icons-material/Chat";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StyleIcon from "@mui/icons-material/Style";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import EditIcon from "@mui/icons-material/Edit";
import CodeIcon from "@mui/icons-material/Code";

import { navigationConfig, ModuleConfig } from "@/config/navigation";

// =============================================================================
// ICON COMPONENT MAP
// =============================================================================

const iconComponents: Record<string, React.ReactNode> = {
  dashboard: <DashboardIcon fontSize="small" />,
  table: <TableChartIcon fontSize="small" />,
  tree: <AccountTreeIcon fontSize="small" />,
  data: <DataObjectIcon fontSize="small" />,
  card: <ViewCarouselIcon fontSize="small" />,
  nav: <NavigationIcon fontSize="small" />,
  button: <TouchAppIcon fontSize="small" />,
  widgets: <WidgetsIcon fontSize="small" />,
  form: <DynamicFormIcon fontSize="small" />,
  dialog: <ChatIcon fontSize="small" />,
  palette: <ColorLensIcon fontSize="small" />,
  style: <StyleIcon fontSize="small" />,
  typography: <TextFieldsIcon fontSize="small" />,
  edit: <EditIcon fontSize="small" />,
  json: <CodeIcon fontSize="small" />,
};

const getIcon = (iconName?: string): React.ReactNode => {
  if (!iconName) return null;
  return iconComponents[iconName] || null;
};

// =============================================================================
// TOP NAVBAR COMPONENT
// =============================================================================

export const TopNavbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Menu anchors for dropdowns
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, menuId: string) => {
    setAnchorEls((prev) => ({ ...prev, [menuId]: event.currentTarget }));
  };

  const handleMenuClose = (menuId: string) => {
    setAnchorEls((prev) => ({ ...prev, [menuId]: null }));
  };

  const handleNavigation = (path: string, menuId?: string) => {
    navigate(path);
    if (menuId) {
      handleMenuClose(menuId);
    }
  };

  const isActiveModule = (module: ModuleConfig): boolean => {
    if (module.path) {
      return location.pathname === module.path;
    }
    if (module.features) {
      return module.features.some((f) => location.pathname === f.path);
    }
    return false;
  };

  const isActiveFeature = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mr: 4,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            R
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              display: { xs: "none", sm: "block" },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            React MUI
          </Typography>
        </Box>

        {/* Navigation Items from Config */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flex: 1 }}>
          {navigationConfig.modules.map((module) => {
            const hasFeatures = module.features && module.features.length > 0;
            const isOpen = Boolean(anchorEls[module.id]);
            const isActive = isActiveModule(module);

            return (
              <Box key={module.id}>
                <Button
                  onClick={(e) => {
                    if (hasFeatures) {
                      handleMenuOpen(e, module.id);
                    } else if (module.path) {
                      handleNavigation(module.path);
                    }
                  }}
                  endIcon={hasFeatures ? <KeyboardArrowDownIcon /> : undefined}
                  startIcon={getIcon(module.icon)}
                  sx={{
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: isActive ? 600 : 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    bgcolor: isActive ? `${theme.palette.primary.main}10` : "transparent",
                    "&:hover": {
                      bgcolor: `${theme.palette.primary.main}15`,
                    },
                  }}
                >
                  {module.label}
                </Button>

                {/* Features Dropdown - No pages shown here */}
                {hasFeatures && (
                  <Menu
                    anchorEl={anchorEls[module.id]}
                    open={isOpen}
                    onClose={() => handleMenuClose(module.id)}
                    slotProps={{
                      list: { sx: { py: 1 } },
                      paper: {
                        sx: {
                          mt: 1,
                          minWidth: 220,
                          borderRadius: 2,
                          boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                          border: `1px solid ${theme.palette.divider}`,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "left", vertical: "top" }}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  >
                    {module.features?.map((feature) => (
                      <MenuItem
                        key={feature.id}
                        onClick={() => handleNavigation(feature.path, module.id)}
                        selected={isActiveFeature(feature.path)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: 1,
                          mx: 1,
                          "&:hover": {
                            bgcolor: `${theme.palette.primary.main}10`,
                          },
                          "&.Mui-selected": {
                            bgcolor: `${theme.palette.primary.main}15`,
                            "&:hover": {
                              bgcolor: `${theme.palette.primary.main}20`,
                            },
                          },
                        }}
                      >
                        {feature.icon && (
                          <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                            {getIcon(feature.icon)}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={feature.label}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { bgcolor: `${theme.palette.primary.main}10` },
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { bgcolor: `${theme.palette.primary.main}10` },
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
                fontSize: "0.9rem",
              }}
            >
              JD
            </Avatar>
          </IconButton>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(null)}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 200,
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                },
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
            <MenuItem sx={{ py: 1.5, color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
