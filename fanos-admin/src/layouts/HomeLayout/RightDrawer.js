/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import { matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  List,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
import { useHistory } from "react-router-dom";
import ConfirmationDialog from "src/component/ConfirmationDialog";
import { AuthContext } from "src/context/Auth";

import {
  FaWallet,
  FaSignOutAlt,
  FaUserEdit,
  FaSignInAlt,
} from "react-icons/fa";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";

const sections = [
  {
    title: "My Profile",
    href: "/my-profile",
    icon: FaUserEdit,
  },

  {
    title: "Logout",
    href: "/dashboard",
    icon: FaSignOutAlt,
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 259,
  },
  desktopDrawer: {
    top: "30px",
    right: "43px",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    padding: "1px",
    overflow: "unset",
    position: "absolute",
    background: "#FFFFFF",
    borderRadius: "10px",
  },
  avatar: {
    cursor: "pointer",
    position: "absolute",
    right: "52px",
    zIndex: "1",
    width: 50,
    height: 53,
    backgroundColor:"transparent !important",
    // "@media (max-width: 767px)": {
    //   width: "30px",
    //   height: "30px",
    // },
  },
  avatarBig: {
    cursor: "pointer",
    width: 70,
    height: 70,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  name: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.02em",
    textAlign: "end",

    color: "#000000",
  },
  email: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    color: "#000000",
    textAlign: "end",
  },
  editButton: {
       color: "#000000",
       fontSize: "15px",
       fontStyle: "normal",
       fontFamily: "Poppins",
       fontWeight: "700",
       letterSpacing: "0.02em",
       justifyContent:"left"
  },
  userButton: {
    width: "143.21px",
    height: "44.7px",
    background: "#F2F5FA",
    borderRadius: "27px",
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: "50px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    // fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.02em",

    color: "#000000",

    // "& .downArrow":{
    //   // paddingLeft:"4px"
    // }
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [rightBar, setRightBar] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const confirmationHandler = () => {
    history.push("/");
    window.localStorage.removeItem("token");
    window.localStorage.clear();
    toast.success("Logged Off")
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Are you sure you want to logout?"}
          confirmationHandler={confirmationHandler}
        />
      )}

      {sections.map((section, i) => {
        const Icon = section.icon;
        return (
          <Box pt={1}>
            <Button
              className={classes.editButton}
              fullWidth
              key={i}
              onClick={() => {
                section.title === "Logout"
                  ? setOpen(true)
                  : history.push(section.href);
              }}
            >
              {section.title}{" "}
            </Button>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <>
      <Avatar
        className={classes.avatar}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      />

      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
