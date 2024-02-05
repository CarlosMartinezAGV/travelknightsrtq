import CircularProgress from "@mui/material/CircularProgress";
import { style } from "./styles/main";
import { Stack } from "@mui/material";

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
