import { useState, ReactNode } from "react";
import {
  Box,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { FeatureConfig, PageConfig, getFeatureByPath } from "@/config/navigation";
import { useLocation } from "react-router-dom";

// Icons
import TableChartIcon from "@mui/icons-material/TableChart";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SortIcon from "@mui/icons-material/Sort";
import GridViewIcon from "@mui/icons-material/GridView";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import CompareIcon from "@mui/icons-material/Compare";
import TabIcon from "@mui/icons-material/Tab";
import ViewListIcon from "@mui/icons-material/ViewList";
import WarningIcon from "@mui/icons-material/Warning";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import InputIcon from "@mui/icons-material/Input";
import LabelIcon from "@mui/icons-material/Label";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

// =============================================================================
// ICON MAP
// =============================================================================

const iconComponents: Record<string, ReactNode> = {
  table: <TableChartIcon fontSize="small" />,
  tree: <AccountTreeIcon fontSize="small" />,
  sort: <SortIcon fontSize="small" />,
  grid: <GridViewIcon fontSize="small" />,
  form: <DynamicFormIcon fontSize="small" />,
  compare: <CompareIcon fontSize="small" />,
  tab: <TabIcon fontSize="small" />,
  stepper: <ViewListIcon fontSize="small" />,
  accordion: <ViewListIcon fontSize="small" />,
  list: <ViewListIcon fontSize="small" />,
  skeleton: <ViewListIcon fontSize="small" />,
  alert: <WarningIcon fontSize="small" />,
  breadcrumb: <ViewListIcon fontSize="small" />,
  button: <TouchAppIcon fontSize="small" />,
  card: <ViewCarouselIcon fontSize="small" />,
  input: <InputIcon fontSize="small" />,
  chip: <LabelIcon fontSize="small" />,
  login: <LoginIcon fontSize="small" />,
  register: <PersonAddIcon fontSize="small" />,
  profile: <PersonIcon fontSize="small" />,
};

const getIcon = (iconName?: string): ReactNode => {
  if (!iconName) return null;
  return iconComponents[iconName] || null;
};

// =============================================================================
// FEATURE LAYOUT PROPS
// =============================================================================

interface FeatureLayoutProps {
  /** Map of page IDs to their content components */
  pageContent: Record<string, ReactNode>;
  /** Optional: Override feature from path detection */
  feature?: FeatureConfig;
  /** Optional: Title to display */
  title?: string;
  /** Optional: Description to display */
  description?: string;
}

// =============================================================================
// TABS LAYOUT
// =============================================================================

interface TabsLayoutProps {
  pages: PageConfig[];
  pageContent: Record<string, ReactNode>;
  activePageId: string;
  onPageChange: (pageId: string) => void;
}

function TabsLayout({ pages, pageContent, activePageId, onPageChange }: TabsLayoutProps) {
  const theme = useTheme();
  const activeIndex = pages.findIndex((p) => p.id === activePageId);

  return (
    <Box>
      <Paper
        sx={{
          borderRadius: 2,
          mb: 3,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={activeIndex >= 0 ? activeIndex : 0}
          onChange={(_, idx) => onPageChange(pages[idx].id)}
          sx={{
            bgcolor: `${theme.palette.primary.main}05`,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              minHeight: 56,
              px: 3,
            },
            "& .Mui-selected": {
              fontWeight: 600,
            },
          }}
        >
          {pages.map((page) => (
            <Tab
              key={page.id}
              icon={getIcon(page.icon) as React.ReactElement}
              iconPosition="start"
              label={page.label}
            />
          ))}
        </Tabs>
      </Paper>
      <Box>{pageContent[activePageId] || <Typography>Content not found</Typography>}</Box>
    </Box>
  );
}

// =============================================================================
// VERTICAL LAYOUT
// =============================================================================

interface VerticalLayoutProps {
  pages: PageConfig[];
  pageContent: Record<string, ReactNode>;
  activePageId: string;
  onPageChange: (pageId: string) => void;
}

function VerticalLayout({ pages, pageContent, activePageId, onPageChange }: VerticalLayoutProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Sidebar Navigation */}
      <Paper
        sx={{
          width: 240,
          flexShrink: 0,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          alignSelf: "flex-start",
          position: "sticky",
          top: 24,
        }}
      >
        <List sx={{ p: 1 }}>
          {pages.map((page) => (
            <ListItemButton
              key={page.id}
              selected={page.id === activePageId}
              onClick={() => onPageChange(page.id)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: `${theme.palette.primary.main}15`,
                  "&:hover": {
                    bgcolor: `${theme.palette.primary.main}20`,
                  },
                },
              }}
            >
              {page.icon && (
                <ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main }}>
                  {getIcon(page.icon)}
                </ListItemIcon>
              )}
              <ListItemText
                primary={page.label}
                primaryTypographyProps={{
                  fontWeight: page.id === activePageId ? 600 : 500,
                  fontSize: "0.9rem",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Content Area */}
      <Box sx={{ flex: 1 }}>
        {pageContent[activePageId] || <Typography>Content not found</Typography>}
      </Box>
    </Box>
  );
}

// =============================================================================
// FEATURE LAYOUT COMPONENT
// =============================================================================

export function FeatureLayout({
  pageContent,
  feature: featureProp,
  title,
  description,
}: FeatureLayoutProps) {
  const location = useLocation();

  // Get feature from config or use provided prop
  const feature = featureProp || getFeatureByPath(location.pathname);

  // Track active page
  const [activePageId, setActivePageId] = useState<string>(
    feature?.pages?.[0]?.id || ""
  );

  // No feature found
  if (!feature) {
    return (
      <Box>
        <Typography color="error">Feature not found for path: {location.pathname}</Typography>
      </Box>
    );
  }

  // Single layout - no pages, just render children directly
  if (feature.layout === "single" || !feature.pages || feature.pages.length === 0) {
    return (
      <Box>
        {title && (
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
        )}
        {pageContent["default"] || pageContent[Object.keys(pageContent)[0]]}
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      {title && (
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {description}
        </Typography>
      )}

      {/* Layout based on feature type */}
      {feature.layout === "tabs" ? (
        <TabsLayout
          pages={feature.pages}
          pageContent={pageContent}
          activePageId={activePageId}
          onPageChange={setActivePageId}
        />
      ) : feature.layout === "vertical" ? (
        <VerticalLayout
          pages={feature.pages}
          pageContent={pageContent}
          activePageId={activePageId}
          onPageChange={setActivePageId}
        />
      ) : (
        // Default: just show first content
        <Box>{pageContent[feature.pages[0].id]}</Box>
      )}
    </Box>
  );
}

export default FeatureLayout;

