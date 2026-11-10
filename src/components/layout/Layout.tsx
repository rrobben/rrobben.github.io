import type { JSX } from "react";
import { SvgIconTypeMap } from "@mui/material";
import Box from "@mui/material/Box";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Typography from "@mui/material/Typography";
import IconSquare from "../common/IconSquare";

interface Props {
    children: JSX.Element | JSX.Element[];
    // Omit for pages that carry their own <h1> (Profile).
    header?: string;
    Icon?: OverridableComponent<SvgIconTypeMap>;
}

const Layout = ({ children, header, Icon }: Props) => (
    <Box component="main" sx={{ maxWidth: 820, mx: "auto", mt: { xs: 4, md: 6 } }}>
        {header ? <LayoutHeader text={header} Icon={Icon} /> : null}
        {children}
    </Box>
);

export default Layout;

interface HeaderProps {
    text: string;
    Icon?: OverridableComponent<SvgIconTypeMap>;
}

export const LayoutHeader = ({ text, Icon }: HeaderProps) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "14px", mb: 3, ml: 0.5 }}>
        {Icon ? <IconSquare Icon={Icon} size={48} /> : null}
        <Typography variant="h4" component="h1">
            {text}
        </Typography>
    </Box>
);
