import RenderedSVGStates from "./RenderedSVGStates";
import { setCurrentState } from "../../redux/store";
import AbsoluteLoader from "../AbsoluteLoader";
import { useDispatch } from "react-redux";
import { useState } from "react";

import useGetStates from "../../redux/hooks/useGetStates";
import MemoryListDialog from "../memory/MemoryListDialog";

function SVGMap() {
  const dispatch = useDispatch();
  const [isShowMemoryListDialog, setIsShowMemoryListDialog] = useState(false);
  const { data, error, isLoading } = useGetStates();

  if (error) {
    throw new Error(`Map.tsx error: ${error}`);
  }

  const handleModalOpen = (
    state_id: number | null,
    abbreviation: string,
    name: string
  ) => {
    setIsShowMemoryListDialog(true);
    dispatch(
      setCurrentState({
        id: state_id,
        abbreviation,
        name,
      })
    );
  };

  return (
    <>
      {/* isLoading for fetching map */}
      {isLoading ? (
        <AbsoluteLoader />
      ) : (
        <svg
          id="USMap"
          viewBox="70 -5 1200 750"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <RenderedSVGStates data={data} handleModalOpen={handleModalOpen} />
        </svg>
      )}
      {isShowMemoryListDialog && (
        <MemoryListDialog
          isShowMemoryListDialog={isShowMemoryListDialog}
          setIsShowMemoryListDialog={setIsShowMemoryListDialog}
        />
      )}
    </>
  );
}

export default SVGMap;
