import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistToken = (nextToken) => {
    if (nextToken) {
      localStorage.setItem('token', nextToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(nextToken);
  };

  const fetchProfile = async () => {
    if (!localStorage.getItem('token')) {
      setUser(null);
      return null;
    }

    const response = await api.get('/api/users/me');
    setUser(response.data.data);
    return response.data.data;
  };

  const register = async (payload) => {
    const response = await api.post('/api/auth/register', payload);
    const { token: nextToken, user: nextUser } = response.data.data;
    persistToken(nextToken);
    setUser(nextUser);
    return response.data;
  };

  const login = async (payload) => {
    const response = await api.post('/api/auth/login', payload);
    const { token: nextToken, user: nextUser } = response.data.data;
    persistToken(nextToken);
    setUser(nextUser);
    return response.data;
  };

  const logout = () => {
    persistToken(null);
    setUser(null);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (token) {
          await fetchProfile();
        }
      } catch (error) {
        persistToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout,
      fetchProfile,
      setUser
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
