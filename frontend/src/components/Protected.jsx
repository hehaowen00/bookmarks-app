import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';

import { AuthContext } from '../context/Auth';
import { verifyToken } from '../api/Auth';

function Protected({ children }) {
  const { auth, setToken } = useContext(AuthContext);
  const [status, setStatus] = useState(false);
  const nav = useNavigate();

  const load = useCallback(async () => {
    let token = sessionStorage.getItem('token');

    if (!token) {
      setStatus(true);
      return;
    }

    let resp = await verifyToken(token)

    if (!resp.error) {
      if (resp.unauthorized) {
        nav('/');
        return;
      }
      setToken(resp.username, token);
      setStatus(true);
    }

    setStatus(true);
  }, []);

  useEffect(() => {
    load();
  }, [])

  if (!status) {
    return (
      <>
      </>
    )
  }

  if (auth.allowed) {
    return children;
  } else {
    return (
      <Navigate to='/' />
    )
  }
}

export default Protected;
