import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from '@/firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      setUserInfo(getUserData(user.uid));
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      setUserLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }
  const changeFinancialSupport = (value) => {
    setIsFinancialSupport(value);
  };

  const value = {
    currentUser,
    userInfo,
    userLoggedIn,
    loading,
    isFinancialSupport,
    changeFinancialSupport,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
