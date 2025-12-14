import { styled, Chip, Avatar, Badge } from "@mui/material";

// =============================================================================
// STYLED CHIPS
// =============================================================================

export const GradientChip2 = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: "#fff",
  fontWeight: 600,
  "& .MuiChip-deleteIcon": {
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      color: "#fff",
    },
  },
}));

export const OutlineGlowChip = styled(Chip)(({ theme }) => ({
  background: "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontWeight: 600,
  boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
  "&:hover": {
    boxShadow: `0 0 20px ${theme.palette.primary.main}60`,
  },
}));

export const PillChip = styled(Chip)(({ theme }) => ({
  borderRadius: 50,
  padding: "4px 8px",
  height: "auto",
  background: `${theme.palette.primary.main}15`,
  color: theme.palette.primary.main,
  fontWeight: 500,
  "& .MuiChip-label": {
    padding: "4px 12px",
  },
}));

export const StatusChip2 = styled(Chip)<{ status?: "success" | "warning" | "error" | "info" }>(
  ({ theme, status = "info" }) => {
    const colors = {
      success: { bg: theme.palette.success.main, text: "#fff" },
      warning: { bg: theme.palette.warning.main, text: "#000" },
      error: { bg: theme.palette.error.main, text: "#fff" },
      info: { bg: theme.palette.info.main, text: "#fff" },
    };
    return {
      background: colors[status].bg,
      color: colors[status].text,
      fontWeight: 600,
      "&::before": {
        content: '""',
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: colors[status].text,
        marginRight: 8,
        animation: "pulse 2s infinite",
      },
      "@keyframes pulse": {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },
    };
  }
);

// =============================================================================
// STYLED AVATARS
// =============================================================================

export const GradientAvatar2 = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  fontWeight: 700,
  boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
}));

export const OutlineAvatar = styled(Avatar)(({ theme }) => ({
  background: "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

export const StatusAvatar2 = styled(Avatar)<{ online?: boolean }>(({ theme, online }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: online ? theme.palette.success.main : theme.palette.grey[500],
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

// =============================================================================
// STYLED BADGES
// =============================================================================

export const PulseBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: theme.palette.error.main,
    color: "#fff",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const GradientBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: "#fff",
    fontWeight: 600,
    minWidth: 22,
    height: 22,
  },
}));

export const DotBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 10,
    height: 10,
    minWidth: 10,
    borderRadius: "50%",
    background: theme.palette.success.main,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

