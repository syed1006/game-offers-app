import {Navigate, Outlet } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ role }) => {
    const { auth } = useAuth();

    return (
        auth?.role === role
            ? <Outlet />
            : auth?.token
                ? <Navigate to="/unauthorized"/>
                : <Navigate to="/login"/>
    );
}

export default RequireAuth;