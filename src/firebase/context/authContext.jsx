import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      setUserLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }

  const value = { currentUser, userLoggedIn, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
