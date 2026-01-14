import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import MyDetail from "./myDetail";
import ManageAddress from "./manageAddress";
import Language from "./language";
import OrderHistory from "./orderHistory";
import HelpSupport from "./helpSupport";
import { FiSettings } from "react-icons/fi";
import Drawer from "@material-ui/core/Drawer";
import { Link } from 'react-router-dom';
import clsx from "clsx";
import TopBar from "src/layouts/HomeLayout/TopBar";
import Footer from "src/layouts/HomeLayout/footer";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  list: {
    width: 250,
    padding: "42px 20px",
  },
  mainbox: {
    paddingTop: "21px",
    paddingBottom: "95px",
    minHeight: "358px",
  },
  heading: {
    color: "#0C576C",
    fontSize: "16.183px",
    fontWeight: "400 !important",
  },

  headingBox: {
    display: "flex",
    justifyContent: "space-between",
    "& .setting-icon": {
      color: "#D39B2D",
      fontSize: "25px",
      cursor: "pointer",
      "@media(min-width:992px)": {
        display: "none",
      },
    },
  },

  desktop: {
    marginTop: "20px",

    "@media(max-width:991px)": {
      display: "none",
    },
  },

  mobile: {
    "@media(min-width:992px)": {
      display: "none",
    },
  },

  label: {
    color: "#0C576C",
    fontSize: "18px",
    fontWeight: "400 !important",
    cursor: "pointer",
  },
  activeLabel: {
    color: "#0C576C",
    fontSize: "18px",
    fontWeight: "500 !important",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "26px 18px",
  },

  gridItemLeft: {
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    height: "600px",
  },
}));

export default function (props) {
  const classes = useStyles();
  const [setting, setSetting] = useState("My Details");
  const [state, setState] = React.useState(false);

  const handleSetting = (value) => {
    setSetting(value);
  };
  // drawer functions

  const handleDrawerClose = () => {
    setState(false);
  };
  const handleListItemClick = () => {
    handleDrawerClose();
  };
  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <List>
        <ListItem
          onClick={() => {
            handleSetting("My Details");
            handleListItemClick();
          }}
          className={
            setting === "My Details" ? classes.activeLabel : classes.label
          }
        >
          My Details
        </ListItem>
        <ListItem
          onClick={() => {
            handleSetting("Manage Address");
            handleListItemClick();
          }}
          className={
            setting === "Manage Address" ? classes.activeLabel : classes.label
          }
        >
          Manage Address
        </ListItem>
        {/* <ListItem
                  onClick={() => {handleSetting("language"); handleListItemClick();}}
                  className={
                    setting == "language" ? classes.activeLabel : classes.label
                  }
                >
                  Language
                </ListItem> */}
        <ListItem
          onClick={() => {
            handleSetting("Order History");
            handleListItemClick();
          }}
          className={
            setting === "Order History" ? classes.activeLabel : classes.label
          }
        >
          Order History
        </ListItem>
        <ListItem
          onClick={() => {
            handleSetting("Help & Suport");
            handleListItemClick();
          }}
          className={
            setting === "Help & Suport" ? classes.activeLabel : classes.label
          }
        >
          Help & Support
        </ListItem>
      </List>
    </div>
  );
  return (
    <>
    {/* <TopBar/> */}
      <Box className={classes.mainbox}>
        <Box className={classes.headingBox}>
          <Typography className={classes.heading}>
            <Link to="/" className={classes.heading}>
              Home
            </Link>
            {">"} Settings {">"} {setting}{" "}
          </Typography>
          <FiSettings onClick={() => setState(true)} className="setting-icon" />
        </Box>

        {/* desktop */}
        <Grid container className={classes.desktop}>
          <Grid item xs={3} className={classes.gridItemLeft}>
            <List className={classes.listContainer}>
              <ListItem
                onClick={() => handleSetting("My Details")}
                className={
                  setting == "My Details" ? classes.activeLabel : classes.label
                }
              >
                <ListItemIcon>
                  <img src="images/listUser.svg" alt="list icon" />
                </ListItemIcon>
                My Details
              </ListItem>
              <ListItem
                onClick={() => handleSetting("Manage Address")}
                className={
                  setting == "Manage Address"
                    ? classes.activeLabel
                    : classes.label
                }
              >
                <ListItemIcon>
                  <img src="images/listAddress.svg" alt="list icon" />
                </ListItemIcon>
                Manage Address
              </ListItem>
              {/* <ListItem
                  onClick={() => handleSetting("language")}
                  className={
                    setting == "language" ? classes.activeLabel : classes.label
                  }
                >
                  Language
                </ListItem> */}
              <ListItem
                onClick={() => handleSetting("Order History")}
                className={
                  setting == "Order History"
                    ? classes.activeLabel
                    : classes.label
                }
              >
                <ListItemIcon>
                  <img src="images/listOrder.svg" alt="list icon" />
                </ListItemIcon>
                Order History
              </ListItem>
              <ListItem
                onClick={() => handleSetting("Help & Suport")}
                className={
                  setting == "Help & Suport"
                    ? classes.activeLabel
                    : classes.label
                }
              >
                <ListItemIcon>
                  <img src="images/listUser.svg" alt="list icon" />
                </ListItemIcon>
                Help & Support
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={9} className={classes.gridItemRight}>
            {setting == "My Details" && <MyDetail />}
            {setting == "Manage Address" && (
              <ManageAddress setSetting={setSetting} />
            )}
            {setting == "language" && <Language />}
            {setting == "Order History" && <OrderHistory />}
            {setting == "Help & Suport" && <HelpSupport />}
          </Grid>
        </Grid>

        {/* mobile && tab */}
        <Grid
          className={classes.mobile}
          container
          style={{ marginTop: "53px" }}
        >
          <Grid item xs={12}>
            {setting == "My Details" && <MyDetail />}
            {setting == "Manage Address" && (
              <ManageAddress setSetting={setSetting} />
            )}
            {setting == "language" && <Language />}
            {setting == "Order History" && <OrderHistory />}
            {setting == "Help & Suport" && <HelpSupport />}
          </Grid>
        </Grid>
      </Box>

      <Drawer anchor={"right"} open={state} onClose={handleDrawerClose}>
        {list("anchor")}
      </Drawer>
      {/* <Footer/> */}
    </>
  );
}
