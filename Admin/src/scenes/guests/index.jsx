import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import * as API from '../../constants/api';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import GuestModal from './GuestModal';
import { Button } from '@mui/material';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import { ToastContainer } from 'react-toastify';

const Guest = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [guests, setGuests] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [typeModal, setTypeModal] = useState(null);
  const [selectedIdRow, setSelectedIdRow] = useState();

  const handleModalOpenWithParams = (type, params) => {
    const { id, createdAt, updatedAt, ...selectedRowData } = params.row;
    setSelectedIdRow(id);
    delete params.row.createdAt;
    delete params.row.updatedAt;
    setTypeModal(type);
    setSelectedRow(selectedRowData);
    setModal(true);
  };
  const handleModalCloseWithParams = () => {
    setModal(false);
  };

  // HANDLE CREATE ROOM
  const handleModalOpen = (type) => {
    setTypeModal(type);
    setModal(true);
  };

  const handleModalOpenClose = () => {
    setModal(false);
  };

  // handle update UI
  const updateDeleteUI = (id) => {
    const validGuest = guests.filter((item) => item.id !== id);
    setGuests(validGuest);
  };

  const updateCreateUI = (newUser) => {
    setGuests((prevState) => [...prevState, newUser]);
  };

  const updateUI = (updatedGuest) => {
    if (updatedGuest) {
      if (updatedGuest) {
        setGuests(
          guests.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
          )
        );
      }
    }
  };

  // get all team members
  useEffect(() => {
    axios
      .get(`${API.GUEST}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setGuests(res.data.message);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
        console.log('hereeeeee');
        return toastAlertFail('error');
      });
  }, []);
  // handle toast
  const handleToastFail = (message) => {
    toastAlertFail(message);
  };
  const handleToastSuccess = (message) => {
    toastAlertSuccess(message);
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'gender',
      headerName: 'Gender',
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
      <Header title="GUESTS" subtitle="Managing the Guests Members" />
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
        }}
      >
        <Box display="flex" justifyContent="end" my="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => handleModalOpen('create')}
          >
            Create New Guest
          </Button>
        </Box>
        <GuestModal
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
          key={guests.id}
          getRowId={(row) => row.id}
          rows={guests}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Guest;
