import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.alt,
    borderRadius: '10px',
    padding: '1.5rem'
}));

export default WidgetWrapper;
