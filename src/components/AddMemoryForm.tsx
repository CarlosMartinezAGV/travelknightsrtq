import {
  selectCurrentState,
  setCurrentStateWithId,
  useAddMemoryMutation,
} from '../redux/store'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useForm, Controller, SubmitHandler, set } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAddStateMutation } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { style } from './styles/styles'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import { useEffect, useState, useTransition } from 'react'

type AddMemoryFormProps = {
  handleBackClick: () => void
}

type IFormInput = {
  title: string
  city: string
  startDate: Dayjs
  endDate: Dayjs
  description: string
}

function AddMemoryForm({ handleBackClick }: AddMemoryFormProps) {
  const currentState = useSelector(selectCurrentState)
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const [addMemory, post] = useAddMemoryMutation()
  const [addState] = useAddStateMutation()
  const currentDate = dayjs()

  const dispatch = useDispatch()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: ' ',
      city: ' ',
      startDate: currentDate,
      endDate: currentDate,
      description: ' ',
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true)

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
    setIsLoading(false)
    handleBackClick()
  }

  return (
    <Box sx={style.addMemoryForm}>
      <Typography component='h1' variant='h5' sx={{ mb: 4 }}>
        Add New Memory
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <Box display='flex' justifyContent='flex-end'>
              <Controller
                name='startDate'
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker {...field} label='Start Date' />
                  </LocalizationProvider>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display='flex' justifyContent='flex-end'>
              <Controller
                name='endDate'
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker {...field} label='End Date' />
                  </LocalizationProvider>
                )}
              />
            </Box>
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
            <Box sx={style.addMemoryFormButtonLayout}>
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
