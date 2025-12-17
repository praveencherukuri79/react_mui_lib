import { Button, ButtonProps, styled } from "@mui/material";

export interface UnderlineButtonProps extends ButtonProps {
  active?: boolean;
}

export const UnderlineButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<UnderlineButtonProps>(({ theme, active }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 2,
    height: 2,
    borderRadius: 999,
    backgroundColor: active ? theme.palette.primary.main : "transparent",
    transition: "background-color 150ms ease",
  },
  "&:hover::after": {
    backgroundColor: theme.palette.primary.main,
  },
}));


