import Box from "@mui/material/Box";
import Copyright from "../components/Copyright";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
      }}
    >
      <Copyright />
    </Box>
  );
}

export default Footer;
