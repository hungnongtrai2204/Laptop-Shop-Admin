import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = window.localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute;