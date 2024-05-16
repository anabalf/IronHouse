import { createContext, useState, useEffect } from "react";
import { getProfile, login, logout } from "../services/api.services";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function fetchProfile() {
        const response = await getProfile()
            setUser(response.data);
    }

    useEffect(() => {
        fetchProfile()
    }, []);

    async function doLogin(data) {
        await login(data);
        fetchProfile();
    }

    function doLogout() {
        setUser(null);
        logout();
        navigate('/login');
    }


    const value = {
        user,
        doLogin,
        doLogout
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export default AuthContext;