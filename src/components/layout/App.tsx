import Box from "@mui/material/Box";
import Header from "./Header";
import { Outlet } from "react-router";

function App() {
    return (
        <Box sx={{ px: 2, pt: 2.5, pb: 9 }}>
            <Header />
            <Outlet />
        </Box>
    );
}

export default App;
