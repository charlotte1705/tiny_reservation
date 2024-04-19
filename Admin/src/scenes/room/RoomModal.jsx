import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box, DialogContentText, InputBase, Grid, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../constants/api';
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

function RoomModal({
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
  const [hotelStatus, setHotelStatus] = useState("Pending");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [formFields, setFormFields] = useState(selectedRow);
  useEffect(() => {
    if (selectedRow) {
      setFormFields(selectedRow);
    }
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
    for (let i = 0; i < files.length; i++) {
      formData.append('images', formFields.images);
    }
    await axios
      .post(API.CREATE_ROOM, formData, {
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
    await axios
      .put(`${API.GET_HOTEL}/${selectedIdRow}`, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateUI({ id: selectedIdRow, ...formFields });
        setLoading(false);
        handleToastSuccess(res.data);
        //delete .message
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
      .delete(`${API.GET_HOTEL}/${selectedIdRow}`, {
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
        return handleToastFail(error.message);
      });
  };
  return (
    <>
      {type === 'create' && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle variant="h2">Create Room</DialogTitle>
          <DialogContent>
            <form onSubmit={handleCreateRoom} id="my-form">
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                marginBottom="20px"
              >
                <Box
                  className={classes.root}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Box className={classes.root}>
                    {/* <Slider {...settings}>
                      {files.map((file, index) => (
                        <div key={index}>
                          <img
                            src={file.dataUrl}
                            alt={file.file.name}
                            width="100%"
                            height="auto"
                          />
                        </div>
                      ))}
                    </Slider> */}
                    {files.map((file) => (
                      <img
                        key={file.dataUrl}
                        src={file.dataUrl}
                        alt={file.file.name}
                        width="100%"
                        height="auto"
                      />
                    ))}
                  </Box>
                  <InputBase
                    type="file"
                    inputProps={{ multiple: true }}
                    className={classes.input}
                    onChange={handleFilesSelect}
                    name="images"
                    id="upload-button"
                    sx={{ display: 'none' }}
                  />
                  <label htmlFor="upload-button">
                    <Button variant="contained" component="span">
                      Upload Images
                    </Button>
                  </label>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Hotel Name"
                    value={formFields ? formFields.name : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="city"
                    label="City"
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
                    name="type"
                    label="Type"
                    value={formFields ? formFields.price : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12}>
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
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    name="price"
                    label="Price"
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
          <DialogTitle>Update Hotel</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdate} id="my-form">
              <Box
                style={{ display: 'flex', alignItems: 'center' }}
                marginBottom="20px"
              >
                {/* <Box
                  className={classes.root}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {file && (
                    <>
                      <Typography className={classes.filename}>
                        {file.name}
                      </Typography>
                      {preview && (
                        <img
                          className={classes.preview}
                          src={preview}
                          alt="Preview"
                        />
                      )}
                    </>
                  )}
                  {!file && data.thumbnail && (
                    <>
                      {data && (
                        <img
                          className={classes.preview}
                          src={data.thumbnail}
                          alt="Preview"
                        />
                      )}
                    </>
                  )}
                  <InputBase
                    className={classes.input}
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{ accept: 'image/*' }}
                    id="upload-button"
                    sx={{ display: 'none' }}
                  />
                  <label htmlFor="upload-button">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Box> */}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Hotel Name"
                    value={formFields ? formFields.name : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="city"
                    label="City"
                    value={formFields ? formFields.city : null}
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
                    name="type"
                    label="Type"
                    value={formFields ? formFields.type : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="pricePerNight"
                    label="Price"
                    value={formFields ? formFields.pricePerNight : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="emergency"
                    label="Emergency"
                    value={formFields ? formFields.emergency : null}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel htmlFor="status_id">
                      Status
                  </InputLabel>
                    <Select
                      label="Status"
                      id="status_id"
                      name="status"
                      value={formFields ? formFields.status : null}
                      onChange={handleChange}
                      // onChange={(event) => {
                      //   formFields.status = event.target.value;
                      //   setHotelStatus(event.target.value);
                      // }}
                    >
                      <MenuItem value={"pending"}>Pending</MenuItem>
                      <MenuItem value={"approve"}>Approve</MenuItem>
                      <MenuItem value={"reject"}>Reject</MenuItem>
                    </Select>
                  </FormControl>
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
          <DialogTitle>Confirm Approve</DialogTitle>
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
      )
      }
    </>
  );
}

export default RoomModal;
