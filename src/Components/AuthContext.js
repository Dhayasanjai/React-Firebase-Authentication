import { useState } from 'react';

import React, { useContext, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signUpHandler(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function logInHandler(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logOut() {
    return auth.signOut();
  }
  function forgotPassWordHandler(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function resetPassWordHandler(password) {
    return currentUser.updatePassword(password);
  }
  const resetEmailHandler = (email) => {
    return currentUser.updateEmail(email);
  };

  const value = {
    currentUser,
    signUpHandler,
    logInHandler,
    logOut,
    forgotPassWordHandler,
    resetEmailHandler,
    resetPassWordHandler,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
