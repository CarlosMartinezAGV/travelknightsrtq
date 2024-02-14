import { useEffect } from "react";

type TLoadingState = {
  handleLoading: (isLoading: boolean) => void;
  flags: boolean[];
};

const useLoadingState = ({ handleLoading, flags }: TLoadingState) => {
  useEffect(() => {
    flags.some((flag) => flag === true)
      ? handleLoading(true)
      : handleLoading(false);
  }, [handleLoading, flags]);
};

export default useLoadingState;
