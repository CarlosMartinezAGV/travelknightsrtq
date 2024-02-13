import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./redux/slices/auth/RequireAuth";

import Login from "./pages/Login";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<RequireAuth />}>
          {/* protected routes */}
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
