import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  selectCurrentState,
  useDeleteMemoryMutation,
  useDeleteStateMutation,
  setMemoryToEdit,
  setResetCount,
} from "../redux/store";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { TMemory } from "../redux/slices/memories/types";
import useLoadingState from "../hooks/use-LoadingState";
import dayjs from "dayjs";

type MemoryListItemProps = {
  memory: TMemory;
  expanded: string | false;
  handleAccordionChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleLoading: (isLoadingFlag: boolean) => void;
  handleBackClick: () => void;
  handleMemoryUpsert: (insert: boolean) => void;
};

function MemoryListItem({
  memory,
  expanded,
  handleAccordionChange,
  handleLoading,
  handleBackClick,
  handleMemoryUpsert,
}: MemoryListItemProps) {
  const currentState = useSelector(selectCurrentState);
  const [removeMemory, { isLoading: isLoadingDeleteMemory }] =
    useDeleteMemoryMutation();
  const [removeState, { isLoading: isLoadingDeleteState }] =
    useDeleteStateMutation();
  const dispatch = useDispatch();

  useLoadingState({
    handleLoading,
    flags: [isLoadingDeleteMemory, isLoadingDeleteState],
  });

  // Remove memory and state if it's the last memory in the state
  const handleDeleteMemoryandState = async () => {
    // Remove memory first, then state when it's the last memory in the state
    await removeMemory(memory);

    if (currentState.memoryCount === 1) {
      await removeState(memory.state_id);
      dispatch(setResetCount());
    }
    // Return to list view
    handleBackClick();
  };

  const handleEditMemory = () => {
    dispatch(setMemoryToEdit(memory));
    handleMemoryUpsert(false);
  };

  return (
    <Accordion
      expanded={expanded === memory.id}
      onChange={handleAccordionChange(memory.id)}
      sx={{ mb: 1.5 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Stack
          id="accordion-headers"
          direction="row"
          justifyContent="center"
          width={1}
          spacing={2}
        >
          <Typography flex={1}>{memory.title}</Typography>
          <Typography flex={1}>{memory.city}</Typography>
          <Typography flex={1}>
            {dayjs(memory.start_date).format("MM/DD/YYYY")}
          </Typography>
          <Typography flex={1}>
            {dayjs(memory.end_date).format("MM/DD/YYYY")}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography mb={1} fontWeight="bold">
          Your trip went something like this:
        </Typography>
        <Typography>{memory.description}</Typography>
      </AccordionDetails>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        py={2}
      >
        <Button onClick={handleDeleteMemoryandState} color="error">
          Delete
        </Button>
        <Button onClick={handleEditMemory} variant="outlined" color="primary">
          Edit
        </Button>
      </Stack>
    </Accordion>
  );
}

export default MemoryListItem;
