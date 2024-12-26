import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Loader from '../components/loader/loader';
import useAxiosPrivate from '../api/axios';

const PersistLogin = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axiosPrivate.get("/refresh", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    console.log("Token validated");
                    setIsAuthenticated(true);
                }
            } catch (error: any) {
                console.error("Token validation failed:", error.message);
                setIsAuthenticated(false);
                navigate("/login");
            }
            setIsLoading(false);
        };

        validateToken();
    }, [axiosPrivate, setIsAuthenticated, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }
    return <Outlet />

};

export default PersistLogin;
