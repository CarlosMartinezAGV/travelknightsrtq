import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  selectCurrentState,
  setTotalStateMemoryCount,
  useRemoveMemoryMutation,
  useRemoveStateMutation,
} from '../redux/store'
import { Box, Button, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import { Memory } from '../redux/types'
import { style } from './styles/styles'
import { useDispatch, useSelector } from 'react-redux'

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
  const currentState = useSelector(selectCurrentState)
  const [removeMemory, results] = useRemoveMemoryMutation()
  const [removeState, removeStateResults] = useRemoveStateMutation()

  const dispatch = useDispatch()

  const handleDeleteMemory = () => {
    if (currentState.totalStateMemoryCount === 1) {
      removeState(memory.stateId)
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }))
    }
    removeMemory(memory)
  }

  return (
    <Accordion
      expanded={expanded === memory.id}
      onChange={handleAccordionChange(memory.id)}
      sx={style.backgroundColorSecondary}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Box
          sx={{
            width: '100%',
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            pr: 4,
          }}
        >
          <Typography sx={{ flexShrink: 0 }}>{memory.title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {memory.city}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {new Date(memory.date).toLocaleDateString('en-US')}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{memory.description}</Typography>
      </AccordionDetails>
      <Button sx={{ mr: '10px' }} onClick={handleDeleteMemory} color='error'>
        Delete
      </Button>
    </Accordion>
  )
}

export default MemoryListItem
