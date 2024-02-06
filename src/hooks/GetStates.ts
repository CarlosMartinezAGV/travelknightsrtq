import { useSelector } from "react-redux";
import { useFetchStatesQuery } from "../redux/store";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";

function GetStates() {
  const user = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useFetchStatesQuery(user);

  return { data, error, isLoading };
}

export default GetStates;
