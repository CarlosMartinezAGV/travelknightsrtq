import { TState } from "../../redux/slices/states/types";
import { states } from "./states";

type RenderedSVGStatesProps = {
  data: TState[] | undefined;
  handleModalOpen: (
    id: string | undefined,
    abbreviation: string,
    title: string
  ) => void;
};

function RenderedSVGStates({ data, handleModalOpen }: RenderedSVGStatesProps) {
  console.log(data);
  const renderedStates = states.map(
    ({ title, className, id: stateAbbreviation, ...props }) => {
      let stateId: string | undefined = undefined;

      // Check if state is in state and add visited class
      const isVisited = data?.some(({ abbreviation, id }) => {
        if (abbreviation === stateAbbreviation) {
          stateId = id;
          return true;
        } else return false;
      });

      // Add visited class if state is in state
      const stateVisitedClass = isVisited ? className + " visited" : className;
      return (
        <path
          key={stateAbbreviation}
          id={stateAbbreviation}
          {...props}
          className={stateVisitedClass}
          onClick={() => handleModalOpen(stateId, stateAbbreviation, title)}
        >
          <title>{title}</title>
        </path>
      );
    }
  );

  return <g>{renderedStates}</g>;
}
export default RenderedSVGStates;
