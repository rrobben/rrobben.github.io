import type { JSX } from "react";
import Box from "@mui/material/Box";
import MobileDrawer from "./MobileDrawer";
import ControlButton from "./ControlButton";
import { DrawerProps, SvgIconTypeMap, SxProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
    anchor: DrawerProps["anchor"];
    open: boolean;
    setOpen: (open: boolean) => void;
    Icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    children: JSX.Element | JSX.Element[];
    sx?: SxProps;
}

function MobileMenu({ anchor, open, setOpen, Icon, label, children, sx }: Props) {
    const toggleMenuOpen = () => {
        setOpen(!open);
    };
    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ display: { xs: "block", md: "none" }, ...sx }}>
                <ControlButton onClick={toggleMenuOpen} aria-label={label} aria-expanded={open}>
                    <Icon />
                </ControlButton>
            </Box>
            <MobileDrawer anchor={anchor} open={open} onClose={handleCloseMenu}>
                {children}
            </MobileDrawer>
        </>
    );
}
export default MobileMenu;
