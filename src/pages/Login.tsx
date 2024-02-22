import { AuthContext } from "../redux/slices/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AuthUI from "../components/AuthUI";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // If user exists, navigate to the map page
  useEffect(() => {
    if (user) {
      navigate("/map");
    }
  }, [user, navigate]);

  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: "100dvh", minWidth: "100dvw" }}
    >
      <Grid
        item
        xs={false}
        sm={false}
        md={false}
        lg={7}
        sx={{
          backgroundImage: "url('/assets/knight-on-plane-1200w.webp')",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Stack
          pt={10}
          px={{ xs: 2.4, sm: 0 }}
          maxWidth={{ xs: 350, sm: 400 }}
          margin="auto"
        >
          <AuthUI />
        </Stack>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Login;
