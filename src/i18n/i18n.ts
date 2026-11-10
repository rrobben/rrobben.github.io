import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fi from "./fi.json";

const resources = {
    en: {
        translation: en,
    },
    fi: {
        translation: fi,
    },
};

export const initI18n = (lng: string) =>
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
            // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
            // if you're using a language detector, do not define the lng option
            fallbackLng: "en",
            interpolation: {
                escapeValue: false, // react already safes from xss
            },
            keySeparator: ".",
            returnEmptyString: true, // i18next 27 defaults to false, which renders the key for intentionally empty values
        });

export default i18n;
