import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { selectCurrentState, useAddMemoryMutation } from '../redux/store'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'

type AddMemoryFormProps = {
  handleBackClick: () => void
}

type IFormInput = {
  title: string
  city: string
  description: string
}

function AddMemoryForm({ handleBackClick }: AddMemoryFormProps) {
  const [addMemory, results] = useAddMemoryMutation()
  const currentState = useSelector(selectCurrentState)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      city: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addMemory({
      ...data,
      stateAbbreviationId: currentState.currentStateAbbreviation,
    })
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
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField {...field} label='Title' name='title' type='text' />
          )}
        />
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <TextField {...field} label='City' name='city' type='text' />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Description'
              name='description'
              type='text'
            />
          )}
        />
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleBackClick} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>

            <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  )
}

export default AddMemoryForm
