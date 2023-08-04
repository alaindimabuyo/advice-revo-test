import { useState, useEffect } from 'react';
import localforage from 'localforage';


export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    localforage.getItem<string>('authToken').then((token) => {
    
      if (token) {
        console.log(token)
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  const login = (token: string) => {
    localforage.setItem('authToken', token).then(() => {
      setAuthenticated(true);
    });
  };

  const logout = () => {
    localforage.removeItem('authToken').then(() => {
      setAuthenticated(false);
    });
  };

  return { authenticated, login, logout };
};
