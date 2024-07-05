import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosHeaderValue} from 'axios';
import {createContext, useEffect, useState} from 'react';

const AuthContext = createContext({});

const configureAxiosHeaders = (
  token: AxiosHeaderValue,
  msg: AxiosHeaderValue,
) => {
  axios.defaults.headers['X-Auth-Token'] = token;
  axios.defaults.headers['X-Auth-Message'] = msg;
};

const AuthProvider = ({children}: any) => {
  const [auth, setAuthState] = useState<null | {}>(null);

  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        configureAxiosHeaders(authData.token, authData.msg);
        setAuthState(authData);
      }
    } catch (error) {
      setAuthState({});
    }
  };

  const setAuth = async (auth: any) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(auth));
      configureAxiosHeaders(auth.token, auth.msg);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
