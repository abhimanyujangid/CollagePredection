import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHook";
import { LocalStorage } from "@/utils";
import { ROUTES } from "./Route";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = LocalStorage.get('accessToken');

    useEffect(() => {
        if (!accessToken) {
            console.log('No access token found');
            // Redirect to login page if user is not authenticated
            navigate('/auth');
        }
    }, [isAuthenticated, navigate, location]);

    return isAuthenticated ? children : null;
};

export default ProtectedRoutes;