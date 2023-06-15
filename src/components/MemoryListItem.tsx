import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  selectCurrentState,
  setTotalStateMemoryCount,
  useRemoveMemoryMutation,
  useRemoveStateMutation,
} from '../redux/store'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
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
      sx={style.accordionContainer}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Grid container id='modal-headers' sx={style.memorylistItemData}>
          <Grid item xs={3}>
            <Typography sx={{ flexShrink: 5 }}>{memory.title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ flexShrink: 0 }}>{memory.city}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ flexShrink: 0 }}>
              {new Date(memory.startDate).toLocaleDateString('en-US')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ flexShrink: 0 }}>
              {new Date(memory.endDate).toLocaleDateString('en-US')}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails sx={style.accordionDetailsContainer}>
        <Typography fontWeight='bold'>
          Your trip went something like this:
        </Typography>
        <Typography sx={style.accordionDescriptionContainer}>
          {memory.description}
        </Typography>
      </AccordionDetails>
      <Box sx={style.deleteButtonContainer}>
        <Button
          onClick={handleDeleteMemory}
          variant='outlined'
          startIcon={<DeleteIcon />}
          color='error'
        >
          Delete
        </Button>
      </Box>
    </Accordion>
  )
}

export default MemoryListItem
