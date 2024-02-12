import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const PRIMARYCOLOR = "#65743a";
export const SECONDARYCOLOR = "#faf0ca";
export const TERTIARYCOLOR = "#6C9C18";
export const QUATERNARYCOLOR = "#F9F3E0";
export const QUINARYCOLOR = "#000";
export const SENARYCOLOR = "#f4f4f4";

export const ERRORCOLOR = "#d32f2f";

export const theme = responsiveFontSizes(
  createTheme({
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
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Roboto",
          },
          h1: {
            fontSize: "2.75rem",
            "@media (min-width:400px)": {
              fontSize: "3.2rem",
            },
            "@media (min-width:600px)": {
              fontSize: "4rem",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: SECONDARYCOLOR,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: QUATERNARYCOLOR,
            border: `2px solid ${TERTIARYCOLOR}`,
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: QUATERNARYCOLOR,
            borderTop: `2px solid ${TERTIARYCOLOR}`,
            borderBottom: `2px solid ${TERTIARYCOLOR}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: SECONDARYCOLOR,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderWidth: "2px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: SECONDARYCOLOR,
            label: {
              color: PRIMARYCOLOR,
            },
          },
        },
      },
    },
  })
);

export const style = {
  absoluteLoaderContainer: {
    zIndex: 9999,
    position: "fixed",
    inset: 0,
    opacity: 0.25,
    backgroundColor: QUINARYCOLOR,
  },
};
