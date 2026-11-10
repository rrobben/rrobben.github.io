import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./theme/Provider.tsx";
import I18nProvider from "./i18n/I18nProvider.tsx";
import Router from "./Router.tsx";
import "./index.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <I18nProvider>
            <Provider>
                <Router />
            </Provider>
        </I18nProvider>
    </React.StrictMode>
);
