import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  selectCurrentState,
  setTotalStateMemoryCount,
  useRemoveMemoryMutation,
  useRemoveStateMutation,
  setMemoryToEdit,
} from "../redux/store";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import { style } from "./styles/main";
import { Stack } from "@mui/material";
import { TMemory } from "../redux/slices/memories/types";

type MemoryListItemProps = {
  memory: TMemory;
  expanded: string | false;
  handleAccordionChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleLoading: (isLoadingFlag: boolean) => void;
  handleEditMemoryToggle: () => void;
};

function MemoryListItem({
  memory,
  expanded,
  handleAccordionChange,
  handleLoading,
  handleEditMemoryToggle,
}: MemoryListItemProps) {
  const currentState = useSelector(selectCurrentState);
  const [removeMemory] = useRemoveMemoryMutation();
  const [removeState] = useRemoveStateMutation();

  const dispatch = useDispatch();

  // Async function to remove memory
  // and show progress indicator
  const handleDeleteMemory = async () => {
    handleLoading(true);
    // Remove memory first, then state when it's the last memory in the state
    await removeMemory(memory);

    if (currentState.totalStateMemoryCount === 1) {
      await removeState(memory.state_id);
      dispatch(setTotalStateMemoryCount({ totalStateMemoryCount: 0 }));
    }
    handleLoading(false);
  };

  const handleEditMemory = () => {
    dispatch(setMemoryToEdit({ ...memory }));
    handleEditMemoryToggle();
  };

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
            {new Date(memory.start_date).toLocaleDateString("en-US")}
          </Typography>
          <Typography flex={1}>
            {new Date(memory.end_date).toLocaleDateString("en-US")}
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
        mb={2}
      >
        <Button onClick={handleDeleteMemory} color="error">
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
