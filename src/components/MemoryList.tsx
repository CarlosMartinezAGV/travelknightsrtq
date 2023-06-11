import {
  useFetchMemoriesQuery,
  setTotalStateMemoryCount,
  setCurrentStateWithId,
} from '../redux/store'
import { Box, Button, Skeleton, Typography } from '@mui/material'
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
  const {
    data: memoriesData,
    error: memoriesError,
    isFetching: isFetchingMemories,
  } = useFetchMemoriesQuery(currentState)

  const dispatch = useDispatch()

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

  let content = null
  if (isFetchingMemories) {
    content = <Skeleton animation='wave' />
  } else if (memoriesError) {
    content = <div>Error Loading Memories...</div>
  } else if (isAddMemoryModalOpen) {
    content = <AddMemoryForm handleBackClick={handleAddMemory} />
  } else {
    content =
      memoriesData?.length === 0 ? (
        <Box sx={style.emptylist}>No Memories Yet. Add One!</Box>
      ) : (
        <Box>
          <Box
            sx={{
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'space-between',
              pl: 2,
              pr: 11,
              mb: 1,
            }}
          >
            <Typography sx={{ flexShrink: 0 }}>Title</Typography>
            <Typography sx={{ color: 'text.secondary' }}>City</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Date</Typography>
          </Box>

          {memoriesData?.map((memory: Memory) => {
            return (
              <MemoryListItem
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
                key={memory.id}
                memory={memory}
              />
            )
          })}
        </Box>
      )
  }

  const defautContent = (
    <Box sx={style.memorylist}>
      <h3>Your Memories From {currentState.currentStateTitle}</h3>
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
    <Box>
      {isAddMemoryModalOpen ? null : defautContent}
      {content}
    </Box>
  )
}

export default MemoryList
