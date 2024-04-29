import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, DialogContentText, Grid, InputBase, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import * as API from "../../constants/api";
import { Typography } from "@mui/material";
import { toastAlertFail } from "../../utils/helperFn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
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

function CreateCategoryModal({
  type,
  open,
  onClose,
  updateDeleteUI,
  updateUI,
  selectedRow,
  selectedIdRow,
  handleToastSuccess,
  setLoading,
}) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [formFields, setFormFields] = useState();
  // get selected row at first render
  useEffect(() => {
    setFormFields(selectedRow);
  }, [selectedRow]);

  // handle change input
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


  // handle update category
  const handleUpdate = async (event) => {
    setLoading(true);
    const formData = new FormData(document.getElementById("my-form"));

    await axios
      .put(`${API.GET_PROFILE}/${selectedIdRow}`, formFields, {
        withCredentials: true,
      })
      .then((res) => {
        updateUI({ id: selectedIdRow, ...formFields });
        setLoading(false);
        handleToastSuccess(res.data);
        onClose(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: CategoryModal.jsx:69 ~ handleSubmit ~ error:",
          error
        );
        console.error(error);
        return setError(error.response.data.message);
      });
  };

  // handle delete category
  const handleDelete = () => {
    console.log(`Deleting row ${selectedIdRow}`);
    setLoading(true);
    axios
      .delete(`${API.GET_PROFILE}/${selectedIdRow}`, {
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
          "🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error",
          error
        );
        if (error.response.status === 401) {
          return toastAlertFail("Please login again");
        }
      });
  };

  return (
    <>

      {type === "edit" && selectedRow && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogContent>
            <form onSubmit={handleUpdate} id="my-form">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                marginBottom="20px"
              >
                <Box
                  className={classes.root}
                  sx={{ display: "flex", flexDirection: "column" }}
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
                  {!file && formFields && (
                    <>
                      <img
                        className={classes.preview}
                        src={formFields.thumbnail}
                        alt="Preview"
                      />
                    </>
                  )}

                  <InputBase
                    className={classes.input}
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{ accept: "image/*" }}
                    id="upload-button"
                    sx={{ display: "none" }}
                  />
                  <label htmlFor="upload-button">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Box>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="email"
                    value={formFields ? formFields.email : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="firstName"
                    label="FirstName"
                    value={formFields ? formFields.firstName : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="lastName"
                    label="LastName"
                    value={formFields ? formFields.lastName : null}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="role_id">
                      Role
                    </InputLabel>
                    <Select
                      label="Role"
                      id="role_id"
                      name="role"
                      value={formFields ? formFields.role : " "}
                      onChange={handleChange}
                    >
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"landlord"}>Landlord</MenuItem>
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
      {type === "delete" && (
        <Dialog open={open} onClose={() => onClose()}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <form id="my-form">
              <Box style={{ display: "flex", alignItems: "center" }}>
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

export default CreateCategoryModal;
