import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import LanguageIcon from "@mui/icons-material/Language";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";
import { useContext, useId, useState } from "react";
import { I18nContext } from "../../i18n/I18nContext";
import ControlButton from "../common/ControlButton";

const langs = ["en", "fi"];

function LanguageSelector() {
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const i18n = useContext(I18nContext);
    const menuId = useId();
    const open = Boolean(anchorElLang);

    const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLangMenu = () => {
        setAnchorElLang(null);
    };

    const handleChangeLang = (l: string) => {
        handleCloseLangMenu();
        i18n.changeLanguage(l);
    };

    return (
        <>
            <ControlButton
                onClick={handleOpenLangMenu}
                aria-label={t("changeLanguage")}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                sx={{ px: "14px", "& svg": { fontSize: 18 } }}
            >
                <LanguageIcon />
                {i18n.language.toUpperCase()}
            </ControlButton>
            <Menu
                id={menuId}
                anchorEl={anchorElLang}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleCloseLangMenu}
            >
                {langs.map((l) => (
                    <MenuItem key={l} selected={l === i18n.language} onClick={() => handleChangeLang(l)}>
                        {t(`lang.${l}`)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
export default LanguageSelector;

export const MobileLanguageSelector = () => {
    const { t } = useTranslation();
    const i18n = useContext(I18nContext);

    const handleChangeLang = (l: string | null) => {
        // Clicking the selected button again yields null; keep the current language.
        if (l) i18n.changeLanguage(l);
    };

    return (
        <ToggleButtonGroup
            fullWidth
            exclusive
            value={i18n.language}
            onChange={(_, val) => handleChangeLang(val)}
            aria-label={t("changeLanguage")}
        >
            {langs.map((l) => (
                <ToggleButton key={l} value={l} aria-label={t(`lang.${l}`)}>
                    {l}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
