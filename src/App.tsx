import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./redux/slices/auth/RequireAuth";

import Login from "./pages/Login";
import MapPage from "./pages/MapPage";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />

        <Route element={<RequireAuth />}>
          {/* protected routes */}
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
