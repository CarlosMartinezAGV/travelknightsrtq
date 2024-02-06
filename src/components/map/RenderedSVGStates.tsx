import { TState } from "../../redux/slices/states/types";
import { statesSVG } from "./states";

type RenderedSVGStatesProps = {
  data: TState[] | undefined;
  handleModalOpen: (
    state_id: string | null,
    abbreviation: string,
    title: string
  ) => void;
};

function RenderedSVGStates({ data, handleModalOpen }: RenderedSVGStatesProps) {
  const renderedStates = statesSVG.map(
    ({ name, className, id: SVGabbreviation, ...props }) => {
      // Set state_id if state is in supabase
      let state_id: string | null = null;

      // Check if state is in state and add visited class
      const isVisited = data?.some(({ abbreviation, id }) => {
        if (SVGabbreviation === abbreviation) {
          state_id = id;
          return true;
        } else return false;
      });

      // Add visited class if state is in state
      const stateVisitedClass = isVisited ? `${className} visited` : className;
      return (
        <path
          key={SVGabbreviation}
          id={SVGabbreviation}
          {...props}
          className={stateVisitedClass}
          onClick={() => handleModalOpen(state_id, SVGabbreviation, name)}
        >
          <title>{name}</title>
        </path>
      );
    }
  );

  return <g>{renderedStates}</g>;
}
export default RenderedSVGStates;
