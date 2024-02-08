import {
  selectCurrentMemory,
  selectCurrentState,
  setCurrentStateWithId,
  useAddMemoryMutation,
  useAddStateMutation,
  useUpdateMemoryMutation,
} from "../redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  TMemoryInsert,
  TMemoryValidation,
} from "../redux/slices/memories/types";
import useLoadingState from "../hooks/use-LoadingState";
import { useDispatch, useSelector } from "react-redux";
import { isBefore } from "date-fns";
import dayjs from "dayjs";
import { useAuth } from "../redux/slices/auth/utils";

type UpsertMemoryFormProps = {
  handleBackClick: () => void;
  handleLoading: (isLoadingFlag: boolean) => void;
  isInsert: boolean;
};

function UpsertMemoryForm({
  handleBackClick,
  handleLoading,
  isInsert,
}: UpsertMemoryFormProps) {
  const dispatch = useDispatch();

  const currentState = useSelector(selectCurrentState);
  const { user } = useAuth();
  // const currentUser = useSelector(selectCurrentUser);
  const currentMemory = useSelector(selectCurrentMemory);

  const [addState, { isLoading: isLoadingInsertState }] = useAddStateMutation();
  const [addMemory, { isLoading: isLoadingInsertMemory }] =
    useAddMemoryMutation();
  const [updateMemory, { isLoading: isLoadingUpdateMemory }] =
    useUpdateMemoryMutation();

  useLoadingState({
    handleLoading,
    flags: [isLoadingInsertState, isLoadingInsertMemory, isLoadingUpdateMemory],
  });

  const addMemoryForm = useForm<TMemoryValidation>({
    defaultValues: {
      title: isInsert ? "" : currentMemory.title,
      city: isInsert ? "" : currentMemory.city,
      start_date: isInsert ? null : dayjs(currentMemory.start_date).toDate(),
      end_date: isInsert
        ? dayjs().toDate()
        : dayjs(currentMemory.end_date).toDate(),
      description: isInsert ? "" : currentMemory.description,
    },
  });

  const { control, register, handleSubmit, formState, getValues } =
    addMemoryForm;
  const { errors } = formState;

  const onSubmit: SubmitHandler<TMemoryValidation> = async (formdata) => {
    // Insert
    if (isInsert) {
      // If there are no memories in the state, add the state first
      const memoryPayload: TMemoryInsert = {
        ...formdata,
        start_date: dayjs(formdata.start_date).format(),
        end_date: dayjs(formdata.end_date).format(),
      };

      // If there are no memories in the state, add the state first
      if (currentState.memoryCount === 0) {
        const response = await addState({
          name: currentState.name,
          abbreviation: currentState.abbreviation,
          user_id: user?.id as string,
        }).unwrap();

        dispatch(setCurrentStateWithId({ id: response.id }));

        await addMemory({
          ...memoryPayload,
          state_id: response.id,
        });
      } else {
        await addMemory({
          ...memoryPayload,
          state_id: currentState.id,
        });
      }
    }
    // Update
    else {
      await updateMemory({
        ...currentMemory,
        ...formdata,
        start_date: dayjs(formdata.start_date).format(),
        end_date: dayjs(formdata.end_date).format(),
      });
    }

    // Close the form and return to the list view
    handleBackClick();
  };

  const header = isInsert ? "Add" : "Update";

  return (
    <Stack alignItems="center">
      <Typography component="h1" variant="h5" sx={{ mb: 4 }} color="primary">
        {`${header} Memory for ${currentState.name}`}
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
                name="start_date"
                control={control}
                rules={{
                  required: "required*",
                  validate: {
                    endDateAfterStartDate: (startDateValue) => {
                      const endDateValue = getValues("end_date");
                      if (startDateValue && endDateValue) {
                        return (
                          isBefore(startDateValue, endDateValue) ||
                          "Start Date must be before End Date"
                        );
                      }
                      return true;
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
                          error: !!errors?.start_date,
                          helperText:
                            errors.start_date && errors.start_date?.message,
                          required: !!errors?.start_date,
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
                name="end_date"
                control={control}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="End Date"
                      slotProps={{
                        textField: {
                          error: !!errors?.end_date,
                          helperText:
                            errors.end_date && errors.end_date?.message,
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
            <Stack direction="row" spacing={1} pl={1} justifyContent="flex-end">
              <Button onClick={handleBackClick}>Back</Button>
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

export default UpsertMemoryForm;
