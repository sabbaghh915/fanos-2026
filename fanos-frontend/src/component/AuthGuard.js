import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";



export default function AuthGuard(props) {
  const { children } = props;



  const token = window.localStorage.getItem("token");
  useEffect(() => {
   
  }, [token]);
  if (!window.localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
