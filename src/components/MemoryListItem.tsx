import { useRemoveMemoryMutation } from '../redux/store'
import { Memory } from '../redux/types'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandablePanel from './ExpandablePanel'
import { Button } from '@mui/material'

type MemoryListItemProps = {
  memory: Memory
}

function MemoryListItem({ memory }: MemoryListItemProps) {
  const [removeMemory, results] = useRemoveMemoryMutation()

  const handleDeleteMemory = () => {
    removeMemory(memory)
  }

  const header = (
    <>
      <Button sx={{ mr: '10px' }} onClick={handleDeleteMemory} color='error'>
        <DeleteIcon />
      </Button>
      {memory.title}
    </>
  )
  return (
    <ExpandablePanel key={memory.id} header={header}>
      <div>fixme</div>
      {/* <PhotosList album={album} /> */}
    </ExpandablePanel>
  )
}

export default MemoryListItem
