import { AppBar, Box, Container, CssBaseline, Modal } from '@mui/material'
import ToolBar from '../components/ToolBar'
import Map from '../components/map/Map'
import { useState } from 'react'
import MemoryList from '../components/MemoryList'
import { style } from '../components/modalStyle'

function MapPage() {
  const [isShowModal, setIsShowModal] = useState(false)

  const handleOpen = () => {
    setIsShowModal(true)
  }
  const handleClose = () => {
    setIsShowModal(false)
  }

  const modal = isShowModal ? (
    <Modal
      open={isShowModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style.modal}>
        <MemoryList />
      </Box>
    </Modal>
  ) : null

  return (
    <Box id='map-page'>
      <CssBaseline />
      <AppBar>
        <ToolBar />
      </AppBar>
      {/* <Box mt={8}> */}
      {/* Add top margin to create space below AppBar */}
      <Container component='main' sx={{ pt: 10 }}>
        <Map handleModalOpen={handleOpen} />
        {modal}
      </Container>
    </Box>
  )
}

export default MapPage
