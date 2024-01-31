import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./components/styles/styles";
import ToolBar from "./components/ToolBar";
import AppBar from "@mui/material/AppBar";
import MapPage from "./pages/MapPage";
import { Stack } from "@mui/material";
import "./app.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        id="main-page"
        alignItems={"center"}
        minHeight={"100dvh"}
        minWidth={"100dvw"}
        pt={10}
      >
        <CssBaseline />
        <AppBar>
          <ToolBar />
        </AppBar>
        <MapPage />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
