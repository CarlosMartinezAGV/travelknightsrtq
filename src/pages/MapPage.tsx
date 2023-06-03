import { AppBar, Box, CssBaseline, Modal } from '@mui/material'
import ToolBar from '../components/ToolBar'
import Map from '../components/map/Map'
import { useState } from 'react'
import MemoryList from '../components/MemoryList'
import { style } from '../components/modalStyle'
// FIXME:
// default state added in order to not change 3 files for an undefined error

function MapPage() {
  const [isShowModal, setIsShowModal] = useState(false)
  const [state, setState] = useState<{
    stateAbbreviation: string
    title: string
  }>({ stateAbbreviation: '', title: '' })

  const handleOpen = (stateAbbreviation: string, title: string) => {
    setState({ stateAbbreviation: stateAbbreviation, title: title })
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
        <MemoryList
          stateAbbreviation={state.stateAbbreviation}
          stateTitle={state.title}
        />
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
      <Box>
        <Map handleModalOpen={handleOpen} />
      </Box>
      {modal}
    </Box>
  )
}

export default MapPage
