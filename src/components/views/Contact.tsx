import { useTranslation } from "react-i18next";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import Layout from "../layout/Layout";
import ContactTiles from "../common/ContactTiles";

const Contact = () => {
    const { t } = useTranslation();

    return (
        <Layout header={t("Contact")} Icon={AlternateEmailRoundedIcon}>
            <ContactTiles showAddresses />
        </Layout>
    );
};

export default Contact;
