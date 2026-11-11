import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";
import AccordionGroup from "../common/Accordion";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import { howIWorkDividerAfter, howIWorkItems } from "../../content/sections";

const HowIWork = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("HowIWork")} Icon={TerminalRoundedIcon}>
            <AccordionGroup
                items={howIWorkItems.map((item) => ({
                    header: t(`howIWork.header.${item}`),
                    content: t(`howIWork.content.${item}`),
                    dividerAfter: item === howIWorkDividerAfter,
                }))}
            />
        </Layout>
    );
};

export default HowIWork;
