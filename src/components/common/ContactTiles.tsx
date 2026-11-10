import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";
import IconSquare from "./IconSquare";
import { focusRing, radius } from "../../theme/theme";

interface ContactItem {
    // i18n key: `contactLabel.<key>` is the tile label, `<key>` the address shown on the Contact page.
    key: string;
    Icon: OverridableComponent<SvgIconTypeMap>;
    href: string;
}

const contacts: ContactItem[] = [
    { key: "email", Icon: MailOutlineRoundedIcon, href: "mailto:roope.poyry1@gmail.com" },
    { key: "linkedin", Icon: LinkedInIcon, href: "https://www.linkedin.com/in/rpoyry/" },
    { key: "github", Icon: GitHubIcon, href: "https://github.com/rrobben" },
];

const Tile = styled("a")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
    padding: "20px 22px",
    borderRadius: radius.header,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.soft.shadow,
    color: theme.palette.text.primary,
    textDecoration: "none",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.soft.control : theme.palette.background.paper,
        boxShadow: theme.palette.soft.raisedShadow,
    },
    "&:focus-visible": focusRing(theme),
}));

interface Props {
    // Contact page: one tile per row with the address under the label.
    // Profile page: a row of label-only tiles.
    showAddresses?: boolean;
}

const ContactTiles = ({ showAddresses }: Props) => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: showAddresses ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
                gap: showAddresses ? 1.5 : 2,
            }}
        >
            {contacts.map(({ key, Icon, href }) => (
                <Tile
                    key={key}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                    <IconSquare Icon={Icon} size={40} />
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600 }}>{t(`contactLabel.${key}`)}</Typography>
                        {showAddresses ? (
                            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary", overflowWrap: "anywhere" }}>
                                {t(key)}
                            </Typography>
                        ) : null}
                    </Box>
                </Tile>
            ))}
        </Box>
    );
};

export default ContactTiles;
