import { SvgIconTypeMap } from "@mui/material";
import Box from "@mui/material/Box";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { radius } from "../../theme/theme";

interface IconSquareProps {
    Icon: OverridableComponent<SvgIconTypeMap>;
    // 48 for page headings, 40 for tiles.
    size: 40 | 48;
}

// Accent-tinted rounded square holding an icon.
const IconSquare = ({ Icon, size }: IconSquareProps) => (
    <Box
        component="span"
        sx={{
            width: size,
            height: size,
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size === 48 ? radius.icon : radius.iconSmall,
            bgcolor: "soft.accentTint",
            color: "primary.main",
        }}
    >
        <Icon sx={{ fontSize: size === 48 ? 24 : 20 }} aria-hidden />
    </Box>
);

export default IconSquare;
