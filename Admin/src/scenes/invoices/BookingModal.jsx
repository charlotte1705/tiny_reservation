import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {
  Box,
  DialogContentText,
  InputBase,
  IconButton,
  Grid,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../constants/api';
import { Typography } from '@mui/material';
import { toastAlertFail } from '../../utils/helperFn';
import { AttachFile } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  preview: {
    maxWidth: 200,
    maxHeight: 200,
  },
}));

function InvoiceModal({
  type,
  open,
  onClose,
  data,
  updateCreateUI,
  updateDeleteUI,
  updateUI,
  selectedRow,
  handleToastFail,
  handleToastSuccess,
  setLoading,
}) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [formFields, setFormFields] = useState();
  useEffect(() => {
    setFormFields(selectedRow);
  }, [selectedRow]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormFields((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // handle single file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFormFields((prevState) => ({
        ...prevState,
        thumbnail: selectedFile,
      }));
    }
  };

  // handle multple files
  const handleFilesSelect = (event) => {
    const fileList = event.target.files;
    const fileArray = [];
    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      const file = fileList[i];
      reader.onload = (e) => {
        fileArray.push({ file, dataUrl: e.target.result });
        setFiles([...fileArray]);
      };
      reader.readAsDataURL(file);
    }
    for (let i = 0; i < files.length; i++) {
      setFormFields((prevState) => ({
        ...prevState,
        images: files[i],
      }));
    }
  };

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    setLoading(true);
    // const formData = new FormData(document.getElementById('my-form'));
    // formData.append('thumbnail', formFields.thumbnail);
    const formData = new FormData(document.getElementById('my-form'));

    await axios
      .post(API.INVOICE, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateCreateUI(res.data.message);
        setLoading(false);
        handleToastSuccess('Create room successfully');
        onClose(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          '🚀 ~ file: CategoryModal.jsx:69 ~ handleSubmit ~ error:',
          error
        );
        console.error(error);
        return setError(error.response.data.message);
      });
  };

  const handleUpdate = async (event) => {
    setLoading(true);
    const formData = new FormData(document.getElementById('my-form'));

    await axios
      .put(`${API.INVOICE}/${formFields.id}`, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateUI({ id: selectedRow.id, ...formFields });
        setLoading(false);
        handleToastSuccess(res.data.message);
        onClose(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          '🚀 ~ file: CategoryModal.jsx:69 ~ handleSubmit ~ error:',
          error
        );
        console.error(error);
        return setError(error.response.data.message);
      });
  };

  const handleDelete = () => {
    console.log(`Deleting row ${selectedRow.id}`);
    setLoading(true);
    axios
      .delete(`${API.INVOICE}/${selectedRow.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        updateDeleteUI(selectedRow.id);
        setLoading(false);
        handleToastSuccess(res.data.message);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
        return handleToastFail(error.message);
      });
  };

  return (
    <>
      {type === 'create' && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle variant="h2">Create Invoice</DialogTitle>
          <DialogContent sx={{ paddingTop: '24px' }}>
            <form onSubmit={handleCreateRoom} id="my-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="code"
                    label="Code"
                    value={formFields ? formFields.code : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="detail"
                    label="Detail"
                    value={formFields ? formFields.detail : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    value={formFields ? formFields.description : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="price"
                    label="Price"
                    value={formFields ? formFields.price : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="adult"
                    label="Adult"
                    value={formFields ? formFields.adult : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="kid"
                    label="Kid"
                    value={formFields ? formFields.kid : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="categoryId"
                    label="Category ID"
                    value={formFields ? formFields.categoryId : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Box display="flex" alignItems="center">
              {error && (
                <Box mr={2} color="red">
                  {error}
                </Box>
              )}
            </Box>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button
              onClick={handleCreateRoom}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {type === 'edit' && selectedRow && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle>Update Invoice</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdate} id="my-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="code"
                    label="Code"
                    value={formFields ? formFields.code : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="date"
                    label="Date"
                    value={formFields ? formFields.date : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="status"
                    label="Status"
                    value={formFields ? formFields.status : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="adminAction"
                    label="Admin Action"
                    value={formFields ? formFields.adminAction : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="paymentMethod"
                    label="Payment Method"
                    value={formFields ? formFields.paymentMethod : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="paymentDate"
                    label="Payment Date"
                    value={formFields ? formFields.paymentDate : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="total"
                    label="Total"
                    value={formFields ? formFields.total : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="checkInDate"
                    label="Check In Date"
                    value={formFields ? formFields.checkInDate : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="userId"
                    label="UserId"
                    value={formFields ? formFields.userId : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="guestId"
                    label="GuestId"
                    value={formFields ? formFields.guestId : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Box display="flex" alignItems="center">
              {error && (
                <Box mr={2} color="red">
                  {error}
                </Box>
              )}
            </Box>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button
              onClick={() => handleUpdate()}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {type === 'delete' && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <form id="my-form">
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <DialogContentText>
                  Are you sure you want to delete this item?
                </DialogContentText>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDelete()} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default InvoiceModal;
