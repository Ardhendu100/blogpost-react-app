import React from 'react'
import { Navigate,Outlet } from "react-router-dom";
function ProtectedRoute(props) {
    const user=props.userState
    // const change=props.isChange
      return user?<Outlet />:<Navigate to='/login' />
     }


export default ProtectedRoute