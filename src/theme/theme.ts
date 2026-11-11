import { PaletteMode, Theme, createTheme, responsiveFontSizes } from "@mui/material";

// Extra tones for the soft card UI. Surfaces separate by tone in dark mode and by a faint
// shadow in light mode, so there are no borders anywhere.
interface SoftColors {
    raised: string; // expanded accordion card
    control: string; // square header buttons, collapsed chevron
    controlHover: string;
    tile: string; // tiles inside a card (e.g. list items in accordion content)
    accentTint: string; // active nav item, icon squares, chips
    chipText: string;
    body: string; // long-form text inside cards
    nav: string; // inactive nav items
    linkHover: string;
    shadow: string; // resting card
    raisedShadow: string; // expanded card, menus, drawers
}

declare module "@mui/material/styles" {
    interface Palette {
        soft: SoftColors;
    }
    interface PaletteOptions {
        soft?: SoftColors;
    }
}

// Corner radii used outside the theme's own component overrides. `shape.borderRadius` (14) is
// the control radius; numbers passed to `sx` borderRadius get multiplied by it, so use these.
export const radius = {
    card: "28px",
    header: "22px",
    tile: "18px",
    icon: "16px",
    control: "14px",
    iconSmall: "12px",
} as const;

const getPalette = (mode: PaletteMode) =>
    mode === "dark"
        ? {
              mode,
              primary: { main: "#90caf9" },
              background: { default: "#10171f", paper: "#18212c" },
              text: { primary: "#e6edf5", secondary: "#a9b8c9" },
              divider: "rgba(169, 184, 201, 0.18)",
              soft: {
                  raised: "#1b2531",
                  control: "#1f2a37",
                  controlHover: "#263342",
                  tile: "#283648",
                  accentTint: "rgba(144, 202, 249, 0.12)",
                  chipText: "#b9dcfb",
                  body: "#d3dde8",
                  nav: "#a9b8c9",
                  linkHover: "#bfe0fb",
                  shadow: "none",
                  raisedShadow: "none",
              },
          }
        : {
              mode,
              primary: { main: "#2b5d92" },
              background: { default: "#eef2f6", paper: "#ffffff" },
              text: { primary: "#27466b", secondary: "#5a6b82" },
              divider: "rgba(31, 58, 92, 0.14)",
              soft: {
                  raised: "#ffffff",
                  control: "#eef2f6",
                  controlHover: "#e3e9f0",
                  tile: "#e8edf3",
                  accentTint: "#e3eefa",
                  chipText: "#2b5d92",
                  body: "#34506f",
                  nav: "#4f6079",
                  linkHover: "#1d4672",
                  shadow: "0 1px 3px rgba(31, 58, 92, 0.06)",
                  raisedShadow: "0 1px 3px rgba(31, 58, 92, 0.06), 0 10px 28px rgba(31, 58, 92, 0.06)",
              },
          };

const typography = {
    fontFamily: [
        '"Montserrat"',
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    // Profile name
    h3: { fontSize: "2.375rem", fontWeight: 700, letterSpacing: "-0.01em" },
    // Page title
    h4: { fontSize: "2.125rem", fontWeight: 700, letterSpacing: "-0.01em" },
    // Card and accordion titles
    h6: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4 },
    // Small uppercase card label
    overline: { fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.5 },
};

const focusRing = (theme: Theme) => ({
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
});

