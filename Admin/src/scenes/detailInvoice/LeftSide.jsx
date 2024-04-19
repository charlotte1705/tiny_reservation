import { Grid } from '@material-ui/core';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from './../../theme';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableRow } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import Divider from '@mui/material/Divider';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ' #a4a9fc',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'name-column--cell',
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    cellClassName: 'name-column--cell',
  },
];
const useStyles = makeStyles({
  statusNotCheck: {
    color: 'red',
  },
  statusCheck: {
    color: 'green',
  },
});
const LeftSide = (data) => {
  const dataInvoice = data.data;
  console.log(
    '🚀 ~ file: LeftSide.jsx:54 ~ LeftSide ~ dataInvoice:',
    dataInvoice
  );
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* [START] - BRANCH */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Grid item xs={3} md={3}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ae/CASA_logo.svg"
                alt="logo"
                width="80px"
              />
            </Grid>

            <Grid item xs={9} md={9}>
              <Typography variant="body1" gutterBottom textAlign="left">
                <b>{dataInvoice.branch && dataInvoice.branch.name}</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                {dataInvoice.branch && dataInvoice.branch.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom textAlign="right">
            Contact Number: {dataInvoice.branch && dataInvoice.branch.phone}
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="right">
            {dataInvoice.branch && dataInvoice.branch.address}
          </Typography>
        </Grid>
      </Grid>
      {/* [END] - BRANCH */}
      {/* [START] - INVOICE */}
      <Box backgroundColor={colors.primary[400]} sx={{ borderRadius: '10px' }}>
        <Box m="20px" py={2}>
          <Grid
            container
            spacing={2}
            backgroundColor={colors.primary[400]}
            style={{ borderRadius: '10px' }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom textAlign="left">
                Invoice Number:{' '}
                <b>#{dataInvoice.invoice && dataInvoice.invoice.code}</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                Check In Status:{' '}
                <b
                  className={
                    (dataInvoice.invoice &&
                      dataInvoice.invoice.checkInStatus === 'Check In') ||
                    dataInvoice.invoice.checkInStatus === 'Check Out'
                      ? classes.statusCheck
                      : classes.statusNotCheck
                  }
                >
                  {dataInvoice.invoice && dataInvoice.invoice.checkInStatus}
                </b>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom textAlign="right">
                Bill to
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="right">
                <b>{dataInvoice.customer && dataInvoice.customer.fullName}</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="right">
                <b>{dataInvoice.customer && dataInvoice.customer.address}</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* [END] - INVOICE */}
      {/* [START] - INVOICE PRICE */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" gutterBottom textAlign="left">
            <b>Services</b>
          </Typography>
          <Box
            // height="75vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: colors.greenAccent[300],
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: colors.blueAccent[700],
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: colors.primary[400],
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colors.blueAccent[700],
              },
              '& .MuiCheckbox-root': {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell>{column.headerName}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataInvoice.services &&
                    dataInvoice.services.map((service, id) => (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {id + 1}
                        </StyledTableCell>
                        <StyledTableCell>{service.name}</StyledTableCell>
                        <StyledTableCell>{service.price}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" gutterBottom textAlign="left">
            <b>Payment Information</b>
          </Typography>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom textAlign="left">
                Payment Method:{' '}
                <b>
                  <span style={{ color: 'green' }}>
                    {dataInvoice.invoice && dataInvoice.invoice.paymentMethod}
                  </span>
                </b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                Account Name: <b>Tiny Reservation</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                Account Number: <b>9700 0023 4200 2900</b>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="left">
                Payment Date:{' '}
                <b>{dataInvoice.invoice && dataInvoice.invoice.paymentDate}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    <b>Sub Total</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="right">
                    <b>${dataInvoice.invoice && dataInvoice.invoice.total}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    Services
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="right">
                    <b>${dataInvoice && dataInvoice.totalServicesPrice}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    Discount
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="right">
                    <b>$0.00</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    Total tax
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="right">
                    <b>$0.00</b>
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="left">
                    <b>Total Amount</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom textAlign="right">
                    <b>${dataInvoice && dataInvoice.total}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* [END] - INVOICE PRICE */}
    </>
  );
};

export default LeftSide;
