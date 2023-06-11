import { AppBar, Box, CssBaseline } from '@mui/material'
import { style } from './components/styles/styles'
import ToolBar from './components/ToolBar'
import MapPage from './pages/MapPage'

function App() {
  return (
    <Box id='main-page' sx={style.backgroundColorPrimary}>
      <CssBaseline />
      <AppBar>
        <ToolBar />
      </AppBar>
      <MapPage />
    </Box>
  )
}

export default App
