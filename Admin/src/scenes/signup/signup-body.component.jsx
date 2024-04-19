import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import * as yup from 'yup';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as API from '../../constants/api';

const theme = createTheme();
export default function SignUp() {
  const [rePassword, setRePassword] = React.useState();

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is a required field').email(),
      password: yup
        .string()
        .required('Password is a required field')
        .max(32)
        .min(6),
      fullName: yup.string().required('Full name is a required field'),
      address: yup.string(),
      phone: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitSignup = (data) => {
    if (rePassword.rePassword !== data.password) {
      return toastAlertFail('Passwords must match');
    }
    axios
      .post(API.SIGNUP, data)
      .then((res) => {
        if (res.data.success) {
          toastAlertSuccess(
            'Create user successfully. Please check your mail !'
          );
        }
      })
      .catch((error) => {
        if (error) {
          return toastAlertFail('Create user failed.');
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(submitSignup)}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            id="password"
                            {...field}
                          />
                        )}
                      />
                      {errors.password && (
                        <Typography variant="body2" color="red">
                          {errors.password.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <TextField
                        fullWidth
                        type="password"
                        name="rePassword"
                        label="Re-Password"
                        id="rePassword"
                        onChange={(e) =>
                          setRePassword({
                            ...rePassword,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      {errors.rePassword && (
                        <Typography variant="body2" color="red">
                          {errors.rePassword.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Controller
                        control={control}
                        name="fullName"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            id="fullName"
                            {...field}
                          />
                        )}
                      />
                      {errors.fullName && (
                        <Typography variant="body2" color="red">
                          {errors.fullName.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Controller
                        control={control}
                        name="address"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            name="address"
                            label="Address"
                            id="address"
                            {...field}
                          />
                        )}
                      />
                      {errors.address && (
                        <Typography variant="body2" color="red">
                          {errors.address.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Controller
                        control={control}
                        name="phone"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            name="phone"
                            label="Phone Number"
                            id="phone"
                            {...field}
                          />
                        )}
                      />
                      {errors.phone && (
                        <Typography variant="body2" color="red">
                          {errors.phone.message}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <ToastContainer />
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      to="/login"
                      variant="body2"
                      style={{ textDecoration: 'none' }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </ThemeProvider>
    </form>
  );
}
