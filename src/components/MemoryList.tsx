import {
  useFetchMemoriesQuery,
  setTotalStateMemoryCount,
  setCurrentStateWithId,
} from "../redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentState } from "../redux/store";
import AddIcon from "@mui/icons-material/Add";
import MemoryListItem from "./MemoryListItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddMemoryForm from "./AddMemoryForm";
import { Memory } from "../redux/types";
import { style } from "./styles/styles";
import { Stack } from "@mui/material";

type MemoryListProps = {
  handleEditMemoryToggle: () => void;
};

function MemoryList({ handleEditMemoryToggle }: MemoryListProps) {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | false>(false);
  const currentState = useSelector(selectCurrentState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // fix memoize when state changes
  const {
    data: memoriesDataFromQuery,
    error: memoriesError,
    isFetching: isFetchingMemories,
  } = useFetchMemoriesQuery(currentState);

  // Memoize memories data from query
  const memoriesData = useMemo(() => {
    return memoriesDataFromQuery;
  }, [memoriesDataFromQuery]);

  // Set total state memory count
  // Set current state from first memory stateId
  useEffect(() => {
    if (memoriesData && memoriesData.length > 0) {
      dispatch(setCurrentStateWithId({ id: memoriesData[0].stateId }));
      dispatch(
        setTotalStateMemoryCount({ totalStateMemoryCount: memoriesData.length })
      );
    } else {
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }));
    }
  }, [dispatch, memoriesData]);

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(!isAddMemoryModalOpen);
    setExpanded(false);
  };

  const handleAccordionChange = useCallback(
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded ? panel : prevExpanded === panel ? false : prevExpanded
      );
    },
    []
  );

  const handleLoading = (isLoadingFlag: boolean) => {
    setIsLoading(isLoadingFlag);
  };

  let content = null;
  if (isLoading || isFetchingMemories) {
    content = (
      <Stack justifyContent="center" alignItems="center" my={1}>
        <CircularProgress />
      </Stack>
    );
  } else if (memoriesError) {
    content = <Box>Error Loading Memories...</Box>;
  } else if (isAddMemoryModalOpen) {
    content = <AddMemoryForm handleBackClick={handleAddMemory} />;
  } else {
    content =
      // Check if there are memories
      // If there are no memories, display empty list message
      memoriesData?.length === 0 ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          id="no-memories-message"
        >
          No Memories Yet. Add One!
        </Stack>
      ) : (
        // If there are memories, display memories
        <Stack direction="column" sx={{ width: "100%" }}>
          <Stack
            pl={{ xs: 1, sm: 2.2 }}
            pr={{ xs: 2, sm: 3 }}
            pb={0.5}
            width="100%"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography flex={1} fontWeight="bold">
              Title
            </Typography>
            <Typography flex={1} fontWeight="bold">
              City
            </Typography>
            <Typography flex={1} fontWeight="bold">
              Start Date
            </Typography>
            <Typography flex={1} fontWeight="bold">
              End Date
            </Typography>
          </Stack>
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
            );
          })}
        </Stack>
      );
  }

  const defautModalContent = !isAddMemoryModalOpen && (
    <Stack id="modal-memory-content" alignItems="center" sx={style.memorylist}>
      <Box sx={{ flex: 1, m: 0 }}>
        <h3>Your Memories From {currentState.currentStateTitle}</h3>
      </Box>
      <Box flex={1} ml="auto" pr={0.5}>
        <Button
          variant="contained"
          sx={style.primaryButton}
          onClick={() => setIsAddMemoryModalOpen(!isAddMemoryModalOpen)}
        >
          Add Memory
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Box id="memory-list">
      {defautModalContent}
      {content}
    </Box>
  );
}

export default MemoryList;
