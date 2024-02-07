import { useSelector } from "react-redux";
import { selectCurrentState, useFetchMemoriesQuery } from "../store";

function useGetMemories() {
  const currentState = useSelector(selectCurrentState);
  const { data, error, isLoading } = useFetchMemoriesQuery(currentState.id);
  return { data, error, isLoading, currentState: currentState.name };
}

export default useGetMemories;
