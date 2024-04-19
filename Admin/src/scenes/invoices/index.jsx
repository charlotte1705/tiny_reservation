import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from './../../theme';
import Header from './../../components/Header';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as API from '../../constants/api';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import InvoiceModal from './InvoiceModal';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
const Invoices = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoices, setInvoices] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');
  const [typeModal, setTypeModal] = useState(null);
  // HANDLE DELETE ROOM

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
  // get all rooms by category
  useEffect(() => {
    axios
      .get(`${API.INVOICE}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('🚀 ~ file: index.jsx:51 ~ .then ~ res:', res);
        if (res.data.success) {
          setInvoices(res.data.message);
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
    const validRoom = invoices.filter((item) => item.id !== id);
    setInvoices(validRoom);
  };

  const updateCreateUI = (newInvoices) => {
    setInvoices((prevState) => [...prevState, newInvoices]);
  };

  const updateUI = (updatedInvoice) => {
    if (updatedInvoice) {
      if (updatedInvoice) {
        setInvoices(
          invoices.map((invoice) =>
            invoice.id === updatedInvoice.id ? updatedInvoice : invoice
          )
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

  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'code',
      headerName: 'Code',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'adminAction',
      headerName: 'Admin Action',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'paymentDate',
      headerName: 'Payment Date',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'total',
      headerName: 'Total',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'checkInDate',
      headerName: 'Check In Date',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'UserID',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'guestId',
      headerName: 'GuestID',
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
              {/* <IconButton
                onClick={() => handleModalOpenWithParams('edit', params)}
              >
                <Edit sx={{ color: colors.blueAccent[500] }} />
              </IconButton>
              <IconButton
                onClick={() => handleModalOpenWithParams('delete', params)}
              >
                <Delete sx={{ color: colors.redAccent[500] }} />
              </IconButton> */}
              <IconButton
                onClick={() => {
                  navigate(`/invoice/${params.row.id}`);
                }}
              >
                <Button variant="outlined">Detail</Button>
              </IconButton>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="Invoices" subtitle="List of Invoices" />
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
        {/* <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => handleModalOpen('create')}
          >
            Create New Invoice
          </Button>
        </Box> */}
        {selectedRow && (
          <InvoiceModal
            type={typeModal}
            open={isModal}
            onClose={handleModalCloseWithParams}
            selectedRow={selectedRow}
            updateCreateUI={updateCreateUI}
            updateDeleteUI={updateDeleteUI}
            updateUI={updateUI}
            handleToastFail={handleToastFail}
            handleToastSuccess={handleToastSuccess}
            setLoading={setLoading}
          />
        )}
        <DataGrid
          key={invoices.id}
          getRowId={(row) => row.id}
          rows={invoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <ToastContainer />
      </Box>
    </Box>
  );
};
export default Invoices;
