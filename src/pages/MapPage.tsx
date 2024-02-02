import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ToolBar from "../components/ToolBar";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/material";
import Map from "../components/map/Map";

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
      <Container id="map-page" component="main" maxWidth="xl">
        <Map />
      </Container>
    </Stack>
  );
}

export default MapPage;
