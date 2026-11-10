import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import { MyAvatar } from "../common/MyAvatar";
import DarkModeToggle, { MobileDarkModeToggle } from "../header/DarkModeToggle";
import LanguageSelector, { MobileLanguageSelector } from "../header/LanguageSelector";
import NavigationTabs, { MobileNavigationMenu } from "../header/Navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import MobileMenu from "../common/MobileMenu";
import { focusRing, radius } from "../../theme/theme";

enum MenuType {
    Nav,
    Settings,
}

const HomeLink = styled("a")(({ theme }) => ({
    display: "block",
    flex: "none",
    borderRadius: radius.control,
    "&:focus-visible": focusRing(theme),
}));

function Header() {
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState<MenuType | false>(false);

    const handleCloseMenu = () => setOpenMenu(false);
    const handleSetMenuOpen = (type: MenuType) => (open: boolean) => setOpenMenu(open ? type : false);

    return (
        <Box
            component="header"
            sx={{
                maxWidth: 1080,
                mx: "auto",
                p: "10px 10px 10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: radius.header,
                bgcolor: "background.paper",
                boxShadow: (theme) => theme.palette.soft.shadow,
            }}
        >
            <HomeLink href="#" aria-label={t("home")} onClick={handleCloseMenu}>
                <MyAvatar size={44} variant="rounded" />
            </HomeLink>
            <NavigationTabs />
            <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }} />
            <Box sx={{ display: "flex", gap: 0.75 }}>
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.75 }}>
                    <DarkModeToggle />
                    <LanguageSelector />
                </Box>
                <MobileNavigationMenu open={openMenu === MenuType.Nav} setOpen={handleSetMenuOpen(MenuType.Nav)} />
                <MobileMenu
                    anchor="right"
                    open={openMenu === MenuType.Settings}
                    setOpen={handleSetMenuOpen(MenuType.Settings)}
                    Icon={TuneRoundedIcon}
                    label={t("settings")}
                >
                    <List>
                        <ListItem>
                            <MobileDarkModeToggle />
                        </ListItem>
                        <ListItem>
                            <MobileLanguageSelector />
                        </ListItem>
                    </List>
                </MobileMenu>
            </Box>
        </Box>
    );
}
export default Header;
