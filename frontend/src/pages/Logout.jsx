import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  });

  return (
    <Navigate to='/' />
  )
}

export default Logout;
