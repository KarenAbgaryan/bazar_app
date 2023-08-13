import React, { useState } from "react";
import { githubLogo, googleLogo } from "../assets";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = e => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            image: user.photoURL,
            email: user.email,
            name: user.displayName,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
        // console.log(user);
      })
      .catch(error => console.log(error.message));
  };

  const handleGithubLogin = e => {
    e.preventDefault();
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        dispatch(
          addUser({
            _id: user.uid,
            image: user.photoURL,
            email: user.email,
            name: user.reloadUserInfo.screenName,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
        // console.log(user);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-32">
      <div
        onClick={handleGoogleLogin}
        className="text-base w-60 h-12 flex items-center justify-center gap-2 border-[1px] border-gray-400 rounded-md tracking-wide hover:border-blue-600 cursor-pointer duration-300"
      >
        <img className="w-8" src={googleLogo} alt="googleLogo" />
        <span className="text-sm text-gray-900">Sign in with Google</span>
      </div>
      <div onClick={handleGithubLogin} className="text-base w-60 h-12 flex items-center justify-center gap-2 border-[1px] border-gray-400 rounded-md tracking-wide hover:border-blue-600 cursor-pointer duration-300">
        <img className="w-8" src={githubLogo} alt="googleLogo" />
        <span className="text-sm text-gray-900">Sign in with Github</span>
      </div>
    </div>
  );
};

export default Login;
