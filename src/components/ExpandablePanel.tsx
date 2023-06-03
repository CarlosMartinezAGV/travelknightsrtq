import { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/material'
/**
 * Children are not mounted until the panel is expanded.
 */

type ExpandablePanelProps = {
  header: JSX.Element
  children: JSX.Element
}

function ExpandablePanel({ header, children }: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '0.25rem',
        marginBottom: '0.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {header}
        </Box>
        <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
          {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
        </Box>
      </Box>
      {expanded && (
        <Box
          sx={{
            padding: '0.5rem',
            borderTopWidth: '1px',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default ExpandablePanel