export const createAppTheme = (mode: PaletteMode) => {
    const base = createTheme({ palette: getPalette(mode), shape: { borderRadius: 14 }, typography });
    const { palette } = base;
    const { soft } = palette;

    const theme = createTheme(base, {
        components: {
            MuiPaper: {
                styleOverrides: {
                    // Dark mode lightens elevated paper with a gradient; the palette sets tones instead.
                    root: { backgroundImage: "none" },
                },
            },
            MuiCard: {
                defaultProps: { elevation: 0 },
                styleOverrides: {
                    root: { borderRadius: radius.card, boxShadow: soft.shadow },
                },
            },
            MuiAccordion: {
                defaultProps: { elevation: 0, disableGutters: true },
                styleOverrides: {
                    root: {
                        boxShadow: soft.shadow,
                        transition: base.transitions.create(["background-color", "box-shadow"]),
                        "&, &:first-of-type, &:last-of-type": { borderRadius: radius.card },
                        "&::before": { display: "none" },
                        "&.Mui-expanded": {
                            backgroundColor: soft.raised,
                            boxShadow: soft.raisedShadow,
                        },
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        gap: 16,
                        padding: "22px 22px 22px 28px",
                        borderRadius: radius.card,
                        [base.breakpoints.down("sm")]: { padding: "18px 16px" },
                        "&.Mui-focusVisible": { backgroundColor: "transparent", ...focusRing(base) },
                    },
                    // Title with the date stacked under it
                    content: { margin: 0, minWidth: 0, flexDirection: "column" },
                    expandIconWrapper: {
                        width: 40,
                        height: 40,
                        flex: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: soft.control,
                        color: palette.text.primary,
                        "&.Mui-expanded": {
                            backgroundColor: soft.accentTint,
                            color: palette.primary.main,
                        },
                    },
                },
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        padding: "4px 28px 28px",
                        color: soft.body,
                        lineHeight: 1.75,
                        [base.breakpoints.down("sm")]: { padding: "0 16px 16px" },
                        "& a": { color: palette.primary.main },
                        "& a:hover": { color: soft.linkHover },
                        "& strong": { color: palette.text.primary, fontWeight: 700 },
                        "& ul": {
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        },
                        // A <strong> subheading directly above a list gets the tile gap, less than the blank line after a list.
                        "& strong + ul": { marginTop: 10 },
                        "& li": {
                            backgroundColor: soft.tile,
                            borderRadius: radius.tile,
                            padding: "16px 18px",
                            [base.breakpoints.down("sm")]: { padding: "14px 16px" },
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        height: "auto",
                        borderRadius: 999,
                        backgroundColor: soft.accentTint,
                        color: soft.chipText,
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                    },
                    label: { padding: "7px 14px" },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: { borderColor: palette.divider },
                },
            },
            MuiLink: {
                defaultProps: { underline: "hover" },
                styleOverrides: {
                    root: { "&:hover": { color: soft.linkHover } },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        marginTop: 8,
                        minWidth: 180,
                        backgroundColor: mode === "dark" ? soft.control : palette.background.paper,
                        boxShadow: mode === "dark" ? "0 12px 32px rgba(0, 0, 0, 0.35)" : soft.raisedShadow,
                    },
                    list: { padding: 6 },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        fontWeight: 500,
                        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {
                            backgroundColor: soft.accentTint,
                            color: palette.primary.main,
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    // Drawers float as rounded cards instead of edge-to-edge sheets.
                    paper: {
                        margin: 12,
                        padding: 8,
                        height: "auto",
                        maxHeight: "calc(100% - 24px)",
                        borderRadius: radius.header,
                        boxShadow: mode === "dark" ? "0 16px 40px rgba(0, 0, 0, 0.4)" : soft.raisedShadow,
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                        color: soft.nav,
                        "& .MuiListItemIcon-root": { color: "inherit", minWidth: 40 },
                        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible": {
                            backgroundColor: soft.accentTint,
                            color: palette.primary.main,
                            fontWeight: 600,
                        },
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        gap: 6,
                        "& .MuiToggleButtonGroup-grouped": { borderRadius: 14, border: 0, margin: 0 },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        border: 0,
                        borderRadius: 14,
                        fontWeight: 600,
                        color: palette.text.primary,
                        backgroundColor: soft.control,
                        "&:hover": { backgroundColor: soft.controlHover },
                        "&.Mui-selected, &.Mui-selected:hover": {
                            backgroundColor: soft.accentTint,
                            color: palette.primary.main,
                        },
                    },
                },
            },
        },
    });

    return getResponsiveFontSizes(theme);
};

const getResponsiveFontSizes = (theme: Theme) => {
    const responsiveTheme = responsiveFontSizes(theme);

    responsiveTheme.typography.body1[theme.breakpoints.down("sm")] = {
        fontSize: "0.85rem",
    };

    return responsiveTheme;
};

export { focusRing };
