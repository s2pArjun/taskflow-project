import { createContext, useContext, useState, useCallback } from 'react';
import { setAuthToken, clearAuthToken } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Token lives in React state — never written to localStorage
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    setAuthToken(jwt); // inject into axios interceptor
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearAuthToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
