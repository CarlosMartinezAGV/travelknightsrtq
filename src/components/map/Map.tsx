import RenderedSVGStates from "./RenderedSVGStates";
import { setCurrentState } from "../../redux/store";
import AbsoluteLoader from "../AbsoluteLoader";
import { useDispatch } from "react-redux";
import MemoryList from "../MemoryList";
import { useState } from "react";
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
import useGetStates from "../../redux/hooks/useGetStates";

function Map() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetStates();

  if (error) {
    throw new Error(`Map.tsx error: ${error}`);
  }

  const [isShowDialog, setIsShowDialog] = useState(false);

  const handleModalOpen = (
    state_id: number | null,
    abbreviation: string,
    name: string
  ) => {
    setIsShowDialog(true);
    dispatch(
      setCurrentState({
        id: state_id,
        abbreviation,
        name,
      })
    );
  };

  const handleModalClose = () => {
    setIsShowDialog(false);
  };

  // Theme and full screen for dialog modal on mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dialog = isShowDialog && (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={isShowDialog}
      onClose={handleModalClose}
      aria-labelledby="memory-list-title"
      aria-describedby="memory-list-description"
    >
      <Fade in={isShowDialog}>
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

  return (
    <>
      {/* isLoading for fetching map */}
      {isLoading ? (
        <AbsoluteLoader />
      ) : (
        <>
          <svg
            id="USMap"
            viewBox="70 -5 1200 750"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <RenderedSVGStates data={data} handleModalOpen={handleModalOpen} />
          </svg>
        </>
      )}
      {dialog}
    </>
  );
}

export default Map;
