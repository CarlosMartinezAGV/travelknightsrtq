import {
  selectCurrentMemory,
  selectCurrentState,
  useUpdateMemoryMutation,
} from "../redux/store"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useSelector } from "react-redux"
import { style } from "./styles/styles"
import { isBefore } from "date-fns"
import dayjs from "dayjs"

type MemoryFormProps = {
  handleBackClick: () => void
}

type MemoryFormValues = {
  title: string
  city: string
  startDate: Date | null
  endDate: Date
  description: string
}
function EditMemoryForm({ handleBackClick }: MemoryFormProps) {
  const currentState = useSelector(selectCurrentState)
  const currentMemory = useSelector(selectCurrentMemory)
  const [updateMemory] = useUpdateMemoryMutation()

  const editMemoryForm = useForm<MemoryFormValues>({
    defaultValues: {
      title: currentMemory.title,
      city: currentMemory.city,
      startDate: dayjs(currentMemory.startDate).toDate(),
      endDate: dayjs(currentMemory.endDate).toDate(),
      description: currentMemory.description,
    },
  })

  const { control, register, handleSubmit, formState, getValues } =
    editMemoryForm
  const { errors } = formState

  const onSubmit: SubmitHandler<MemoryFormValues> = async (data) => {
    await updateMemory({
      id: currentMemory.id,
      userId: currentMemory.userId,
      stateId: currentMemory.stateId,
      ...data,
    })

    handleBackClick()
  }

  return (
    <Box sx={style.addMemoryForm}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        {`Edit Memory for ${currentState.currentStateTitle}`}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12}>
            <TextField
              {...register("title", { required: "required*" })}
              fullWidth
              label="Memory Title"
              type="text"
              name="title"
              required={!!errors?.title}
              error={!!errors?.title}
              helperText={errors.title && errors.title?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              {...register("city", { required: "required*" })}
              fullWidth
              label="City"
              name="city"
              type="text"
              required={!!errors?.city}
              error={!!errors?.city}
              helperText={errors.city && errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: "required*",
                  validate: {
                    endDateAfterStartDate: (startDateValue) => {
                      const endDateValue = getValues("endDate")
                      if (startDateValue && endDateValue) {
                        return (
                          isBefore(startDateValue, endDateValue) ||
                          "Start Date must be before End Date"
                        )
                      }
                      return true // Return true if either value is null
                    },
                  },
                }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="Start Date"
                      slotProps={{
                        textField: {
                          error: !!errors?.startDate,
                          helperText:
                            errors.startDate && errors.startDate?.message,
                          required: !!errors?.startDate,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="flex-end">
              <Controller
                name="endDate"
                control={control}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="End Date"
                      slotProps={{
                        textField: {
                          error: !!errors?.endDate,
                          helperText: errors.endDate && errors.endDate?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description", {
                required: "required*",
              })}
              label="Description"
              fullWidth
              multiline
              name="description"
              type="text"
              required={!!errors?.description}
              error={!!errors?.description}
              helperText={errors.description && errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={style.errorMessageContainer}>
              <Typography>
                {/* {isErrorMessage && 'Please fill out all fields!'} */}
              </Typography>
            </Box>
            <Box sx={style.addMemoryFormButtonLayout}>
              <Button onClick={handleBackClick} sx={style.secondaryButton}>
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
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

export default EditMemoryForm
