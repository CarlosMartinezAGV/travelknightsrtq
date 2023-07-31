/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFetchStatesQuery } from "../../redux/store"
import { setCurrentState } from "../../redux/store"
import { useDispatch } from "react-redux"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { states } from "./states"
import "../styles/map.css"
import { useState } from "react"
import MemoryList from "../MemoryList"
import { style } from "../styles/styles"
import EditMemoryForm from "../EditMemoryForm"
import AbsoluteLoader from "../AbsoluteLoader"

function Map() {
  const { data, isLoading } = useFetchStatesQuery()
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowEditMemory, setIsShowEditMemory] = useState(false)
  const dispatch = useDispatch()

  const handleModalOpen = (
    id: number | undefined,
    currentStateAbbreviation: string,
    currentStateTitle: string
  ) => {
    setIsShowModal(true)
    dispatch(
      setCurrentState({
        id,
        currentStateAbbreviation,
        currentStateTitle,
      })
    )
  }

  const handleModalClose = () => {
    setIsShowModal(false)
  }

  const handleEditMemoryToggle = () => {
    setIsShowEditMemory(!isShowEditMemory)
  }
  const modal = isShowModal ? (
    <Modal
      open={isShowModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.modal}>
        {isShowEditMemory ? (
          <EditMemoryForm handleBackClick={handleEditMemoryToggle} />
        ) : (
          <MemoryList handleEditMemoryToggle={handleEditMemoryToggle} />
        )}
      </Box>
    </Modal>
  ) : null

  const renderedStates = states.map(
    ({ title, className, id: stateAbbreviation, ...props }) => {
      let stateId: number | undefined = undefined

      // Check if state is in state and add visited class
      const isVisited = data?.some(({ abbreviation, id }) => {
        if (abbreviation === stateAbbreviation) {
          stateId = id
          return true
        } else return false
      })

      // Add visited class if state is in state
      const stateVisitedClass = isVisited ? className + " visited" : className
      return (
        <path
          key={stateAbbreviation}
          id={stateAbbreviation}
          {...props}
          className={stateVisitedClass}
          onClick={() => handleModalOpen(stateId, stateAbbreviation, title)}
        >
          <title>{title}</title>
        </path>
      )
    }
  )

  return (
    <>
      {isLoading ? (
        <AbsoluteLoader />
      ) : (
        <>
          <svg
            id="USMap"
            viewBox="70 -5 1200 750"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g>{renderedStates}</g>
          </svg>
          {modal}
        </>
      )}
    </>
  )
}

export default Map
