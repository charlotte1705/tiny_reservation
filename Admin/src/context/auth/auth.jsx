import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from 'react-router-dom';
import * as API from '../../constants/api';
import { toastAlertFail } from '../../utils/helperFn';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

function setCookieMethod(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem('userInfo');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const Login = async (data, navigate) => {
    axios
      .post(API.DASHBOARD, data, { withCredentials: true })

      .then((res) => {
        console.log(res);
        if (res.data.data) {
          setUser(res.data.data.userInfo);
          setCookieMethod('accessToken', res.data.data.accessToken, 1);

          localStorage.setItem(
            'userInfo',
            JSON.stringify(res.data.data.userInfo)
          );
          navigate('/dashboard');
        }
      })

      .catch((error) => {
        navigate('/');
        toastAlertFail('Login failed. Please contact to admin.');
        console.log(
          '🚀 ~ file: login-body.component.jsx ~ line 68 ~ submitLogin ~ error',
          error
        );
      });
  };

  const Logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
