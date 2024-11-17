// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // Check local storage for a token; if not found, return null
        return localStorage.getItem('access_token') || null;
    });;

    const login = (userToken) => {
        setToken(userToken); // This should set the token correctly
        localStorage.setItem('access_token', userToken); // Optionally save in localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('access_token'); // Clear the token from localStorage
    };
   
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
