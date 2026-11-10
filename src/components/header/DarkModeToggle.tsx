import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { ColorModeContext } from "../../theme/ColorModeContext";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import ControlButton from "../common/ControlButton";

// Header button: shows the current mode's icon and switches to the other mode.
function DarkModeToggle() {
    const { t } = useTranslation();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const isDark = theme.palette.mode === "dark";

    return (
        <ControlButton
            onClick={colorMode.toggleColorMode}
            aria-label={t(isDark ? "mode.switchToLight" : "mode.switchToDark")}
        >
            {isDark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </ControlButton>
    );
}
export default DarkModeToggle;

// Settings drawer row: "Dark theme" with an on/off switch.
export const MobileDarkModeToggle = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <FormControlLabel
            label={t("mode.dark")}
            labelPlacement="start"
            control={<Switch checked={theme.palette.mode === "dark"} onChange={colorMode.toggleColorMode} />}
            sx={{ m: 0, width: "100%", justifyContent: "space-between", "& .MuiFormControlLabel-label": { fontWeight: 500 } }}
        />
    );
};
