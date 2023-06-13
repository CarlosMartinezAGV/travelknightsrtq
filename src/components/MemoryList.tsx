import {
  useFetchMemoriesQuery,
  setTotalStateMemoryCount,
  setCurrentStateWithId,
} from '../redux/store'
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentState } from '../redux/store'
import MemoryListItem from './MemoryListItem'
import { useEffect, useState } from 'react'
import AddMemoryForm from './AddMemoryForm'
import { Memory } from '../redux/types'
import { style } from './styles/styles'

function MemoryList() {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | false>(false)
  const currentState = useSelector(selectCurrentState)
  const [isLoading, setIsLoading] = useState(false)
  const {
    data: memoriesData,
    error: memoriesError,
    isFetching: isFetchingMemories,
  } = useFetchMemoriesQuery(currentState)

  const dispatch = useDispatch()

  // Set total state memory count
  // Set current state from first memory stateId
  useEffect(() => {
    if (memoriesData && memoriesData?.length > 0) {
      dispatch(setCurrentStateWithId({ id: memoriesData[0].stateId }))

      dispatch(
        setTotalStateMemoryCount({
          totalStateMemoryCount: memoriesData?.length,
        })
      )
    } else {
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }))
    }
  }, [dispatch, memoriesData])

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(!isAddMemoryModalOpen)
  }

  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleLoading = (isLoadingFlag: boolean) => {
    setIsLoading(isLoadingFlag)
  }

  let content = null
  if (isLoading || isFetchingMemories) {
    content = (
      <Box sx={style.loadingProgress}>
        <CircularProgress />
      </Box>
    )
  } else if (memoriesError) {
    content = <Box>Error Loading Memories...</Box>
  } else if (isAddMemoryModalOpen) {
    content = <AddMemoryForm handleBackClick={handleAddMemory} />
  } else {
    content =
      // Check if there are memories
      // If there are no memories, display empty list message
      memoriesData?.length === 0 ? (
        <Box id='no-memories-message' sx={style.emptylist}>
          No Memories Yet. Add One!
        </Box>
      ) : (
        // If there are memories, display memories
        <Box>
          <Box id='modal-headers' sx={style.modalHeader}>
            <Typography fontWeight='bold' sx={{ flexShrink: 0 }}>
              Title
            </Typography>
            <Typography fontWeight='bold'>City</Typography>
            <Typography fontWeight='bold'>Start Date</Typography>
            <Typography fontWeight='bold'>End Date</Typography>
          </Box>
          <Box id='memory-list-items'>
            {memoriesData?.map((memory: Memory) => {
              return (
                <MemoryListItem
                  expanded={expanded}
                  handleAccordionChange={handleAccordionChange}
                  key={memory.id}
                  memory={memory}
                  handleLoading={handleLoading}
                />
              )
            })}
          </Box>
        </Box>
      )
  }

  const defautContent = (
    <Box id='modal-memory-content' sx={style.memorylist}>
      <Box>
        <h3>Your Memories From {currentState.currentStateTitle}</h3>
      </Box>
      <Button
        variant='contained'
        sx={style.primaryButton}
        onClick={() => setIsAddMemoryModalOpen(!isAddMemoryModalOpen)}
      >
        Add Memory
      </Button>
    </Box>
  )

  return (
    <Box id='memory-list'>
      {isAddMemoryModalOpen ? null : defautContent}
      {content}
    </Box>
  )
}

export default MemoryList
