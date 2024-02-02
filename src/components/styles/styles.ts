import { createTheme } from "@mui/material/styles";

export const PRIMARYCOLOR = "#65743a";
export const SECONDARYCOLOR = "#faf0ca";
export const TERTIARYCOLOR = "#6C9C18";
export const QUATERNARYCOLOR = "#F9F3E0";
export const QUINARYCOLOR = "#000";
export const SENARYCOLOR = "#f4f4f4";

export const ERRORCOLOR = "#d32f2f";

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARYCOLOR,
      light: SECONDARYCOLOR,
      dark: TERTIARYCOLOR,
    },
    background: {
      default: SECONDARYCOLOR,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: SECONDARYCOLOR,
        },
      },
    },
  },
});

export const style = {
  accordionContainer: {
    border: "3px solid",
    borderColor: TERTIARYCOLOR,
    borderRadius: "0.2rem",
    bgcolor: QUATERNARYCOLOR,
    marginBottom: "0.25rem",
  },
  accordionDetailsContainer: { borderTop: `3px solid ${TERTIARYCOLOR}` },
  absoluteLoaderContainer: {
    zIndex: 9999,
    position: "fixed",
    inset: 0,
    opacity: 0.25,
    backgroundColor: QUINARYCOLOR,
  },
};
