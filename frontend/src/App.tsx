import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
const App = () => {
 return (
  <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
             <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              {/* <Search /> */}
              <p> Search Page </p>  
            </Layout>
            // <> Search Page </>        
             }
        />
        <Route
          path="/register"
          element={
            <Layout>
               <p> Register Page </p> 
              <Register />
            </Layout>
          }
        />
             <Route
          path="/sign-in"
          element={
            <Layout>
               <p> Login Page </p> 
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App
