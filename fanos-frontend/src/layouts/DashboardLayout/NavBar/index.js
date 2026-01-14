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
import { IoLogOut  } from "react-icons/io5";
import { IoMdSwap,IoIosPaper } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaIdCard } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { BiShuffle, BiEdit } from "react-icons/bi";
import { CgLogIn} from "react-icons/cg";
import { ImHome3 } from "react-icons/im";
import { GiToken } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import LanguageIcon from "@material-ui/icons/Language";
import { RiExchangeFill } from "react-icons/ri";
import NavItem from "./NavItem";
import { AuthContext } from "src/context/Auth";



const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: ImHome3,
        href: "/dashboard",
      },
      {
        title: "My Wallet",
        icon: FaWallet,
        href: "/my-wallet",
      },
      // {
      //   title: "KYC",
      //   icon: FaIdCard,
      //   href: "/kyc",
      // },
      {
        title: "White Paper",
        icon: IoIosPaper,
        href: "/white-paper",
      },
      // {
      //   title: "Crypto Exchange",
      //   icon: LanguageIcon,
      //   href: "/echangeCrypto",
      // },
      // {
      //   title: "Stake Crypto",
      //   icon: AiFillShop,
      //   href: "/stakeCrypto",
      // },
      {
        title: "Buy Token",
        icon: GiToken,
        href: "/token",
        // href: "/Buytoken",
      },
      {
        title: "Referral",
        icon: FaPeopleArrows,
        href: "/referral",
        // href: "/Buytoken",
      },
      // {
      //   title: "P2P",
      //   icon: RiExchangeFill,
      //   // href: "/",
      //   href: "/p2p",
      // },
      {
        title: "Transaction History",
        icon: IoMdSwap,
        href: "/transaction-history",
      },
      {
        title: "Login History",
        icon: CgLogIn,
        href: "/login-history",
      },
      {
        title: "Referral Points",
        icon: FaPeopleArrows,
        href: "/refferal-points",
      },
      // {
      //   title: "My Account",
      //   icon: RiAccountCircleFill,
      //   href: "/token",
      //   items: [
      //     {
      //       title: "Edit Profile",
      //       icon: BiEdit,
      //       href: "/edit-profile",
      //     },
      //     // {
      //     //   title: "Banking",
      //     //   icon: AiFillBank,
      //     //   href: "/banking",
      //     //   // href: "/Buytoken",
      //     // },
      //     // {
      //     //   title: "Referral",
      //     //   icon: MdGroupAdd,
      //     //   href: "/referral",
      //     // },
          {
            title: "Change Password",
            icon: RiLockPasswordFill,
            href: "/changePassword",
          },
      //     {
      //       title: "Security",
      //       icon: MdSecurity,
      //       href: "/security",
      //     },
      //   ],
      // },
      // {
      //   title: "Logout",
      //   icon: IoLogOut,
      //   href: "/login",
      // },
      // {
      //   title: "Trade",
      //   icon: GiTrade,
      //   href: "/trade",
      // },
      // {
      //   title: "Bank Details",
      //   icon: FaUniversity,
      //   href: "/bank-details",
      // },

      // {
      //   title: "White Paper",
      //   icon: IoIosPaper,
      //   href: "/white-paper",
      // },

      // {
      //   title: "Currency",
      //   icon: FaMoneyBillAlt,
      //   href: "/currency",
      // },
      // {
      //   title: "Contact Us",
      //   icon: FaPhoneSquareAlt,
      //   href: "/contact-us",
      // },
    ],
  },
];
const sectionsBelow = [
  {
    items: [
      // {
      //   title: "Terms and Conditions",
      //   //icon: PieChartIcon,
      //   href: "/terms",
      // },
      // {
      //   title: "Logout",
      //   href: "/dashboard",
      //   icon: IoLogOut,
      // },
      // {
      //   title: "Privacy Policy",
      //   //icon: PieChartIcon,
      //   href: "/privacy-policy",
      // },
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
      padding: "10px",
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
    history.push("/login");
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
            onClick={() => history.push("/")}
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
          desc={"Do you want to logout ?"}
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
