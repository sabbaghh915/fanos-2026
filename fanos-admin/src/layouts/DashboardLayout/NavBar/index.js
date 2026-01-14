/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import ConfirmationDialog from "src/component/ConfirmationDialog";

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import { FaWallet, FaSignOutAlt, FaPeopleArrows } from "react-icons/fa";
import NavItem from "./NavItem";
import { AuthContext } from "src/context/Auth";

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: "images/Dashboard.svg",
        href: "/dashboard",
      },
      {
        title: "User Management",
        icon: "images/User.svg",
        href: "/user-management",
      },

      {
        title: "Static Content",
        icon: "images/Static content.svg",
        href: "/static-content-management",
      },
      {
        title: "Website Settings",
        icon: "images/website.svg",
        href: "/website-settings",
      },
      {
        title: "Category",
        icon: "images/categories.svg",
        href: "/token",
        items: [
          {
            title: "Category",
            href: "/category-management",
          },
          {
            title: "Sub Category",
            href: "/sub-category-management",
          },
        ],
      }, 
      {
        title: "Products Management",
        icon: "images/products.svg",
        href: "/product-management",
      },
      {
      title:"Help & Support",
      href:"/help-and-support",
      icon: "images/help.svg",
      },
     
      {
        title: "Notifications",
        icon: "images/bell.svg",
        href: "/notifications",
      },
      {
        title: "Banner Management",
        icon: "images/Banner.svg",
        href: "/banner-management",
      },
      {
        title:"Coupon Management",
        icon:"images/coupon.svg",
        href:"/Coupon-Management",
      },
      {
        title: "Advertisement Management",
        icon: "images/advertisement1.svg",
        href: "/advertisement-management",
        items: [
          {
            title: "All Advertisements",
            href: "/advertisement-management",
          },
          {
            title: "Advertisement Type 1",
            href: "/advertisement-management-type1",
          },
          {
            title: "Advertisement Type 2",
            href: "/advertisement-management-type2",
          },
        ],
      },
      {
        title: "Change Password",
        icon: "images/password.svg",
        href: "/changePassword",
      },
      {
        title: "Payment Management",
        icon: "images/payment.svg",
        href: "/payment-Management",
        items:[
          {
            title:"All Payments",
            href:"/payment-Management"
          },
          {
            title:"Added Ads",
            href:"/added-ads"
          },
          {
            title:"Product Purchased",
            href:"/payment-product-purchased"
          },
        ]
      },
      {
        title: "Report User Mangement",
        icon: "images/form4.svg",
        href: "/report-user",
      },
    ],
  },
];

const sectionsBelow = [
  {
    items: [
    ],
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
    width: 256,
    // background: "#fff",
    background: theme.palette.background.taf,
    boxShadow: " 0 0.1rem 0.7rem rgb(0 0 0 / 10%)",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    // background: "#fff",
    background: `${theme.palette.background.taf} !important`,

    boxShadow: " 0 0.1rem 0.7rem rgb(0 0 0 / 10%)",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: `${theme.palette.text.primary} !important`,
  },

  Terms: {
    color: theme.palette.text.primary,

    // padding: "17px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    borderLeft: "solid 8px transparent",
    borderRadius: 0,
    fontSize: "13px",
    "& .MuiButton-label": {
      padding: "20px",
      position:"relative",
      right:"15px",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#fff !important",
        background: "#3A96DD",
        padding: "10px",
        borderRadius: "9px",
        fontWeight: theme.typography.fontWeightRegular,
        "& $title": {
          fontWeight: theme.typography.fontWeightMedium,
          // color: `${theme.palette.text.primary} !important`,
        },
        "& $icon": {
          color: "#fff !important",
          // color: "00e0b0",
        },
      },
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium,
        // color: `${theme.palette.text.primary} !important`,
      },
    },
  },

  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const auth = useContext(AuthContext);

  const confirmationHandler = () => {

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
    history.push("/");
    window.localStorage.clear();
  };
  const history = useHistory();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location?.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className="srollBoxNav"
      style={{ overflowY: "auto" }}
    >
      <Hidden mdDown>
        <Box
          mb={-1}
          display="flex"
          justifyContent="center"
          // alignItems="center"
        >
          <Logo
            onClick={() => history.push("/dashboard")}
            alt="Logo"
            style={{
              paddingTop: "10px",

              cursor: "pointer",
              width: "106px",
            }}
          />
        </Box>
      </Hidden>
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Logout"}
          desc={"Are you sure you want to logout?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#fff" }}
        />
      )}
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box my={3}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location?.pathname,
              })}
            </List>
          ))}
          <Box style={{ height: "100px !important" }}>
            {/* <ChartList height="38%" /> */}
          </Box>
        </Box>

        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {section.items.map((itemList, i) => {
                return (
                  <Button
                    fullWidth
                    key={i}
                    className={classes.Terms}
                    style={{
                      justifyContent: "start",
                      marginTop: "-23px",
                      // paddingLeft: 36,
                      borderRadius: 0,
                      fontSize: "13px",
                      textTransform: "capitalize",
                    }}
                    // onClick={() => history.push(itemList.href)}
                    onClick={() => {
                      itemList.title === "Logout"
                        ? setOpen(true)
                        : history.push(itemList.href);
                    }}
                  >
                    <FaSignOutAlt
                      style={{ fontSize: "15px" }}
                      className={classes.icon}
                    />
                    {itemList.title}
                  </Button>
                );
              })}

              {/* {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })} */}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
