import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as API from '../../constants/api';
import { toastAlertFail } from '../../utils/helperFn';

const AuthContext = createContext();


const getUser = () => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
}

function setCookieMethod(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  // const { data, isError } = useQuery("validateToken", getUser, {
  //   retry: false,
  // });
  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem('userInfo');

      if (storageUser) {
        console.log("🚀 ~ loadStorageData ~ storageUser:", storageUser)
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

  const Logout = (navigate) => {
    localStorage.setItem('userInfo', null);
    console.log("🚀 ~ Logout ~ localStorage.getItem('userInfo')", localStorage.getItem('userInfo'));
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ signed: localStorage.getItem('userInfo') ? true : false, user, loading, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
