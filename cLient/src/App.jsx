import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBlog from "./pages/AddBlog";
import ShowBlog from "./pages/ShowBlog";
import AdminDashboard from "./pages/AdminDashboard"; // <-- bana lena

function App() {
  return (
    <>
      <Routes>
       
        <Route element={<Layout />}>
          {/* User accessible routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-blog"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/show-blog"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <ShowBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
