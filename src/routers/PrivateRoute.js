import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children, logged }) => {
    const location = useLocation();

    localStorage.setItem('lastPath', location.pathname + location.search);

    return logged ? children : <Navigate to="/auth" />
}
