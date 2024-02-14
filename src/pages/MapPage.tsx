import ToolBar from "../components/ToolBar";
import AppBar from "@mui/material/AppBar";
import SVGMap from "../components/map/SVGMap";
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
        <SVGMap />
      </Stack>
    </Stack>
  );
}

export default MapPage;
