import { useEffect, useState } from "react";
import api from "../services/api.js";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const handleAuthentication = async () => {
            try {
                await api.get("/auth/me");
                setIsAuthenticated(true);
            } catch{
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }


        handleAuthentication()
    }, []);

    if (loading) {
        return <div>...Loading</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;

}

export default ProtectedRoute;