import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, logged }) => {
    return !logged ? children : <Navigate to="/posts" />
}
