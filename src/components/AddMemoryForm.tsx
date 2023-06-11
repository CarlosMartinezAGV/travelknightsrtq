import {
  selectCurrentState,
  setCurrentStateWithId,
  useAddMemoryMutation,
} from '../redux/store'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAddStateMutation } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { style } from './styles/styles'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en'

type AddMemoryFormProps = {
  handleBackClick: () => void
}

type IFormInput = {
  title: string
  city: string
  date: Dayjs
  description: string
}

function AddMemoryForm({ handleBackClick }: AddMemoryFormProps) {
  const [addMemory, addMemoryResults] = useAddMemoryMutation()
  const [addState, addStateResults] = useAddStateMutation()
  const currentDate = dayjs()
  const currentState = useSelector(selectCurrentState)

  const dispatch = useDispatch()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: ' ',
      city: ' ',
      date: currentDate,
      description: ' ',
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (currentState.totalStateMemoryCount <= 0) {
      const addStateData = await addState({
        name: currentState.currentStateTitle,
        abbreviation: currentState.currentStateAbbreviation,
      }).unwrap()

      dispatch(setCurrentStateWithId({ id: addStateData.id }))

      addMemory({
        ...data,
        stateAbbreviation: currentState.currentStateAbbreviation,
        stateId: addStateData.id,
      })
    } else {
      addMemory({
        ...data,
        stateAbbreviation: currentState.currentStateAbbreviation,
        stateId: currentState.id,
      })
    }

    handleBackClick()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component='h1' variant='h5' sx={{ mb: 4 }}>
        New Memory
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={12}>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Memory Title'
                  name='title'
                  type='text'
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='City'
                  name='city'
                  type='text'
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label='Trip Date'
                    value={currentDate}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Description'
                  fullWidth
                  multiline
                  name='description'
                  type='text'
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleBackClick} sx={style.secondaryButton}>
                Back
              </Button>

              <Button
                type='submit'
                variant='contained'
                sx={style.primaryButton}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AddMemoryForm
