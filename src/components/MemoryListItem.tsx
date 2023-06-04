import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRemoveMemoryMutation } from '../redux/store'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import { Memory } from '../redux/types'

type MemoryListItemProps = {
  memory: Memory
  expanded: number | false
  handleAccordionChange: (
    panel: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}

function MemoryListItem({
  memory,
  expanded,
  handleAccordionChange,
}: MemoryListItemProps) {
  const [removeMemory, results] = useRemoveMemoryMutation()

  const handleDeleteMemory = () => {
    removeMemory(memory)
  }

  return (
    <Accordion
      expanded={expanded === memory.id}
      onChange={handleAccordionChange(memory.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography sx={{ width: '50%', flexShrink: 0 }}>
          {memory.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{memory.city}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{memory.description}</Typography>
      </AccordionDetails>
      <Button sx={{ mr: '10px' }} onClick={handleDeleteMemory} color='error'>
        <DeleteIcon />
      </Button>
    </Accordion>
  )
}

export default MemoryListItem
