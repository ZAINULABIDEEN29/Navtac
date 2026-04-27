import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ authorized = false }) => {
    const { state } = useUser();

    // If route requires authentication (authorized = true)
    if (authorized) {
        return state.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
    }

    // If route is for guest only (authorized = false, e.g. Login, Register)
    return !state.isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;