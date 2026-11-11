import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCurrentPath } from "../../hooks";
import MobileMenu from "../common/MobileMenu";
import { focusRing, radius } from "../../theme/theme";

interface HeaderItem {
    path: string;
    label: string;
    Icon: OverridableComponent<SvgIconTypeMap>;
}

const pages: HeaderItem[] = [
    { path: "", label: "Profile", Icon: AccountCircleOutlinedIcon },
    { path: "tech", label: "HowIWork", Icon: TerminalRoundedIcon },
    { path: "experience", label: "Experience", Icon: WorkOutlineRoundedIcon },
    { path: "education", label: "Education", Icon: SchoolOutlinedIcon },
    { path: "contact", label: "Contact", Icon: AlternateEmailRoundedIcon },
];

const NavLink = styled("a")(({ theme }) => ({
    padding: "11px 18px",
    borderRadius: radius.control,
    color: theme.palette.soft.nav,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.6,
    textDecoration: "none",
    transition: theme.transitions.create(["background-color", "color"]),
    "&:hover": { backgroundColor: theme.palette.soft.control },
    "&:focus-visible": focusRing(theme),
    '&[aria-current="page"]': {
        backgroundColor: theme.palette.soft.accentTint,
        color: theme.palette.primary.main,
        fontWeight: 600,
    },
}));

function NavigationTabs() {
    const { t } = useTranslation();
    const currentPath = useCurrentPath();

    return (
        <Box
            component="nav"
            aria-label={t("mainNav")}
            sx={{ display: { xs: "none", md: "flex" }, flexWrap: "wrap", gap: 0.5, flex: "1 1 auto", ml: 1 }}
        >
            {pages.map((page) => (
                <NavLink
                    key={page.path}
                    href={`#/${page.path}`}
                    aria-current={currentPath === page.path ? "page" : undefined}
                >
                    {t(page.label)}
                </NavLink>
            ))}
        </Box>
    );
}
export default NavigationTabs;

interface MobileNavigationMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sx?: SxProps;
}

export const MobileNavigationMenu = ({ open, setOpen, sx }: MobileNavigationMenuProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const currentPath = useCurrentPath();

    const handleNavItemClick = (path: string) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <MobileMenu open={open} setOpen={setOpen} Icon={MenuRoundedIcon} label={t("openMenu")} anchor="top" sx={sx}>
            <List component="nav" aria-label={t("mainNav")} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {pages.map(({ path, label, Icon }) => (
                    <ListItemButton
                        key={path}
                        selected={currentPath === path}
                        aria-current={currentPath === path ? "page" : undefined}
                        onClick={() => handleNavItemClick(path)}
                    >
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText slotProps={{ primary: { sx: { fontWeight: "inherit" } } }}>{t(label)}</ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </MobileMenu>
    );
};
