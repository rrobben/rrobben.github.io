import { SxProps, Theme } from "@mui/material";
import Avatar from "@mui/material/Avatar";

interface Props {
    size: number;
    // "rounded" uses the theme's control radius (14px).
    variant?: "circular" | "rounded";
    sx?: SxProps<Theme>;
}

export const MyAvatar = ({ size, variant = "circular", sx }: Props) => (
    <Avatar src="profile_picture.jpg" alt="RP" variant={variant} sx={{ width: size, height: size, ...sx }} />
);
