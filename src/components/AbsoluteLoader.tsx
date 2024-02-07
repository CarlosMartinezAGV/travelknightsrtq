import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { style } from "./styles/main";

function AbsoluteLoader() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={style.absoluteLoaderContainer}
    >
      <CircularProgress color="success" />
    </Stack>
  );
}

export default AbsoluteLoader;
