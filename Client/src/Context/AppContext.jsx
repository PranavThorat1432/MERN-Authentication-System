import axios from "axios";
import React, { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState(null);

    const getAuthStatus = async () => {
        try {
            const {data} = await axios.get(backendURL + '/api/user/is-auth', { withCredentials: true })

            if(data.success) {
                setIsLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
            const res = await axios.get(backendURL + '/api/user-details/data', { withCredentials: true });
            const data = res.data;
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAuthStatus();
    }, [])

    const value = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}