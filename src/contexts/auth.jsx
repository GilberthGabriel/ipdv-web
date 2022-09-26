import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storageData = localStorage.getItem('@App:data');
  const [authData, setAuthData] = useState(storageData ? JSON.parse(storageData) : null);

  const login = async (data) => {
    try {
      const res = await api.auth.login(data);
      setAuthData(res.data);
      localStorage.setItem('@App:data', JSON.stringify(res.data));
    } catch (e) {
      return false;
    }

    return true;
  };

  const refresh = async () => {
    try {
      if (new Date() > new Date(authData.refreshTokenExpiration * 1000)) {
        setAuthData(null);
        localStorage.removeItem('@App:data');
        return false;
      }

      const res = await api.auth.refresh({
        refresh_token: authData.refreshToken,
      });
      const tmpData = { ...authData, ...res.data };
      setAuthData(tmpData);
      localStorage.setItem('@App:data', JSON.stringify(tmpData));
      return tmpData.token;
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authData,
        signed: !!authData,
        login,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
