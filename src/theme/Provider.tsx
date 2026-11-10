import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, type JSX } from "react";
import { PaletteMode } from "@mui/material";
import { createAppTheme } from "./theme.ts";
import { useLocalStorage } from "usehooks-ts";
import { ColorModeContext } from "./ColorModeContext";

interface Props {
    children: JSX.Element | JSX.Element[];
}

const Provider = ({ children }: Props) => {
    const [mode, setMode] = useLocalStorage<PaletteMode>("color-mode", "dark");

    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // Update the theme only if the mode changes
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Provider;
