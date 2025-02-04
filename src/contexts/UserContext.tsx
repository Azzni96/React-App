// UserContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { UserWithNoPassword } from 'hybrid-types/DBTypes';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, Credentials } from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserWithNoPassword | null>(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();

    // login, logout and autologin functions are here instead of components
    const handleLogin = async (inputs: Credentials) => {
      try {
        const loginResult = await postLogin(inputs as Credentials);
        console.log('doLogin result', loginResult);
        if (loginResult) {
          localStorage.setItem('token', loginResult.token); // Ensure this matches the key used in Logout
          navigate('/');
        }
      } catch (error) {
        console.error((error as Error).message);
        // Display error to user here(?)
      }
    };




    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            // TODO: if token exists, get user data from API
            if (token) {
                const userResponse = await getUserByToken(token);
                setUser(userResponse.user);
            }
            navigate('/');

            // TODO: set user to state
            // TODO: navigate to home
        } catch (e) {
            console.log((e as Error).message);
        }
    };
    useEffect(() => {
        handleAutoLogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };
