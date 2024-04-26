import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/auth/auth';
const theme = createTheme();

export default function LoginBody() {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const { Login } = useAuth();
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is a required field').email(),
      password: yup
        .string()
        .required('Password is a required field')
        .max(32)
        .min(3),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitLogin = async (data) => {
    try {
      await Login(data, navigate);
    } catch (error) {
      if (error) {
        console.log(
          '🚀 ~ file: login-body.component.jsx ~ line 60 ~ submitLogin ~ error',
          error
        );
        // toastAlertFail(error.response.data.message);
        return error;
      }
    }
    // await Login(data);
  };

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/163855063.jpg?k=1fa29823186d1d95046430c0737ed3a2625a3506a52c9a8d81053606b4809ce6&o=&hp=1)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1, width: '100%' }}>
                <Box>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <Typography variant="body2" color="red">
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <Typography variant="body2" color="red">
                      {errors.password.message}
                    </Typography>
                  )}
                  {err && (
                    <Typography variant="body2" color="red">
                      Username or password is incorrect
                    </Typography>
                  )}
                </Box>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <ToastContainer />

                <Grid container>
                  <Grid item xs>
                    <Link
                      to="/requestReset"
                      variant="body2"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        sx={{
                          border: 'none',
                          backgroundColor: 'white',
                          textDecoration: 'underline',
                          textTransform: 'none',
                          p: 0,
                        }}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate('/book/reservation/rooms');
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/signup"
                      variant="body2"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        sx={{
                          border: 'none',
                          backgroundColor: 'white',
                          textDecoration: 'underline',
                          textTransform: 'none',
                          p: 0,
                        }}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate('/book/reservation/rooms');
                        }}
                      >
                        {/* Don't have an account? Sign Up */}
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
