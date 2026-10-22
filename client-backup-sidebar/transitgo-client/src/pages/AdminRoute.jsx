import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) return <Navigate to="/login" replace />;

    if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}

export default AdminRoute;