import { useTranslation } from "react-i18next";
import Layout from "../layout/Layout";
import AccordionGroup from "../common/Accordion";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";

// i18n keys under `howIWork.*`: working practices first, then the stack after the divider.
const items = ["AIAssisted", "Product", "Guardrails", "Architecture", "Production", "Stack"];

const HowIWork = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("HowIWork")} Icon={TerminalRoundedIcon}>
            <AccordionGroup
                items={items.map((item) => ({
                    header: t(`howIWork.header.${item}`),
                    content: t(`howIWork.content.${item}`),
                    dividerAfter: item === "Production",
                }))}
            />
        </Layout>
    );
};

export default HowIWork;
