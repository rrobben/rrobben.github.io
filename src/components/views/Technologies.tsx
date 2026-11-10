import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";
import AccordionGroup from "../common/Accordion";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";

const techs = ["Architecture", "AIAssisted", "React", ".NET", "Flutter", "RubyOnRails"];

const Technologies = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("Technologies")} Icon={TerminalRoundedIcon}>
            <AccordionGroup
                items={techs.map((tech) => ({
                    header: t(`tech.header.${tech}`),
                    content: t(`tech.content.${tech}`),
                    dividerAfter: tech === "AIAssisted",
                }))}
            />
        </Layout>
    );
};

export default Technologies;
