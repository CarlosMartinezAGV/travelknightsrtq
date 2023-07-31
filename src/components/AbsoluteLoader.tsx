import CircularProgress from "@mui/material/CircularProgress"
import { style } from "./styles/styles"
import Box from "@mui/material/Box"

function AbsoluteLoader() {
  return (
    <Box sx={style.absoluteLoaderContainer}>
      <CircularProgress color="success" />
    </Box>
  )
}

export default AbsoluteLoader
