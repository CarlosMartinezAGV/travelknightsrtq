/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useFetchStatesQuery } from '../../redux/store'
import { Skeleton } from '@mui/material'
import { states } from './states'
import './map.css'

type MapProps = {
  handleModalOpen: (stateAbrreviation: string, title: string) => void
}

function Map({ handleModalOpen }: MapProps) {
  // Api call should check if state is in state
  const { data, error, isLoading } = useFetchStatesQuery()

  const renderedStates = states.map(({ title, className, id, ...props }) => {
    // Check if state is in state and add visited class
    const isVisited = data?.some(({ abbreviation }) => {
      if (abbreviation === id) return true
      else return false
    })

    const stateVisitedClass = isVisited ? className + ' visited' : className
    return (
      <path
        key={id}
        id={id}
        {...props}
        className={stateVisitedClass}
        onClick={() => handleModalOpen(id, title)}
      >
        <title>{title}</title>
      </path>
    )
  })

  return (
    <div>
      <svg
        id='USMap'
        viewBox='70 -5 1200 750'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
      >
        <g>{renderedStates}</g>
      </svg>
    </div>
  )
}

export default Map
