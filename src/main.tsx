import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./redux/slices/auth/AuthProvider.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./components/styles/main.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
