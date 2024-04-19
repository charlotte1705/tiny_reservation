import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box, DialogContentText, InputBase, IconButton } from '@mui/material';
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

function GuestModal({
  type,
  open,
  onClose,
  data,
  updateCreateUI,
  updateDeleteUI,
  updateUI,
  selectedRow,
  selectedIdRow,
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

  const handleCreateUserInTeam = async (event) => {
    event.preventDefault();
    setLoading(true);
    // const formData = new FormData(document.getElementById('my-form'));
    // formData.append('thumbnail', formFields.thumbnail);
    const formData = new FormData(document.getElementById('my-form'));

    await axios
      .post(API.GUEST, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateCreateUI(res.data.message);
        formFields(null);
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
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(document.getElementById('my-form'));

    await axios
      .put(`${API.GUEST}/${selectedIdRow}`, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateUI({ id: selectedIdRow, ...formFields });
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
    console.log(`Deleting row ${selectedIdRow}`);
    setLoading(true);
    axios
      .delete(`${API.GUEST}/${selectedIdRow}`, {
        withCredentials: true,
      })
      .then((res) => {
        updateDeleteUI(selectedIdRow);
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
        if (error.response.status === 401) {
          return toastAlertFail('Please login again');
        }
      });
  };

  return (
    <>
      {type === 'create' && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle variant="h2">Create Guest</DialogTitle>
          <DialogContent>
            <form onSubmit={handleCreateUserInTeam} id="my-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    value={formFields ? formFields.name : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    value={formFields ? formFields.email : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="Address"
                    value={formFields ? formFields.address : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={formFields ? formFields.phone : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gridColumn: 'span 2',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
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
                      name="gender"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="male"
                      name="gender"
                      control={<Radio />}
                      label="Male"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="other"
                      name="gender"
                      control={<Radio />}
                      label="Other"
                      onChange={handleChange}
                    />
                  </RadioGroup>
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
              onClick={handleCreateUserInTeam}
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
          <DialogTitle>Update Guest</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdate} id="my-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    value={formFields ? formFields.fullName : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    value={formFields ? formFields.email : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="Address"
                    value={formFields ? formFields.address : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={formFields ? formFields.phone : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gridColumn: 'span 2',
                    }}
                    value={formFields ? formFields.gender : null}
                  >
                    <Typography
                      variant="h6"
                      sx={{
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
                      name="gender"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="male"
                      name="gender"
                      control={<Radio />}
                      label="Male"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="other"
                      name="gender"
                      control={<Radio />}
                      label="Other"
                      onChange={handleChange}
                    />
                  </RadioGroup>
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
                  Are you sure you want to delete <b>this user</b>?
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

export default GuestModal;
