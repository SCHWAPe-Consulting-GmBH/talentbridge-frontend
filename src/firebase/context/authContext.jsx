import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData, getUserPayment } from '@/firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      setUserInfo(getUserData(user.uid));
      setAttributes(JSON.parse(user.reloadUserInfo?.customAttributes));
      setPaymentData((await getUserPayment(user.uid)) ?? undefined);
    } else {
      setUserLoggedIn(false);
      setCurrentUser(null);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userInfo,
    userLoggedIn,
    loading,
    attributes,
    paymentData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
