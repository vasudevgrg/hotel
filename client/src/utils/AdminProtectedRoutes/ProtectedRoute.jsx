import React, { useState } from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    const user = useSelector((state) => state.manageCurrUser);
    if(!user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    if(user.role=="traveller"){
        return <Navigate to="/accessdenied" state={{from: location}} replace/>
    }
 return children

};

export default ProtectedRoute;