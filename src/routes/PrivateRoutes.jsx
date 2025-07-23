import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import LoadingSpiner from '../components/loadingSpiner/LoadingSpiner';

const PrivateRoutes = ({children}) => {
    const {user,loader} = useAuth();
    if(loader){
        return <LoadingSpiner></LoadingSpiner>
    }
    if(!user){
        return <Navigate to={'/auth/login'} state={location.pathname} replace></Navigate>
    }
    return children
};

export default PrivateRoutes;