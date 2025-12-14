import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  Skeleton,
  Alert,
  AlertTitle,
  Breadcrumbs,
  Link,
  Tooltip,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// =============================================================================
// TABS EXAMPLE
// =============================================================================

export function TabsExample() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Tabs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navigation tabs with panel content
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(_, v) => setValue(v)} sx={{ px: 2 }}>
          <Tab label="Overview" />
          <Tab label="Details" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <Typography>
            Overview content. This is the first tab panel showing general
            information.
          </Typography>
        )}
        {value === 1 && (
          <Typography>
            Details content. More specific information about the selected item
            goes here.
          </Typography>
        )}
        {value === 2 && (
          <Typography>
            Settings content. Configuration options and preferences.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

// =============================================================================
// STEPPER EXAMPLE
// =============================================================================

const steps = [
  { label: "Account Details", description: "Enter your email and password" },
  { label: "Personal Info", description: "Provide your name and contact" },
  { label: "Review", description: "Review and confirm your information" },
];

export function StepperExample() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Vertical Stepper
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Multi-step form with progress indicator
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setActiveStep(index + 1)}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  {index > 0 && (
                    <Button size="small" onClick={() => setActiveStep(index - 1)}>
                      Back
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Box sx={{ p: 2, bgcolor: `${theme.palette.success.main}15`, borderRadius: 2, mt: 2 }}>
            <Typography color="success.main" fontWeight={500}>
              <CheckCircleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              All steps completed!
            </Typography>
            <Button size="small" onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>
              Reset
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

// =============================================================================
// ACCORDION EXAMPLE
// =============================================================================

export function AccordionExample() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Accordion
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Collapsible content panels
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ borderRadius: 2, "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>General Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Configure general application settings including language,
              timezone, and notification preferences.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ borderRadius: 2, "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Privacy Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Manage your privacy preferences and data sharing options.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ borderRadius: 2, "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Advanced Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Advanced configuration options for power users.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}

// =============================================================================
// LIST EXAMPLE
// =============================================================================

export function ListExample() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          List
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navigation and content lists
        </Typography>
      </Box>
      <List sx={{ p: 1 }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => setSelectedIndex(0)}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" secondary="12 unread messages" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => setSelectedIndex(1)}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" secondary="3 drafts" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={() => setSelectedIndex(2)}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" secondary="Last sent 2 hours ago" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={() => setSelectedIndex(3)}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" secondary="5 starred items" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ px: 3, pb: 1 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Recent Contacts
        </Typography>
      </Box>
      <List sx={{ p: 1 }}>
        <ListItem sx={{ borderRadius: 2 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>A</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Alice Johnson" secondary="alice@example.com" />
        </ListItem>
        <ListItem sx={{ borderRadius: 2 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>B</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Bob Smith" secondary="bob@example.com" />
        </ListItem>
      </List>
    </Paper>
  );
}

// =============================================================================
// SKELETON EXAMPLE
// =============================================================================

export function SkeletonExample() {
  const theme = useTheme();

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Skeleton Loaders
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loading placeholders for content
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 2 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rounded" width="33%" height={80} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" width="33%" height={80} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" width="33%" height={80} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
    </Paper>
  );
}

// =============================================================================
// ALERTS EXAMPLE
// =============================================================================

export function AlertsExample() {
  const theme = useTheme();

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Alerts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status messages and notifications
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your changes have been saved successfully.
        </Alert>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          New features are available. Check out the changelog.
        </Alert>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Your session will expire in 5 minutes.
        </Alert>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Failed to save changes. Please try again.
        </Alert>
      </Box>
    </Paper>
  );
}

// =============================================================================
// BREADCRUMBS & TOOLTIPS EXAMPLE
// =============================================================================

export function BreadcrumbsExample() {
  const theme = useTheme();

  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600}>
          Breadcrumbs & Tooltips
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navigation aids and hover hints
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Products
          </Link>
          <Typography color="text.primary">Electronics</Typography>
        </Breadcrumbs>

        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
          Tooltip Placements
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Tooltip title="Top placement" placement="top">
            <Button variant="outlined">Top</Button>
          </Tooltip>
          <Tooltip title="Bottom placement" placement="bottom">
            <Button variant="outlined">Bottom</Button>
          </Tooltip>
          <Tooltip title="Left placement" placement="left">
            <Button variant="outlined">Left</Button>
          </Tooltip>
          <Tooltip title="Right placement" placement="right">
            <Button variant="outlined">Right</Button>
          </Tooltip>
          <Tooltip title="With arrow" arrow>
            <Button variant="contained">Arrow</Button>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function MoreMuiExamples() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <TabsExample />
      <StepperExample />
      <AccordionExample />
      <ListExample />
      <SkeletonExample />
      <AlertsExample />
      <BreadcrumbsExample />
    </Box>
  );
}

