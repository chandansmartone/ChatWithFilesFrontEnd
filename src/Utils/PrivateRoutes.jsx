// PrivateRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvide';
const PrivateRoutes = () => {

    const { isAuthenticated } = useAuth();
    

    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;