import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { GlobalContext } from '../Global/GlobalState';

const ProtectedRoute = ({children}) => {

    const {user, loading} = useContext(GlobalContext);

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>
    }

    if(!user){
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute
