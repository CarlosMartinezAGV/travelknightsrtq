import { useFetchMemoriesQuery } from '../redux/store'
import { selectCurrentState } from '../redux/store'
import MemoryListItem from './MemoryListItem'
import AddMemoryForm from './AddMemoryForm'
import { Box, Button } from '@mui/material'
import { style } from './styles/modalStyle'
import { useSelector } from 'react-redux'
import { Memory } from '../redux/types'
import { useState } from 'react'

function MemoryList() {
  const [expanded, setExpanded] = useState<number | false>(false)
  const currentState = useSelector(selectCurrentState)
  const { data, error, isFetching } = useFetchMemoriesQuery(currentState)
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false)

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(!isAddMemoryModalOpen)
  }

  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  let content = null
  if (isFetching) {
    // content = <Skeleton times={3} className='h-10 w-full' />
  } else if (error) {
    content = <div>Error Loading Memories...</div>
  } else if (isAddMemoryModalOpen) {
    content = <AddMemoryForm handleBackClick={handleAddMemory} />
  } else {
    content = data?.map((memory: Memory) => {
      return (
        <MemoryListItem
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          key={memory.id}
          memory={memory}
        ></MemoryListItem>
      )
    })
  }

  const defautContent = (
    <Box sx={style.memorylist}>
      <h3>Your Memories For {currentState.currentStateTitle}</h3>
      <Button
        variant='contained'
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
