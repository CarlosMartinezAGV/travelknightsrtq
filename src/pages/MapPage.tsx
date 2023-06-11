import { Container } from '@mui/material'
import Map from '../components/map/Map'

function MapPage() {
  return (
    <Container component='main' maxWidth='xl' sx={{ pt: 6 }}>
      <Map />
    </Container>
  )
}

export default MapPage
