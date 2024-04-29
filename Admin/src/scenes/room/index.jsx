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
import RoomModal from './RoomModal';
import { ToastContainer } from 'react-toastify';

const Room = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [hotels, setHotels] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedIdRow, setSelectedIdRow] = useState();
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyButtonLabel, setEmergencyButtonLabel] = useState();
  // const [emailButtonLabel, setEmailButtonLabel] = useState();
  const [typeModal, setTypeModal] = useState(null);
  // HANDLE DELETE ROOM

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
          setHotels(res.data);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
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
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
    axios
      .get(`${API.GET_HOTEL}`)
      .then((res) => {
        if (res.data) {
          setHotels(res.data);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });

  }, []);

  // handle update UI
  const updateDeleteUI = (id) => {
    const validRoom = hotels.filter((item) => item._id !== id);
    setHotels(validRoom);
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

  const updateCreateUI = (newRoom) => {
    setHotels((prevState) => [...prevState, newRoom]);
  };

  const updateUI = (updatedRoom) => {
    if (updatedRoom) {
      if (updatedRoom) {
        setHotels(

          //   hotels.map((room) => (room._id === updatedRoom.id ? updatedRoom : room))
          // );
          hotels.map((room) => {
            if (room._id === updatedRoom.id) {
              updatedRoom._id = room._id;
              return updatedRoom;
            }
            return room;
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
      field: 'userId',
      headerName: 'Landlord ID',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Hotel Name',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },

    {
      field: 'description',
      headerName: 'Description',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'pricePerNight',
      headerName: 'Price',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'emergency',
      headerName: 'Emergency',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'limit',
      headerName: 'Limit',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <div>
              <IconButton
                onClick={() => handleModalOpenWithParams('edit', params)}
              >
                <Edit sx={{ color: colors.blueAccent[500] }} />
              </IconButton>
              {/* <IconButton onClick={() => handleDelete(params.id)}> */}


              <IconButton
                onClick={() => handleModalOpenWithParams('delete', params)}
              >
                <Delete sx={{ color: colors.redAccent[500] }} />
              </IconButton>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="Hotels" subtitle="List of Hotels" />
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
        <RoomModal
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
          key={hotels._id}
          getRowId={(row) => row._id}
          rows={hotels}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <ToastContainer />
      </Box>
    </Box>
  );
};
export default Room;
