import { styled, Paper, Box, LinearProgress } from "@mui/material";

// =============================================================================
// STYLED PAPERS
// =============================================================================

export const GlassPaper = styled(Paper)(() => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

export const GradientBorderPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  background: theme.palette.background.paper,
  borderRadius: 16,
  padding: 2,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: 16,
    padding: 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  },
}));

export const ElevatedPaper = styled(Paper)(() => ({
  borderRadius: 16,
  boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

// =============================================================================
// STYLED CONTAINERS & PROGRESS
// =============================================================================

export const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: 16,
  padding: 24,
  color: "#fff",
}));

export const GradientProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: `${theme.palette.primary.main}20`,
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

