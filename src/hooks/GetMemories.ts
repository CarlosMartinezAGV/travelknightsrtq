import { useSelector } from "react-redux";
import { selectCurrentState, useFetchMemoriesQuery } from "../redux/store";

function GetMemories() {
  const currentState = useSelector(selectCurrentState);
  const { data, error, isLoading } = useFetchMemoriesQuery(currentState.id);
  return { data, error, isLoading, currentState: currentState.name };
}

export default GetMemories;
