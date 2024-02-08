import { useFetchStatesQuery } from "../store";
import { useAuth } from "../slices/auth/utils";

function useGetStates() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("User not found while fetching states.");
  }

  const { data, error, isLoading } = useFetchStatesQuery(user.id);

  return { data, error, isLoading };
}

export default useGetStates;
