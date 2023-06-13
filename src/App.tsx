import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar, Box, CssBaseline } from '@mui/material'
import { style } from './components/styles/styles'
import ToolBar from './components/ToolBar'
import MapPage from './pages/MapPage'
import './app.css'

// Create a custom theme with the desired focused color
// Allows us to use the theme in our components
// Green is main color
const theme = createTheme({
  palette: {
    primary: {
      main: '#65743a',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box id='main-page' sx={style.mainPage}>
        <CssBaseline />
        <AppBar>
          <ToolBar />
        </AppBar>
        <MapPage />
      </Box>
    </ThemeProvider>
  )
}

export default App
