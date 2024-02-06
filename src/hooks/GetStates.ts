import { useSelector } from "react-redux";
import { useFetchStatesQuery } from "../redux/store";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";

function GetStates() {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    throw new Error("User not found while fetching states.");
  }

  const { data, error, isLoading } = useFetchStatesQuery(user.id);

  return { data, error, isLoading };
}

export default GetStates;
