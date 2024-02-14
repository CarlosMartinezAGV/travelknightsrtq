import { useEffect, useState } from "react";
import { TMemory } from "../redux/slices/memories/types";
import { useDispatch } from "react-redux";
import { setCurrentStateWithId, setMemoryCount } from "../redux/store";

type TMemoryAction = {
  memoryData: TMemory[] | null | undefined;
  handleLoading: (isLoading: boolean) => void;
  setExpanded: (expanded: string | false) => void;
};

function useMemoryActions({
  memoryData,
  handleLoading,
  setExpanded,
}: TMemoryAction) {
  const [memoryModalOperation, setMemoryModalOperation] = useState({
    isAdd: false,
    isEdit: false,
  });
  const dispatch = useDispatch();

  // Set total state memory count
  // Set current state from first memory stateId
  useEffect(() => {
    const hasMemoriesData = memoryData && memoryData.length > 0;
    const memoryCount = hasMemoriesData ? memoryData.length : 0;

    if (hasMemoriesData) {
      dispatch(
        setCurrentStateWithId({
          id: memoryData[0].state_id,
        })
      );
    }

    dispatch(setMemoryCount({ memoryCount }));
  }, [dispatch, memoryData]);

  const handleMemoryUpsert = (insert: boolean) => {
    handleLoading(false);
    if (insert) {
      setMemoryModalOperation((prev) => ({
        ...prev,
        isAdd: !prev.isAdd,
      }));
      setExpanded(false);
    } else {
      setMemoryModalOperation((prev) => ({
        ...prev,
        isEdit: !prev.isEdit,
      }));
    }
  };

  return { memoryModalOperation, setMemoryModalOperation, handleMemoryUpsert };
}

export default useMemoryActions;
