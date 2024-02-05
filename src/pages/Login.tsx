import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InvertColorsOutlinedIcon from "@mui/icons-material/InvertColorsOutlined";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
// import { useLoginMutation } from "../redux/slices/auth/authApiSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { zodResolver } from "@hookform/resolvers/zod";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { isErrorWithMessage, isFetchBaseQueryError } from "../redux/helpers";
import LoadingProgressButton from "../components/LoadingProgressButton";
import { TLoginCredentials, loginCredentialsSchema } from "../zodtypes";
import { ERRORCOLOR } from "../components/styles/main";
import { handleNoWhiteSpace } from "../redux/utils";
import { useState } from "react";
import { supabase } from "../supabase/main";
import { setCredentials } from "../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [LoginError, setLoginErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<TLoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onValid: SubmitHandler<TLoginCredentials> = async (data) => {
    setIsLoading(true);

    try {
      const { data: loginResult, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (loginError) {
        setLoginErrorMessage(loginError.message);
        return;
      }

      dispatch(
        setCredentials({ user: loginResult.user, session: loginResult.session })
      );
      navigate("/map");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid container component="main" sx={{ minHeight: "100dvh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url('src/assets/images/knightonplane.webp')",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Stack alignItems="center" mt={8} mb={10} mx={4}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <InvertColorsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onValid)}
            sx={{ mt: 1 }}
          >
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
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  autoComplete="current-password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onKeyDown={handleNoWhiteSpace}
                  required
                  error={!!error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={handleClickShowPassword}
                          onMouseUp={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
            <Typography
              align="center"
              mt={2}
              style={{ color: ERRORCOLOR }}
              variant="body2"
            >
              {LoginError}
            </Typography>
            <LoadingProgressButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              isLoading={isLoading}
            >
              Sign In
            </LoadingProgressButton>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link onClick={() => navigate("/signup")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
          }}
        ></Box>
      </Grid>
    </Grid>
  );
}

export default Login;
