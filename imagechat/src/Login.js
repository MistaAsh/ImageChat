import React from "react";
import { useDispatch } from "react-redux";

import GoogleIcon from '@mui/icons-material/Google';

import "./Login.css";
import { auth, db, provider } from "./firebase";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth.signInWithPopup(provider).then(result => {
      dispatch(
        login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid,
        })
      )
    }).catch(error => alert(error.message));
  };

  return (
    <div className = "login">
      <div className = "login-container" onClick = {signIn}>
        <GoogleIcon className = "login-google" />
        <p> Sign in with Google </p>
      </div>
    </div>
  );
}

export default Login;