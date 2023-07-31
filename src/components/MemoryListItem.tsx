import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  selectCurrentState,
  setTotalStateMemoryCount,
  useRemoveMemoryMutation,
  useRemoveStateMutation,
  setMemoryToEdit,
} from "../redux/store"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Accordion from "@mui/material/Accordion"
import { Memory } from "../redux/types"
import { style } from "./styles/styles"
type MemoryListItemProps = {
  memory: Memory
  expanded: number | false
  handleAccordionChange: (
    panel: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  handleLoading: (isLoadingFlag: boolean) => void
  handleEditMemoryToggle: () => void
}

function MemoryListItem({
  memory,
  expanded,
  handleAccordionChange,
  handleLoading,
  handleEditMemoryToggle,
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

  const handleEditMemory = () => {
    dispatch(setMemoryToEdit({ ...memory }))
    handleEditMemoryToggle()
  }

  return (
    <Accordion
      expanded={expanded === memory.id}
      onChange={handleAccordionChange(memory.id)}
      sx={style.accordionContainer}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container id="modal-headers" sx={style.memorylistItemData}>
          <Grid item xs={3}>
            <Typography sx={{ flexShrink: 5 }}>{memory.title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ flexShrink: 0 }}>{memory.city}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ flexShrink: 0 }}>
              {new Date(memory.startDate).toLocaleDateString("en-US")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ flexShrink: 0 }}>
              {new Date(memory.endDate).toLocaleDateString("en-US")}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails sx={style.accordionDetailsContainer}>
        <Typography fontWeight="bold">
          Your trip went something like this:
        </Typography>
        <Typography sx={style.accordionDescriptionContainer}>
          {memory.description}
        </Typography>
      </AccordionDetails>
      <Box sx={style.deleteButtonContainer}>
        <Button
          onClick={handleDeleteMemory}
          startIcon={<DeleteIcon />}
          color="error"
        >
          Delete
        </Button>
        <Button
          onClick={handleEditMemory}
          variant="contained"
          startIcon={<EditIcon />}
          style={{ backgroundColor: "#848484", marginLeft: 6 }}
        >
          Edit
        </Button>
      </Box>
    </Accordion>
  )
}

export default MemoryListItem
