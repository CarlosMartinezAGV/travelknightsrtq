import React from "react";
import "../styles/map.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import CloseIcon from "@mui/icons-material/Close";
import MemoryList from "../memory/MemoryList";

type TMemoryListDialog = {
  isShowMemoryListDialog: boolean;
  setIsShowMemoryListDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function MemoryListDialog({
  isShowMemoryListDialog,
  setIsShowMemoryListDialog,
}: TMemoryListDialog) {
  const handleModalClose = () => {
    setIsShowMemoryListDialog(false);
  };

  // Theme and full screen for dialog modal on mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={isShowMemoryListDialog}
      onClose={handleModalClose}
      aria-labelledby="memory-list-title"
      aria-describedby="memory-list-description"
    >
      <Fade in={isShowMemoryListDialog}>
        <Box>
          {fullScreen && (
            <AppBar sx={{ position: "relative" }}>
              <Toolbar sx={{ justifyContent: "flex-end" }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleModalClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          <DialogContent>
            <MemoryList />
          </DialogContent>
        </Box>
      </Fade>
    </Dialog>
  );
}

export default MemoryListDialog;
