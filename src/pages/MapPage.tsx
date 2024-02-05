import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ToolBar from "../components/ToolBar";
import AppBar from "@mui/material/AppBar";
import Map from "../components/map/Map";
import { Stack } from "@mui/material";

function MapPage() {
  return (
    <Stack
      id="main-page"
      alignItems={"center"}
      minHeight={"100dvh"}
      minWidth={"100dvw"}
    >
      <CssBaseline />
      <AppBar>
        <ToolBar />
      </AppBar>
      <Container
        id="map-page"
        component="main"
        maxWidth="xl"
        sx={{ paddingTop: 12 }}
      >
        <Map />
      </Container>
    </Stack>
  );
}

export default MapPage;
