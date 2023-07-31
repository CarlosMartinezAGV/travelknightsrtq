import {
  useFetchMemoriesQuery,
  setTotalStateMemoryCount,
  setCurrentStateWithId,
} from "../redux/store"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentState } from "../redux/store"
import AddIcon from "@mui/icons-material/Add"
import MemoryListItem from "./MemoryListItem"
import { useCallback, useEffect, useMemo, useState } from "react"
import AddMemoryForm from "./AddMemoryForm"
import { Memory } from "../redux/types"
import { style } from "./styles/styles"

type MemoryListProps = {
  handleEditMemoryToggle: () => void
}

function MemoryList({ handleEditMemoryToggle }: MemoryListProps) {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | false>(false)
  const currentState = useSelector(selectCurrentState)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  // fix memoize when state changes
  const {
    data: memoriesDataFromQuery,
    error: memoriesError,
    isFetching: isFetchingMemories,
  } = useFetchMemoriesQuery(currentState)

  // Memoize memories data from query
  const memoriesData = useMemo(() => {
    return memoriesDataFromQuery
  }, [memoriesDataFromQuery])

  // Set total state memory count
  // Set current state from first memory stateId
  useEffect(() => {
    if (memoriesData && memoriesData.length > 0) {
      dispatch(setCurrentStateWithId({ id: memoriesData[0].stateId }))
      dispatch(
        setTotalStateMemoryCount({ totalStateMemoryCount: memoriesData.length })
      )
    } else {
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }))
    }
  }, [dispatch, memoriesData])

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(!isAddMemoryModalOpen)
    setExpanded(false)
  }

  const handleAccordionChange = useCallback(
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded ? panel : prevExpanded === panel ? false : prevExpanded
      )
    },
    []
  )

  const handleLoading = (isLoadingFlag: boolean) => {
    setIsLoading(isLoadingFlag)
  }

  let content = null
  if (isLoading || isFetchingMemories) {
    content = (
      <Box sx={style.loaderContainer}>
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
        <Box id="no-memories-message" sx={style.emptylist}>
          No Memories Yet. Add One!
        </Box>
      ) : (
        // If there are memories, display memories
        <Box>
          <Grid container id="modal-headers" sx={style.modalHeader}>
            <Grid item xs={3}>
              <Typography fontWeight="bold" sx={{ flexShrink: 0 }}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight="bold">City</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight="bold">Start Date</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight="bold">End Date</Typography>
            </Grid>
          </Grid>
          <Box id="memory-list-items">
            {memoriesData?.map((memory: Memory) => {
              return (
                <MemoryListItem
                  expanded={expanded}
                  handleAccordionChange={handleAccordionChange}
                  key={memory.id}
                  memory={memory}
                  handleLoading={handleLoading}
                  handleEditMemoryToggle={handleEditMemoryToggle}
                />
              )
            })}
          </Box>
        </Box>
      )
  }

  const defautContent = (
    <Box id="modal-memory-content" sx={style.memorylist}>
      <Box>
        <h3>Your Memories From {currentState.currentStateTitle}</h3>
      </Box>
      <Button
        variant="contained"
        sx={style.primaryButton}
        onClick={() => setIsAddMemoryModalOpen(!isAddMemoryModalOpen)}
        startIcon={<AddIcon />}
      >
        Add Memory
      </Button>
    </Box>
  )

  return (
    <Box id="memory-list">
      {isAddMemoryModalOpen ? null : defautContent}
      {content}
    </Box>
  )
}

export default MemoryList
