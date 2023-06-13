const primaryBackgroundColor = '#faf0ca'

export const style = {
  backgroundColorPrimary: {
    bgcolor: primaryBackgroundColor,
  },
  backgroundColorSecondary: {
    bgcolor: '#F9F3E0',
  },
  mainPage: {
    bgcolor: primaryBackgroundColor,
    pt: 14,
  },
  modal: {
    position: 'absolute',
    minWidth: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: primaryBackgroundColor,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  modalHeader: {
    width: '100%',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
    pl: 2,
    pr: 8,
    mb: 1,
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '60%',
  },
  loadingProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginY: '0.7rem',
  },
  memorylist: {
    margin: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memorylistItem: {},
  addMemoryForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addMemoryFormButtonLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  emptylist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    '&:hover': {
      backgroundColor: '#6C9C18',
    },
    ml: 1,
  },
  secondaryButton: {
    ml: 1,
  },
}
