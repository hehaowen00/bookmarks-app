import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  let [auth, setAuth] = useState({
    allowed: false,
    token: '',
    username: '',
  });

  const setToken = async (username, token) => {
    sessionStorage.setItem('token', token);
    setAuth({ allowed: true, token, username, });
  };

  const logout = () => {
    sessionStorage.clear('token');
    setAuth({ allowed: false, token: '', username: '' });
  }

  return (
    <AuthContext.Provider value={{ auth, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
