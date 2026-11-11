import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";
import AccordionGroup from "../common/Accordion";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { experienceItems } from "../../content/sections";

const Experience = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("Experience")} Icon={WorkOutlineRoundedIcon}>
            <AccordionGroup
                items={experienceItems.map((e) => ({
                    header: t(`workExperience.header.${e}`),
                    subheader: t(`workExperience.subheader.${e}`),
                    content: t(`workExperience.content.${e}`),
                }))}
            />
        </Layout>
    );
};

export default Experience;
