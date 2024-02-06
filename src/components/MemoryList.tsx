import {
  setCurrentStateWithId,
  setTotalStateMemoryCount,
} from "../redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import MemoryListItem from "./MemoryListItem";
import { useCallback, useEffect, useState } from "react";
import AddMemoryForm from "./AddMemoryForm";
import { Stack } from "@mui/material";
import { TMemory } from "../redux/slices/memories/types";
import GetMemories from "../hooks/GetMemories";

type MemoryListProps = {
  handleEditMemoryToggle: () => void;
};

function MemoryList({ handleEditMemoryToggle }: MemoryListProps) {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    data: memoriesData,
    error: memoriesError,
    isLoading: isLoadingMemories,
    currentState,
  } = GetMemories();

  // Set total state memory count
  // Set current state from first memory stateId
  useEffect(() => {
    const hasMemoriesData = memoriesData && memoriesData.length > 0;
    const memoryCount = hasMemoriesData ? memoriesData.length : 0;

    if (hasMemoriesData) {
      dispatch(
        setCurrentStateWithId({
          id: memoriesData[0].state_id,
        })
      );
    }

    dispatch(setTotalStateMemoryCount({ memoryCount }));
  }, [dispatch, memoriesData]);

  const handleAddMemory = () => {
    setIsAddMemoryModalOpen(!isAddMemoryModalOpen);
    setExpanded(false);
  };

  // Review if useCallback is necessary
  const handleAccordionChange = useCallback(
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
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
  if (isLoading || isLoadingMemories) {
    content = (
      <Stack justifyContent="center" alignItems="center" my={1}>
        <CircularProgress />
      </Stack>
    );
  }
  // Supabase error handling
  // Error can be an object or a string that is empty or not
  else if (memoriesError && Object.keys(memoriesError).length > 0) {
    content = (
      <Stack justifyContent="center" alignItems="center">
        <Typography>Error Loading Memories...</Typography>
      </Stack>
    );
  } else if (isAddMemoryModalOpen) {
    content = <AddMemoryForm handleBackClick={handleAddMemory} />;
  } else {
    content =
      // Check if there are memories
      // If there are no memories, display empty list message
      !memoriesData || memoriesData?.length === 0 ? (
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
          {memoriesData?.map((memory: TMemory) => {
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
    <>
      <Box flex={1}>
        <Typography mb={2.5} variant="h5">
          Your Memories From {currentState}
        </Typography>
      </Box>
      <Box flex={1} ml="auto" pr={0.5}>
        <Button
          variant="contained"
          onClick={() => setIsAddMemoryModalOpen(!isAddMemoryModalOpen)}
        >
          Add Memory
        </Button>
      </Box>
    </>
  );

  return (
    <Stack justifyContent="center" alignItems="center" id="memory-list">
      {defautModalContent}
      <Box m={1.5} />
      {content}
    </Stack>
  );
}

export default MemoryList;
