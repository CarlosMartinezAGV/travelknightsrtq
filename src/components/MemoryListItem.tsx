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
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion'
import { Memory } from '../redux/types'
import { style } from './styles/styles'

type MemoryListItemProps = {
  memory: Memory
  expanded: number | false
  handleAccordionChange: (
    panel: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  handleLoading: (isLoadingFlag: boolean) => void
}

function MemoryListItem({
  memory,
  expanded,
  handleAccordionChange,
  handleLoading,
}: MemoryListItemProps) {
  const currentState = useSelector(selectCurrentState)
  const [removeMemory] = useRemoveMemoryMutation()
  const [removeState] = useRemoveStateMutation()

  const dispatch = useDispatch()

  // Async function to remove memory
  // and show progress indicator
  const handleDeleteMemory = async () => {
    handleLoading(true)
    // Remove memory first, then state when it's the last memory in the state
    await removeMemory(memory)

    if (currentState.totalStateMemoryCount === 1) {
      await removeState(memory.stateId)
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }))
    }
    handleLoading(false)
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
            {new Date(memory.startDate).toLocaleDateString('en-US')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {new Date(memory.endDate).toLocaleDateString('en-US')}
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
