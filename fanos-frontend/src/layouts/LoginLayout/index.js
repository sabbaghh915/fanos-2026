import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Box,

} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import SettingsContext from "src/context/SettingsContext";
import { FaRegMoon } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  content: {
    height: "649px",
    width: "100%",

    overflowY: "auto",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "33px",
    paddingTop: "17px",
    paddingBottom: "27px",
    color: theme.palette.text.primary,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      margin: "40px 0 40px 0",
    },
    "&::-webkit-scrollbar-thumb": {
      background:
        "linear-gradient(180deg, rgba(207, 167, 238, 0.8) 0%, rgba(44, 0, 169, 0.8) 100%);",
    },
  },
  left: {
    height: "100%",
    "@media(max-width:959px)": {
      display: "none",
    },
  },

  mainbox: {
    height: "100%",
    padding: "0rem",
    paddingBottom: "0px",
    marginTop: "25px",
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  logoImage: {
    position: "absolute",
    zIndex: "1",
    top: "20px",
    maxWidth: "225px",
    cursor: "pointer",
    "@media(max-width:1279px)": {
      display: "none",
    },
  },
  mainScreen: {
    maxWidth: "100%",
    /* background-repeat: no-repeat; */
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(207, 167, 238, 0.8) 0%, rgba(44, 0, 169, 0.8) 100%)",
    padding: "90px",
    "@media (max-width: 916px)": {
      padding: "16px",
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = React.useContext(SettingsContext);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };

  return (
    <Box>
      <Grid container className={classes.mainScreen}>
        <Grid item xs={12} >
          <Box className={classes.content}>{children}</Box>
        </Grid>
       
      </Grid>
    </Box>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
