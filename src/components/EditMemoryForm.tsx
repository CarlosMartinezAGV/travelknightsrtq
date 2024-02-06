import {
  selectCurrentMemory,
  selectCurrentState,
  useUpdateMemoryMutation,
} from "../redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import { isBefore } from "date-fns";
import dayjs from "dayjs";
import { Stack } from "@mui/material";

type MemoryFormProps = {
  handleBackClick: () => void;
};

type MemoryFormValues = {
  title: string;
  city: string;
  startDate: Date | null;
  endDate: Date;
  description: string;
};
function EditMemoryForm({ handleBackClick }: MemoryFormProps) {
  const currentState = useSelector(selectCurrentState);
  const currentMemory = useSelector(selectCurrentMemory);
  const [updateMemory] = useUpdateMemoryMutation();

  const editMemoryForm = useForm<MemoryFormValues>({
    defaultValues: {
      title: currentMemory.title,
      city: currentMemory.city,
      startDate: dayjs(currentMemory.start_date).toDate(),
      endDate: dayjs(currentMemory.end_date).toDate(),
      description: currentMemory.description,
    },
  });

  const { control, register, handleSubmit, formState, getValues } =
    editMemoryForm;
  const { errors } = formState;

  const onSubmit: SubmitHandler<MemoryFormValues> = async (data) => {
    await updateMemory({
      id: currentMemory.id,
      stateId: currentMemory.state_id,
      ...data,
    });

    handleBackClick();
  };

  return (
    <Stack alignItems="center">
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        {`Edit Memory for ${currentState.name}`}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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
                      const endDateValue = getValues("endDate");
                      if (startDateValue && endDateValue) {
                        return (
                          isBefore(startDateValue, endDateValue) ||
                          "Start Date must be before End Date"
                        );
                      }
                      return true; // Return true if either value is null
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
                          // sx: {
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
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1.5}
            >
              <Button onClick={handleBackClick} variant="outlined">
                Back
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}

export default EditMemoryForm;
