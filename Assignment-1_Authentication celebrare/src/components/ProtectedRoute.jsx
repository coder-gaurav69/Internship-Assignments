import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({children}) => {

    const {user, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>
    }

    if(!user){
        return <Navigate to="/" />
    }
    return children
}


export default ProtectedRoute
