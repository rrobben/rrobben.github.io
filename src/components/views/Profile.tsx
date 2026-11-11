import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router";
import { MyAvatar } from "../common/MyAvatar";
import ContactTiles from "../common/ContactTiles";
import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";

// i18n keys under `skills.*`, shown as chips under the job title.
const skills = ["react", "dotnet", "azure", "claudeCode"];

const cardPadding = { xs: 3, sm: 4 };

const Profile = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card
                    component="section"
                    sx={{ p: cardPadding, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3.5 }}
                >
                    <Box sx={{ flex: "none", p: "6px", borderRadius: "50%", bgcolor: "soft.accentTint" }}>
                        <MyAvatar size={132} />
                    </Box>
                    <Box sx={{ flex: "1 1 320px", minWidth: 0 }}>
                        <Typography variant="h3" component="h1" sx={{ mb: 0.75 }}>
                            {t("Name")}
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: "1.0625rem", fontWeight: 500, color: "text.secondary" }}>
                            {t("JobTitle")}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {skills.map((s) => (
                                <Chip key={s} label={t(`skills.${s}`)} />
                            ))}
                        </Box>
                    </Box>
                </Card>
                <Card component="section" sx={{ p: cardPadding }}>
                    <Typography
                        variant="overline"
                        component="h2"
                        sx={{ display: "block", mb: 1.5, color: "text.secondary" }}
                    >
                        {t("Profile")}
                    </Typography>
                    <>
                        {t("aboutMeContent")
                            .split("<br /><br />")
                            .map((paragraph, i) => (
                                <Typography
                                    key={i}
                                    sx={{ color: "soft.body", lineHeight: 1.75, "&:not(:last-child)": { mb: 2 } }}
                                >
                                    {paragraph}
                                </Typography>
                            ))}
                    </>
                    <Link
                        component={RouterLink}
                        to="/tech"
                        sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, mt: 2.5, fontWeight: 600 }}
                    >
                        {t("howIWorkLink")}
                        <ArrowForwardRoundedIcon fontSize="small" />
                    </Link>
                </Card>
                <ContactTiles />
            </Box>
        </Layout>
    );
};

export default Profile;
