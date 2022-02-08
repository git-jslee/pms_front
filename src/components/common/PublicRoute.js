import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isLogin from '../../modules/common/isLogin';

const PublicRoute = () => {
  console.log('##isLogin##', isLogin());
  return isLogin() ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
