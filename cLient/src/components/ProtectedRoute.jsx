import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(user);

  // Check role access
  if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
    // Agar role allow nahi hai to usko apne home page bhej do
    return parsedUser.role === "admin"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
