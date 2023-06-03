import { useFetchMemoriesQuery, useAddMemoryMutation } from '../redux/store'
import MemoryListItem from './MemoryListItem'
import { Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { style } from './modalStyle'
import { useState } from 'react'
import { Memory } from '../redux/types'

type MemoryListProps = {
  stateAbbreviation: string
  stateTitle: string
}

function MemoryList({ stateAbbreviation, stateTitle }: MemoryListProps) {
  const { data, error, isFetching } = useFetchMemoriesQuery(stateAbbreviation)
  const [addMemory, results] = useAddMemoryMutation()
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false)

  const handleAddMemory = () => {
    // addMemory()
  }

  let content = null
  if (isFetching) {
    // content = <Skeleton times={3} className='h-10 w-full' />
  } else if (error) {
    content = <div>Error Loading Memories...</div>
  } else {
    content = data?.map((memory: Memory) => {
      return <MemoryListItem key={memory.id} memory={memory}></MemoryListItem>
    })
  }

  // const defautContent = (
  //   )

  return (
    <Box>
      <Box sx={style.memorylist}>
        <h3>Memories for {stateTitle}</h3>
        <LoadingButton
          variant='contained'
          onClick={() => setIsAddMemoryModalOpen(true)}
          loading={results.isLoading}
        >
          Add Memory
        </LoadingButton>
      </Box>
      {content}
    </Box>
  )
}

export default MemoryList
