import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft } from "src/views/auth/otpVerify/timer";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("token", accessToken);

    axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};



export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [endTime, setEndtime] = useState();
  const [isLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  function checkLogin(token) {
   if(token){

   }
   else{
    return false
   }
  
  }
  useEffect(()=>{
    const token = window.localStorage.getItem("token")
    checkLogin(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[window.localStorage.getItem("token")])
 
  let data = {
    userLoggedIn: isLogin,
    setEndtime,
    setTimeLeft,
    isLoading,
    timeLeft,
    userLogIn: (data, type) => {
      setSession(data);
      setIsLogin(type);
    },
  };
  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );}
