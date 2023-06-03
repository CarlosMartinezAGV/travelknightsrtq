import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Toolbar from '@mui/material/Toolbar'
import { AccountCircle } from '@mui/icons-material'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'

function ToolBar() {
  return (
    <Toolbar sx={{ backgroundColor: '#65743a' }}>
      <AccountCircle sx={{ fontSize: 21, m: 0.4 }} />
      <Typography component='div' sx={{ fontSize: 15 }}>
        Carlos Martinez
      </Typography>
      <Typography
        variant='h5'
        component='div'
        sx={{ flexGrow: 1 }}
        style={{ textAlign: 'center' }}
      >
        Travel Knights
      </Typography>

      <Button
        color='inherit'
        sx={{ textTransform: 'none' }}
        // onClick={handleOpenUserMenu}
      >
        <MenuIcon />
      </Button>

      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        // anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        // temp
        open={false} // open={Boolean(anchorElUser)}
        // onClose={handleCloseUserMenu}
      >
        <MenuItem
        //onClick={Logout}
        >
          <Typography textAlign='center'>Logout</Typography>
        </MenuItem>
      </Menu>
    </Toolbar>
  )
}

export default ToolBar
