import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function SessionLogout({ children, location }) {
  const history = useHistory();
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const handleOnIdle = (event) => {
    window.localStorage.clear();
    const excludedPaths = [
      "/",
      "/login",
      "/register/:inviteCode?",
      "/signup-otp",
      "/verify-otp",
      "/reset-password",
      "/changePassword",
      "/forget-password",
      "/privacy-policy",
      "/404",
      "/terms&condition",
    ];

    // Check if the current path is not in the excluded paths and the toast has not been displayed
    if (
      !excludedPaths.includes(window.location.pathname) &&
      !toastDisplayed
    ) { 
      toast.error("Session has expired.");
      setToastDisplayed(true);
      history.push("/login");
    }
  };

  const handleOnActive = (event) => {
    // Reset the toastDisplayed state when the user becomes active
    setToastDisplayed(false);
  };

  const handleOnAction = (event) => {};

  useIdleTimer({
    timeout: 1000 * 60 * 30, // 30 min.
    // timeout: 10000 , // 10 sec.
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return <div>{children}</div>;
}
