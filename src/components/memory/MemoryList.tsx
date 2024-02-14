import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MemoryListItem from "./MemoryListItem";
import { useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import { TMemory } from "../../redux/slices/memories/types";
import useGetMemories from "../../redux/hooks/useGetMemories";
import UpsertMemoryForm from "./UpsertMemoryForm";
import Skeleton from "@mui/material/Skeleton";
import useMemoryActions from "../../hooks/useMemoryActions";

function MemoryList() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: memoryData,
    error: memoriesError,
    isLoading: isLoadingMemories,
    currentState,
  } = useGetMemories();

  const handleLoading = (isLoadingFlag: boolean) => {
    setIsLoading(isLoadingFlag);
  };

  // Memory actions and operations for Modal redux state
  const { memoryModalOperation, setMemoryModalOperation, handleMemoryUpsert } =
    useMemoryActions({
      memoryData,
      handleLoading,
      setExpanded,
    });

  const handleBackClick = () => {
    handleLoading(false);
    setMemoryModalOperation({
      isAdd: false,
      isEdit: false,
    });
  };

  const handleAccordionChange = useCallback(
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded ? panel : prevExpanded === panel ? false : prevExpanded
      );
    },
    []
  );

  let content = null;
  if (isLoading || isLoadingMemories) {
    content = (
      <>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          animation="wave"
        />
      </>
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
  }
  // Check if a crud operation is in progress
  else if (memoryModalOperation.isAdd || memoryModalOperation.isEdit) {
    const isInsert = memoryModalOperation.isAdd ? true : false;
    content = (
      <UpsertMemoryForm
        isInsert={isInsert}
        handleLoading={handleLoading}
        handleBackClick={handleBackClick}
      />
    );
  }
  // Check if there are memories
  // If there are no memories, display empty list message
  else if (!memoryData || memoryData?.length === 0) {
    content = (
      <Stack
        justifyContent="center"
        alignItems="center"
        id="no-memories-message"
      >
        <Typography variant="h6" mb={2}>
          No Memories Yet. Add One!
        </Typography>
      </Stack>
    );
  }
  // There are memories to display
  else {
    content = (
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
        {memoryData?.map((memory: TMemory) => {
          return (
            <MemoryListItem
              expanded={expanded}
              handleAccordionChange={handleAccordionChange}
              key={memory.id}
              memory={memory}
              handleLoading={handleLoading}
              handleBackClick={handleBackClick}
              handleMemoryUpsert={handleMemoryUpsert}
            />
          );
        })}
      </Stack>
    );
  }

  const defautModalContent = !memoryModalOperation.isAdd &&
    !memoryModalOperation.isEdit && (
      <>
        <Box flex={1}>
          <Typography mb={2.5} variant="h5">
            Your Memories From {currentState}
          </Typography>
        </Box>
        <Box flex={1} ml="auto" pr={0.5}>
          <Button variant="contained" onClick={() => handleMemoryUpsert(true)}>
            Add Memory
          </Button>
        </Box>
      </>
    );

  return (
    <Stack
      width="100%"
      justifyContent="center"
      alignItems="center"
      id="memory-list"
    >
      {defautModalContent}
      <Box m={1.5} />
      {content}
    </Stack>
  );
}

export default MemoryList;
