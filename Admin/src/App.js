import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import History from "./scenes/invoices";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Profile from "./scenes/profile";
import Room from "./scenes/room";
import Login from "./scenes/login";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "./context/auth/auth";
import PrivateRoute from "./utils/PrivateRoute";
import CircularProgress from "@material-ui/core/CircularProgress";
import DetailInvoices from "./scenes/detailInvoice/index";
const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));
function App() {
  const location = useLocation();
  const classes = useStyles();
  const { signed, setSign } = useAuth();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check if current route is login or signup and hide the Sidebar
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/signup") {
      setIsSidebar(false);
    } else {
      setIsSidebar(true);
    }
    console.log("🚀 ~ App ~ signed:", signed)
  }, [location]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* HOME PAGE WITH SIDE BAR */}
        <div className="app">
          {isSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isSidebar && <Topbar setIsSidebar={setIsSidebar} />}
            {loading && (
              <div className={classes.loading}>
                {" "}
                <CircularProgress />{" "}
              </div>
            )}{" "}
            {/* Show loading spinner if loading is true */}
            <Routes>
              {/* <Route
                path="/"
                element={
                  signed ? (
                    <Navigate to="/" />
                  ) : (
                    <Navigate to="/login" />
                  )
                  }
              /> */}
              <Route
                path="/"
                exact
                element={<Login setLoading={setLoading} />}
              />
              {signed && (
                <>
                  <Route
                    path="/team"
                    element={
                      <PrivateRoute Component={<Team setLoading={setLoading} />} />
                    }
                  />
                  <Route
                    path="/dashboard"
                    exact
                    element={
                      <PrivateRoute
                        Component={<Dashboard setLoading={setLoading} />}
                      />
                    }
                  />

                  <Route
                    path="/history"
                    exact
                    element={
                      <PrivateRoute
                        Component={<History setLoading={setLoading} />}
                      />
                    }
                  />
                  <Route
                    path="/invoice/:id"
                    exact
                    element={
                      <PrivateRoute
                        Component={<DetailInvoices setLoading={setLoading} />}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    exact
                    element={
                      <PrivateRoute
                        Component={<Profile setLoading={setLoading} />}
                      />
                    }
                  />
                  <Route
                    path="/room"
                    exact
                    element={
                      <PrivateRoute Component={<Room setLoading={setLoading} />} />
                    }
                  />
                  <Route
                    path="/profile"
                    exact
                    element={
                      <PrivateRoute
                        Component={<Profile setLoading={setLoading} />}
                      />
                    }
                  />
                  <Route path="/form" exact element={<Form />} />
                  <Route path="/faq" exact element={<FAQ />} />
                  <Route path="/calendar" exact element={<Calendar />} />
                  <Route path="/geography" exact element={<Geography />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
