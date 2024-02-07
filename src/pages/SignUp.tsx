import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { supabase } from "../supabase/main";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TSignUpCredentials, signUpCredentialsSchema } from "../zodtypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleNoWhiteSpace } from "../redux/utils";
import { useState } from "react";
import { ERRORCOLOR } from "../components/styles/main";
import LoadingProgressButton from "../components/LoadingProgressButton";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpMessage, setSignUpMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<TSignUpCredentials>({
    resolver: zodResolver(signUpCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onValid: SubmitHandler<TSignUpCredentials> = async (formdata) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
      });
      setIsLoading(false);

      if (error) {
        setSignUpMessage(error.message);
        return;
      }

      setSignUpSuccess(true);
      // Navigate to login after successful sign up
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Stack mt={8} alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onValid)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    autoFocus
                    margin="normal"
                    autoComplete="email"
                    label="Email Address"
                    onKeyDown={handleNoWhiteSpace}
                    required
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="new-password"
                    label="Password"
                    type={"password"}
                    onKeyDown={handleNoWhiteSpace}
                    required
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="new-confirm-password"
                    label="Confirm Password"
                    type={"password"}
                    onKeyDown={handleNoWhiteSpace}
                    required
                    error={!!error}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography
            align="center"
            mt={2}
            style={{ color: ERRORCOLOR }}
            variant="body2"
          >
            {signUpMessage}
          </Typography>
          {signUpSuccess && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Account created! Redirecting to login...
            </Alert>
          )}
          <LoadingProgressButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            isLoading={isLoading}
          >
            Sign Up
          </LoadingProgressButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => navigate("/")} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
