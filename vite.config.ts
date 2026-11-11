import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { staticContent } from "./plugins/staticContent";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), staticContent()],
    base: "/",
});
