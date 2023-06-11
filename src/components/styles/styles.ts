export const style = {
  modal: {
    position: 'absolute',
    minWidth: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#faf0ca',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '60%',
  },
  memorylist: {
    margin: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptylist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColorPrimary: {
    bgcolor: '#faf0ca',
  },
  backgroundColorSecondary: {
    bgcolor: '#F9F3E0',
  },
  primaryButton: {
    '&:hover': {
      backgroundColor: '#6C9C18',
    },
    bgcolor: '#65743a',
    ml: 1,
  },
  secondaryButton: {
    color: '#65743a',
    ml: 1,
  },
}
