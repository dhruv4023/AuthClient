import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonSC = styled(Button)(({ theme }) => ({
  margin: "2rem 0",
  padding: "1rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.alt,
  "&:hover": { color: theme.palette.primary.main },
}));

export default ButtonSC;
