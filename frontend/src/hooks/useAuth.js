import { useEffect, useState } from "react";
import {
  registerUser,
  checkAuth,
  setAuth,
  removeAuth,
  getAuth,
  loginUser,
} from "../api/api";

const useAuth = () => {
  const [currentAuth, setCurrentAuth] = useState();
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      setIsLoading(false);
      setIsAuthResolved(true);
      return;
    }

    checkAuth()
      .then((data) => {
        setCurrentAuth(data);
        setAuth(data);
      })
      .catch((error) => {
        console.error(error);
        setCurrentAuth(null);
        removeAuth(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleAuthSubmit = ({ username, password, isLogin }) => {
    setIsLoading(true);
    if (isLogin) {
      // login
      loginUser(username, password)
        .then((data) => {
          setCurrentAuth(data);
          setAuth(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      // register
      registerUser(username, password)
        .then((data) => {
          setCurrentAuth(data);
          setAuth(data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return {
    handleAuthSubmit,
    isAuthenticated: !!currentAuth,
    isLoading,
    isAuthResolved,
    currentAuth,
  };
};

export default useAuth;
