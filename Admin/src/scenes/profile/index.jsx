import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import * as API from "../../constants/api";
import axios from "axios";
import CreateCategoryModal from "./ProfileModal";
import { Delete, Edit } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { toastAlertFail, toastAlertSuccess } from "../../utils/helperFn";
import "react-toastify/dist/ReactToastify.css";
import AdminChat from "../../components/AdminChat";
import MessageIcon from "@mui/icons-material/Message";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const Profile = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [profiles, setProfiles] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedIdRow, setSelectedIdRow] = useState();
  const [typeModal, setTypeModal] = useState(null);
  const [isOpenChatBox, setIsOpenChatBox] = useState(false);
  const [idChat, setIdChat] = useState(null);

  const handleModalOpenWithParams = (type, params) => {
    const { _id, __v, ...selectedRowData } = params.row;
    setSelectedIdRow(_id);
    delete params.row.createdAt;
    delete params.row.updatedAt;
    setTypeModal(type);
    setSelectedRow(selectedRowData);
    setModal(true);
  };

  const handleOpenChatBox = (id) => {
    setIsOpenChatBox(true);
    setIdChat(id);
  };

  const handleToggleChatBox = () => setIsOpenChatBox(!isOpenChatBox);

  const handleModalCloseWithParams = () => {
    setModal(false);
  };

  const handleModalOpen = (type) => {
    setTypeModal(type);
    setModal(true);
  };

  // get all rooms by category at first render
  useEffect(() => {
    axios
      .post(`${API.GET_PROFILE}`)
      .then((res) => {
        if (res.data) {
          setProfiles(res.data);
        }
      })
      .catch((error) => {
        console.error(
          "🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error",
          error
        );
      });
  }, []);

  //[START] handle update UI
  const updateDeleteUI = (id) => {
    console.log("🚀 ~ updateDeleteUI ~ profiles:", profiles);
    const validCategory = profiles.filter((item) => item._id !== id);
    setProfiles(validCategory);
  };

  const updateCreateUI = (newCategory) => {
    setProfiles((prevState) => [...prevState, newCategory]);
  };

  const updateUI = (updatedCategory) => {
    console.log(
      "🚀 ~ file: index.jsx:73 ~ updateUI ~ updatedCategory:",
      updatedCategory
    );
    console.log("🚀 ~ file: index.jsx:83 ~ updateUI ~ profiles:", profiles);
    if (updatedCategory) {
      if (updatedCategory) {
        setProfiles(
          profiles.map((category) => {
            if (category._id === updatedCategory.id) {
              updatedCategory._id = category._id;
              return updatedCategory;
            }
            return category;
            // return category._id === updatedCategory.id
            //   ? updatedCategory
            //   : category;
          })
        );
      }
    }
  };

  //[END] handle update UI

  // [START] handle toast
  const handleToastFail = (message) => {
    toastAlertFail(message);
  };
  const handleToastSuccess = (message) => {
    toastAlertSuccess(message);
  };
  // [END] handle toast

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "FirstName",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "LastName",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      headerName: "Actions",
      width: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div>
              <IconButton onClick={() => handleOpenChatBox(params.id)}>
                <MessageIcon sx={{ color: colors.blueAccent[500] }} />
              </IconButton>
              <IconButton
                onClick={() => handleModalOpenWithParams("edit", params)}
              >
                <Edit sx={{ color: colors.blueAccent[500] }} />
              </IconButton>
              <IconButton
                onClick={() => handleModalOpenWithParams("delete", params)}
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
    <>
      <ToastContainer />
      <Box m="20px">
        <Header title="Profile" subtitle="List of profiles" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
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
              Create New Category
            </Button>
          </Box> */}
          <CreateCategoryModal
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
            rows={profiles}
            key={profiles._id}
            getRowId={(row) => row._id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>

      {isOpenChatBox && (
        <AdminChat
          id={idChat}
          randomId={profiles[Math.floor(Math.random() * profiles?.length)]?._id}
          profiles={profiles}
        />
      )}
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          zIndex: 999,
          backgroundColor: "#ccc",
          width: "50px",
          height: "50px",
          borderRadius: "100%",
          right: "30px",
          bottom: "30px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleToggleChatBox}
      >
        <ContactSupportIcon />
      </button>
    </>
  );
};
export default Profile;
