import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth";

// HOC component to protect routes
function PrivateRoute({Component}) {
  const { signed } = useAuth();

  return signed ? (
    Component
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
