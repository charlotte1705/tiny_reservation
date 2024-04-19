import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';
import * as API from '../../constants/api';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import TeamModal from './TeamModal';

const Team = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [team, setTeam] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [typeModal, setTypeModal] = useState(null);

  const handleModalOpenWithParams = (type, params) => {
    setTypeModal(type);
    setSelectedRow(params.row);
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
    const validRoom = team.filter((item) => item.id !== id);
    setTeam(validRoom);
  };

  const updateCreateUI = (newUser) => {
    setTeam((prevState) => [...prevState, newUser]);
  };

  // get all team members
  useEffect(() => {
    axios
      .get(`${API.GET_USERS}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setTeam(res.data.message);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }, []);

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
      field: 'avatar',
      headerName: 'Avatar',
      flex: 1,
    },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 'admin'
                ? colors.greenAccent[600]
                : role === 'manager'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'manager' && <SecurityOutlinedIcon />}
            {role === 'user' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        );
      },
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        {/* <Box display="flex" justifyContent="end" my="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => handleModalOpen('create')}
          >
            Create New User
          </Button>
        </Box> */}
        <DataGrid rows={team} columns={columns} />
      </Box>
      <TeamModal
        type={typeModal}
        open={isModal}
        onClose={handleModalCloseWithParams}
        selectedRow={selectedRow}
        updateCreateUI={updateCreateUI}
        updateDeleteUI={updateDeleteUI}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default Team;
