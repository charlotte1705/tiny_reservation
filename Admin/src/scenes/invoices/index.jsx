import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from './../../theme';
import Header from './../../components/Header';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import * as API from '../../constants/api';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import BookingModal from './BookingModal';
import { ToastContainer } from 'react-toastify';

const History = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bookings, setBookings] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedIdRow, setSelectedIdRow] = useState();
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyButtonLabel, setEmergencyButtonLabel] = useState();
  // const [emailButtonLabel, setEmailButtonLabel] = useState();
  const [typeModal, setTypeModal] = useState(null);
  // HANDLE DELETE Booking

  const handleModalOpenWithParams = (type, params) => {
    const { _id, createdAt, updatedAt, ...selectedRowData } = params.row;
    setSelectedIdRow(_id);
    delete params.row.createdAt;
    delete params.row.updatedAt;
    setTypeModal(type);
    setSelectedRow(selectedRowData);
    setModal(true);
  };

  const handleModalCloseWithParams = () => {
    setModal(false);
  };

  // HANDLE PUSH EMERGENCY
  const handleModalOpen = () => {
    const type = !isEmergency;
    setIsEmergency(type);
    setEmergencyButtonLabel(type ? "Push Normal" : "Push Emergency");
    axios
      .put(`${API.GET_EMERGENCY}`, { "emergency": type })
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: Booking-body.component.jsx ~ line 124 ~ handleSubmitBooking ~ error',
          error
        );
      });
  };


  // get all hotels by category
  useEffect(() => {
    axios
      .get(`${API.GET_EMERGENCY}`)
      .then((res) => {
        if (res.data) {
          setIsEmergency(res.data.isEmergency);
          console.log("🚀 ~ .then ~ isEmergency:", res.data.isEmergency)
          setEmergencyButtonLabel(res.data.isEmergency ? "Push Normal" : "Push Emergency");
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: Booking-body.component.jsx ~ line 124 ~ handleSubmitBooking ~ error',
          error
        );
      });
    axios
      .get(`${API.GET_BOOKING}`)
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: Booking-body.component.jsx ~ line 124 ~ handleSubmitBooking ~ error',
          error
        );
      });

  }, []);

  // handle update UI
  const updateDeleteUI = (id) => {
    const validBooking = bookings.filter((item) => item._id !== id);
    setBookings(validBooking);
  };
  // HANDLE PUSH EMAIL
  const handlePushEmail = () => {
    // Implement your logic for pushing email here
    // This function will be called when the Push Email button is clicked
    axios
      .post(`${API.GET_EMAIL}`)
      .then((response) => {
        // Handle successful response from the API
        console.log('Email pushed successfully:', response.data);
        console.log('Push Email button clicked');

      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error('Error pushing email:', error);
        // Optionally, you can show an error message or perform other actions
      });
  };

  const updateCreateUI = (newBooking) => {
    setBookings((prevState) => [...prevState, newBooking]);
  };

  const updateUI = (updatedBooking) => {
    if (updatedBooking) {
      if (updatedBooking) {
        setBookings(

          //   hotels.map((Booking) => (Booking._id === updatedBooking.id ? updatedBooking : Booking))
          // );
          bookings.map((booking) => {
            if (booking._id === updatedBooking.id) {
              updatedBooking._id = booking._id;
              return updatedBooking;
            }
            return booking;
            // return category._id === updatedCategory.id
            //   ? updatedCategory
            //   : category;
          })
        );
      }
    }
  };

  // handle toast
  const handleToastFail = (message) => {
    toastAlertFail(message);
  };
  const handleToastSuccess = (message) => {
    toastAlertSuccess(message);
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Hotel Name',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'firstName',
      headerName: 'FirstName',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },

    {
      field: 'lastName',
      headerName: 'LastName',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'adultCount',
      headerName: 'Adult',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'childCount',
      headerName: 'Child',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'checkIn',
      headerName: 'CheckIn',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'checkOut',
      headerName: 'CheckOut',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'totalCost',
      headerName: 'TotalCost',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header title="Room" subtitle="List of Rooms" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => handleModalOpen()}
          >
            {emergencyButtonLabel}
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => handlePushEmail()}
            style={{ marginLeft: '10px' }}
          >
            {/* {emailButtonLabel} */}
            Push Email
          </Button>
        </Box>
        <BookingModal
          type={typeModal}
          open={isModal}
          onClose={handleModalCloseWithParams}
          selectedRow={selectedRow}
          selectedIdRow={selectedIdRow}
          updateCreateUI={updateCreateUI}
          updateDeleteUI={updateDeleteUI}
          updateUI={updateUI}
          handleToastFail={handleToastFail}
          handleToastSuccess={handleToastSuccess}
          setLoading={setLoading}
        />
        <DataGrid
          key={bookings._id}
          getRowId={(row) => row._id}
          rows={bookings}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <ToastContainer />
      </Box>
    </Box>
  );
};
export default History;
