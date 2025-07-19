import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [token,setToken] = useState(null)
  const provider = new GoogleAuthProvider();
  const userSignUp = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignin = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  const userSignout = () => {
    setLoader(true);
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoader(false)
        setUser(currentUser);
        setToken(currentUser?.accessToken)
      }
      else{
        setLoader(false)

      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const userAuth = {
    user,
    userSignUp,
    userLogin,
    userSignout,
    googleSignin,
    loader,
    token
  };
  return <AuthContext value={userAuth}>{children}</AuthContext>;
};

export default AuthProvider;
