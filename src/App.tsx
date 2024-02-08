import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./redux/slices/auth/RequireAuth";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/styles/main";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<RequireAuth />}>
            {/* protected routes */}
            <Route path="/map" element={<MapPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
