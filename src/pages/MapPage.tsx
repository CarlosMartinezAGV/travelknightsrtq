import ToolBar from "../components/ToolBar";
import AppBar from "@mui/material/AppBar";
import Map from "../components/map/Map";
import Stack from "@mui/material/Stack";

function MapPage() {
  return (
    <Stack
      id="main-page"
      alignItems={"center"}
      minHeight={"100dvh"}
      minWidth={"100dvw"}
    >
      <AppBar>
        <ToolBar />
      </AppBar>
      <Stack
        pt={10}
        maxHeight="100dvh"
        width="100%"
        id="map-page"
        component="main"
      >
        <Map />
      </Stack>
    </Stack>
  );
}

export default MapPage;
