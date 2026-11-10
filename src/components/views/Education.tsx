import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Layout from "../layout/Layout";
import InfoCard from "../common/InfoCard";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const eds = ["Tuni", "Järvenpään lukio"];

const Education = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("Education")} Icon={SchoolOutlinedIcon}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {eds.map((e) => (
                    <InfoCard
                        key={e}
                        header={t(`education.header.${e}`)}
                        content={t(`education.content.${e}`)}
                        subcontents={t(`education.subcontent.${e}`).split("<br/>")}
                    />
                ))}
            </Box>
        </Layout>
    );
};

export default Education;
