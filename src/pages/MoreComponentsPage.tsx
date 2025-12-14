import { Box, Typography } from "@mui/material";
import { MoreMuiExamples } from "@/components/examples/MoreMuiExamples";

export const MoreComponentsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        More MUI Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Tabs, Stepper, Accordion, Lists, Skeletons, Alerts, Breadcrumbs, and
        Tooltips examples.
      </Typography>

      <MoreMuiExamples />
    </Box>
  );
};

