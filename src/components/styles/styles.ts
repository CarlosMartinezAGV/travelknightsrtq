const primaryBackgroundColor = "#faf0ca"

export const style = {
  accordionDescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "0.5rem",
  },
  accordionContainer: {
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
    minWidth: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: primaryBackgroundColor,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalHeader: {
    width: "100%",
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    pl: 2,
    pr: 9,
    mb: 1,
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    minWidth: "60%",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginY: "0.7rem",
  },
  absoluteLoaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    position: "fixed",
    inset: 0,
    opacity: 0.25,
    backgroundColor: "#000000",
  },
  errorMessageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  memorylist: {
    margin: "0.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memorylistItemData: {
    width: "100%",
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    pr: 4,
  },
  addMemoryForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addMemoryFormButtonLayout: {
    display: "flex",
    justifyContent: "flex-end",
  },
  emptylist: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.75rem",
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
}
