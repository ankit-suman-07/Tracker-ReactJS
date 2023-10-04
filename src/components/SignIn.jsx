"use client"

import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { logIn, logOut } from "../redux/features/auth-slice";
import { useDispatch } from "react-redux";

import "../css/SignIn.css";


export default function SignIn(props) {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      props.setUser(user);
      user && setUserLoggedIn(user);
      user && dispatch(logIn({ username: user.displayName }));
    });
  }, [dispatch, props]);

  const signIn = () => {
    signInWithPopup(auth, provider);

  }
  const signOut = () => {
    auth.signOut();
    dispatch(logOut());
  }

  return (
    <div className="signin-comp" >
      {
        userLoggedIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={signIn}>Sign In</button>

      }
    </div>
  );
}
