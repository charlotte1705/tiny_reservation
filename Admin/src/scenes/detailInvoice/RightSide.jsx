import { Box, Typography, useTheme } from '@mui/material';
import { Grid } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { tokens } from '../../theme';
import { makeStyles } from '@material-ui/styles';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const useStyles = makeStyles({
  statusNotCheck: {
    color: 'red',
  },
  statusCheck: {
    color: 'green',
  },
});
const RightSide = (data) => {
  const dataInvoice = data.data;
  console.log(
    '🚀 ~ file: rightSide.jsx:21 ~ RightSide ~ dataInvoice:',
    dataInvoice
  );
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box backgroundColor={colors.primary[400]} sx={{ borderRadius: '10px' }}>
        <Box m="20px" py={2}>
          <Typography variant="h5" gutterBottom textAlign="left">
            <b>Invoice Track-up</b>
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="left">
            Status:{' '}
            <b
              className={
                (dataInvoice.invoice &&
                  dataInvoice.invoice.status === 'Cancel') ||
                (dataInvoice.invoice &&
                  dataInvoice.invoice.status === 'Pending')
                  ? classes.statusNotCheck
                  : classes.statusCheck
              }
            >
              {dataInvoice.invoice && dataInvoice.invoice.status}
            </b>
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="left">
            Check-in:{' '}
            <b>{dataInvoice.invoice && dataInvoice.invoice.checkinDate}</b>
          </Typography>

          <Typography variant="body1" gutterBottom textAlign="left">
            Check-out:{' '}
            <b>{dataInvoice.invoice && dataInvoice.invoice.checkoutDate}</b>
          </Typography>
        </Box>
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        sx={{
          borderRadius: '10px',
        }}
      >
        <Box m="20px" py={2}>
          <Typography variant="h5" gutterBottom textAlign="left">
            <b>Client Details</b>
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={2}>
              <AccountCircleIcon
                sx={{
                  fontSize: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6363b1',
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" gutterBottom textAlign="left">
                <b>{dataInvoice.customer && dataInvoice.customer.fullName}</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                {dataInvoice.invoice && dataInvoice.customer.email}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: '10px' }} />
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <b>{dataInvoice.customer && dataInvoice.customer.address}</b>{' '}
            <VerifiedIcon sx={{ color: 'blue', marginLeft: '6px' }} />
          </Typography>
          <Typography variant="body1" textAlign="left">
            Phone Number:{' '}
            <b>{dataInvoice.customer && dataInvoice.customer.phone}</b>
          </Typography>
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]} sx={{ borderRadius: '10px' }}>
        <Box m="20px" py={2}>
          <Typography variant="body1" gutterBottom textAlign="left">
            <b>Amount Due</b>(VND)
          </Typography>
          <Typography variant="h2" gutterBottom textAlign="left">
            <b>${dataInvoice && dataInvoice.total}</b>
          </Typography>
          <Divider sx={{ my: '10px' }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" gutterBottom textAlign="left">
              Also attach pdf in mail
            </Typography>
            <Switch color="secondary" {...label} defaultChecked />
          </Box>
        </Box>
      </Box>

      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {dataInvoice.invoice &&
          dataInvoice.invoice.checkInStatus === 'Not Check In' &&
          (dataInvoice.invoice.status === 'Pending' ||
            dataInvoice.invoice.status === 'Cancel') && (
            <>
              <Grid item xs={5}>
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  fullWidth
                >
                  Check-in
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  fullWidth
                >
                  Check-in
                </Button>
              </Grid>
            </>
          )}

        {dataInvoice.invoice &&
          dataInvoice.invoice.checkInStatus === 'Check In' && (
            <>
              <Grid item xs={5}>
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  fullWidth
                >
                  Check-in
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button color="secondary" variant="contained" fullWidth>
                  Check-out
                </Button>
              </Grid>
            </>
          )}

        {dataInvoice.invoice &&
          dataInvoice.invoice.checkInStatus === 'Check Out' && (
            <>
              <Grid item xs={5}>
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  fullWidth
                >
                  Check-in
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  fullWidth
                >
                  Check-out
                </Button>
              </Grid>
            </>
          )}
      </Grid>

      <Button type="submit" color="secondary" variant="contained" fullWidth>
        Send Invoice
      </Button>
    </>
  );
};

export default RightSide;
