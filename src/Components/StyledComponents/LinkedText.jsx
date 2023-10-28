import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const LinkedText = styled(Typography)(({ theme }) => ({
    textDecoration: "underline",
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.light,
    },
}));

export default LinkedText;
