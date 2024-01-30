const primaryBackgroundColor = "#faf0ca";

export const style = {
  accordionContainer: {
    width: "100%",
    border: "3px solid",
    borderColor: "#65743a",
    borderRadius: "0.2rem",
    bgcolor: "#F9F3E0",
    marginBottom: "0.25rem",
  },
  accordionDetailsContainer: { borderTop: "3px solid #65743a" },
  backgroundColorPrimary: {
    bgcolor: primaryBackgroundColor,
  },
  backgroundColorSecondary: {
    bgcolor: "#F9F3E0",
  },
  mainPage: {
    bgcolor: primaryBackgroundColor,
    pt: 14,
    display: "flex",
  },
  modal: {
    position: "absolute",
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: primaryBackgroundColor,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  absoluteLoaderContainer: {
    zIndex: 9999,
    position: "fixed",
    inset: 0,
    opacity: 0.25,
    backgroundColor: "#000000",
  },
  memorylist: {
    width: "100%",
    margin: "0.5rem",
    paddingBottom: "0.5rem",
  },
  primaryButton: {
    "&:hover": {
      backgroundColor: "#6C9C18",
    },
    ml: 1,
  },
  secondaryButton: {
    ml: 1,
  },
};
