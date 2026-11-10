import type { JSX } from "react";
import Drawer, { DrawerProps } from "@mui/material/Drawer";

interface Props {
    anchor: DrawerProps["anchor"];
    open: boolean;
    onClose: () => void;
    children: JSX.Element | JSX.Element[];
}

// The theme styles drawer paper as a floating rounded card (see MuiDrawer in theme.ts).
function MobileDrawer({ anchor, open, onClose, children }: Props) {
    return (
        <Drawer
            anchor={anchor}
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { sm: "block", md: "none" },
                "&.MuiDrawer-anchorRight .MuiDrawer-paper": { minWidth: 260 },
            }}
        >
            {children}
        </Drawer>
    );
}
export default MobileDrawer;
