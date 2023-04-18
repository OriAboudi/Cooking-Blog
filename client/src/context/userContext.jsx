import { useContext, useState } from "react";
import { createContext } from "react";
import { TOKEN_KEY, USER_INFO } from "../constant/constant";
import { apiGet } from "../services/services";


const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    
    //when user is  logged in the system
    const getUser = async () => {
        try {
            let data = await apiGet(USER_INFO);
            console.log(data);
            setUser(data.data);

        } catch (error) {
            console.log(error.response);
        }
        
    }
    // when user logout
    const logout = async () => {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null);
    }
    
    const value = { user, setUser, logout, getUser };
    
    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export const MyUsers = () => {
    return useContext(UsersContext)
} 