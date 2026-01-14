import { Box, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SettingsContext from "src/context/SettingsContext";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  imgSection: {
    "& img": {
      // maxWidth: "230px",
      width: "90px",
      // height:"68px",
      innerHeight: "90px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },

    "@media(max-width:991px)": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      // margin: "0 auto",
    },
  },
}));
const Logo = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = useContext(SettingsContext);

  return (
    <Box className={classes.imgSection}>
      {themeSeeting.settings.theme === "DARK" && (
        <img
          onClick={() => history.push("/")}
          src="/images/logo.png"
          alt="Logo"
          style={{ cursor: "pointer" }}
          {...props}
        />
      )}
      {themeSeeting.settings.theme === "LIGHT" && (
        <img
          onClick={() => history.push("/")}
          src="/images/logo.svg"
          alt="Logo"
          style={{ cursor: "pointer" }}
          {...props}
        />
      )}
    </Box>
  );
};

export default Logo;
