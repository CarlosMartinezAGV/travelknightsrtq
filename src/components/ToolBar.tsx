import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import { AccountCircle } from '@mui/icons-material'

function ToolBar() {
  return (
    <Toolbar sx={{ backgroundColor: '#65743a' }}>
      <AccountCircle sx={{ fontSize: 21 }} />
      <Typography component='div' sx={{ fontSize: 18, ml: 1 }}>
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
    </Toolbar>
  )
}

export default ToolBar
