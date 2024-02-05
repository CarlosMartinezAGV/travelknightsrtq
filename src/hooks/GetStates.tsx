import { useSelector } from "react-redux";
import { useFetchStatesQuery } from "../redux/store";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";

function GetStates() {
  const user = useSelector(selectCurrentUser);
  const { data, error, isFetching } = useFetchStatesQuery(user);

  return { data, error, isFetching };
}

export default GetStates;
