import { AccountCircle } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Logout from "../redux/hooks/Logout";
import Menu from "@mui/material/Menu";
import { useState } from "react";

function ToolBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ backgroundColor: "primary" }}>
      <Typography
        variant="h3"
        component="div"
        textAlign={"center"}
        color={"primary.light"}
        width={"100%"}
      >
        TravelKnights
      </Typography>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ color: "primary.light" }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={Logout}>Logout</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
}

export default ToolBar;
