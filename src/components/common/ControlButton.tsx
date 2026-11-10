import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { radius } from "../../theme/theme";

// 44px rounded-square button on the control tone, used for the header's theme, language and
// mobile menu buttons. Icon-only content ends up exactly 44px wide.
const ControlButton = styled(ButtonBase)(({ theme }) => ({
    minWidth: 44,
    height: 44,
    padding: "0 12px",
    gap: 8,
    borderRadius: radius.control,
    backgroundColor: theme.palette.soft.control,
    color: theme.palette.text.primary,
    fontSize: "0.8125rem",
    fontWeight: 600,
    transition: theme.transitions.create("background-color"),
    "&:hover": { backgroundColor: theme.palette.soft.controlHover },
    "&.Mui-focusVisible": {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
    },
    "& svg": { fontSize: 20 },
}));

export default ControlButton;
