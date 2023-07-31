import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"

function ToolBar() {
  return (
    <Toolbar sx={{ backgroundColor: "#65743a" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
        style={{ textAlign: "center" }}
      >
        Travel Knights
      </Typography>
    </Toolbar>
  )
}

export default ToolBar
