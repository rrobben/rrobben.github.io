import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box, Divider, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useIsMobile } from "../../hooks";

interface AccordionItem {
    header: string;
    subheader?: string;
    content: string;
    dividerAfter?: boolean;
}

interface Props {
    items: AccordionItem[];
}

// Each item is its own rounded card; the card, chevron and content styles live in the
// MuiAccordion* overrides in theme.ts.
const AccordionGroup = ({ items }: Props) => {
    const isMobile = useIsMobile();
    // Don't expand by default in mobile to allow better overview of contents.
    const [expanded, setExpanded] = useState<string | false>(isMobile ? false : items[0]?.header);

    const handleChange = (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {items.map((i) => (
                <Fragment key={i.header}>
                    <Accordion expanded={expanded === i.header} onChange={handleChange(i.header)}>
                        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                            <Typography variant="h6" component="span" sx={{ display: "block" }}>
                                {i.header}
                            </Typography>
                            {i.subheader ? (
                                <Typography
                                    component="span"
                                    sx={{ display: "block", mt: 0.75, fontSize: "0.875rem", fontWeight: 500, color: "text.secondary" }}
                                >
                                    {i.subheader}
                                </Typography>
                            ) : null}
                        </AccordionSummary>
                        <AccordionDetails>
                            <div dangerouslySetInnerHTML={{ __html: i.content }}></div>
                        </AccordionDetails>
                    </Accordion>
                    {i.dividerAfter && <Divider sx={{ my: 1.5, mx: 3 }} />}
                </Fragment>
            ))}
        </Box>
    );
};

export default AccordionGroup;
