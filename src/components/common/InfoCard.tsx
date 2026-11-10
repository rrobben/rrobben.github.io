import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface Props {
    header: string;
    content: string;
    subcontents: string[];
}

const InfoCard = ({ header, content, subcontents }: Props) => (
    <Card component="section" sx={{ p: { xs: 3, sm: 3.5 } }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            {header}
        </Typography>
        <Typography sx={{ color: "soft.body", mb: 1 }}>{content}</Typography>
        {subcontents.map((c) => (
            <Typography key={c} sx={{ color: "text.secondary", fontSize: "0.875rem", fontWeight: 500 }}>
                {c}
            </Typography>
        ))}
    </Card>
);

export default InfoCard;
