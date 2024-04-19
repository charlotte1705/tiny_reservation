import React, { useContext } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useAuth } from '../../context/auth/auth';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Form = () => {
  const TOKEN = localStorage.getItem('token');
  const dataUser = JSON.parse(localStorage.getItem('userInfo'));
  const [userInfo, setUserInfo] = useState(dataUser);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const { Logout } = useAuth();

  const handleLogout = () => {
    Logout();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m="20px">
        <Header title="Profile" subtitle="Manage your Profile" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInfo.fullName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInfo.address}
                  name="address"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInfo.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userInfo.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: 'span 2' }}
                />
                <RadioGroup
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gridColumn: 'span 2',
                  }}
                  value={userInfo.gender}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mx: 2,
                    }}
                  >
                    {' '}
                    Gender
                  </Typography>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <DatePicker
                  disableFuture
                  label="Birthday"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  // value={value}
                  // onChange={(newValue) => {
                  //   setValue(newValue);
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ gridColumn: 'span 2' }}
                />
                <Typography
                  variant="h4"
                  sx={{ gridColumn: 'span 4', fontWeight: 'bold' }}
                >
                  {' '}
                  Update Password
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Current Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oldPassword}
                  name="oldPassword"
                  error={!!touched.oldPassword && !!errors.oldPassword}
                  helperText={touched.oldPassword && errors.oldPassword}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ gridColumn: 'span 2' }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt={2} sx={{ gap: 2 }}>
                <Button type="submit" color="secondary" variant="contained">
                  Update user
                </Button>
                <Button
                  type="submit"
                  color="warning"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LocalizationProvider>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  contact: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  oldPassword: yup.string().required('required'),
  newPassword: yup.string().required('required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  oldPassword: '',
  newPassword: '',
};

export default Form;
