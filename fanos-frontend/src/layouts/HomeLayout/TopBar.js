import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Dialog,
  Divider,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import Login from "src/views/auth/LogIn";
import Register from "src/views/auth/register";
import OtpVerify from "src/views/auth/otpVerify";
import Forgot from "src/views/auth/forgot";
import moment from "moment";
import Reset from "src/views/auth/resetPassword";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import "./styles.css";
import OtpVerifyRegister from "src/views/auth/otpVerifyRegister";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F3E8FF",
    position: "unset !important",
    paddingTop: "15px",
  },
  siteLogo: {
    cursor: "pointer",
    width: "158px",
    height: "57px",
    paddingTop: "7px",
    minWidth: "60px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "40px",
      width: "100px",
    },
  },
  toolbar: {
    // height: 70,
    // marginTop: "-22px",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  upperHeader: {
    height: 44,
    paddingLeft: "100px",
    paddingRight: "14px",

    "@media(max-width:1114px)": {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  upperHeader1: {
    overflowX: "scroll",

    "@media(max-width:1114px)": {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  secondHeader: {
    width: "100%",
    background: "#8B5CF6",
  },
  TextBox: {
    borderRadius: "6px",
    background: theme.palette.background.taf,
    height: "42px",
    paddingRight: "27px !important",
    paddingLeft: "27px !important",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "8px !important",

      width: "88%",
    },
    "&.MuiInputBase-root": {
      fontFamily: "Poppins !important",
    },
    "& .MuiInputBase-input": {
      padding: "8px 0 7px !important",
    },
  },
  searchItem: {
    height: "42px",

    position: "absolute",
    cursor: "pointer",
    top: "0px",
  },
  locationButton: {
    background: "none",
    border: "none",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "14px",
    color: "#6D28D9",
  },
  searchFieldBox: {
    width: "100%",
    maxWidth: "691px",
    "& input:-webkit-autofill": {
      "-webkit-background-clip": "text !important",
      "-webkit-text-fill-color": "black !important",
    },
  },
  searchButton: {
    background: "#FF6B35",
    borderRadius: "5px",
    border: "none",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "14px",
    minWidth: "105px",
    color: "#fff",
    width: "100%",

    height: "42px",
    cursor: "pointer",
  },
  createAddsTopBar: {
    background: "#FF6B35",
    borderRadius: "5px",
    border: "none",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "14px",
    minWidth: "105px",
    color: "#fff",
    width: "100%",
    marginTop:'10px',
    height: "42px",
    cursor: "pointer",
  },
  rightSidebarBox: {
    display: "flex",
    gap: "20px",
  },
  createAdsBox: {
    // "@media(max-width: 1207px)": {
    //   display: "none",
    // },
    width: "100%",
    maxWidth: "151px",
  },
  iconDiv: {
    display: "flex",
    justifyContent: "space-around",
    cursor: "pointer",
    alignItems: "center",
    "@media(max-width: 1207px)": {
      display: "none",
    },
  },
  iconDivNoti: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    //  gap: "10px",
    cursor: "pointer",
    maxWidth: "204px",
    height: "54px",
    borderRadius: "8px",
    background: "rgba(211, 155, 45, 0.30)",
    width: "100%",

    "@media(max-width:1204px)":{
      display:'none',
    },
  },
  myWishlistContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  myAccountContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  notificIcon: {
    width: "26px",
    height: "27px",
    minWidth: "31px",
  },
  notificIconBefore: {
    height: "32px",
    width: "26px",
    minWidth: "31px",
  },
  chatIcon: {
    // paddingTop: "4px",
    height: "27px",
    width: "26px",
    minWidth: "31px",
  },
  iconDivTop: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "end",
  },
  menu: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    color: "#6D28D9",
    whiteSpace: "nowrap",
  },
  signIn: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "14px",
    color: "#FF6B35",
    cursor: "pointer",
    textTransform: "none",
    padding: "0px",
    textDecoration: "underline",
  },
  register: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "14px",
    color: "#FF6B35",
    cursor: "pointer",
    padding: "0px",
  },
  dropdownContent: {
    display: "none",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    zindex: "1",
  },
  dialog: {
    maxHeight: "700px",
    "& .MuiDialog-paper": {
      position: "absolute !important",
      right: "96px !important",
      top: "100px !important",
      maxWidth: "430px",
      overflowX: "hidden",
      height: "538.96px",
      borderRadius: "6.754px",
      [theme.breakpoints.up("xs")]: {
        width: "-webkit-fill-available",
        height: "-webkit-fill-available",
        right: "0px !important",
      },
    },
  },
  dialogTopHeader: {
    "& .MuiDialog-paper": {
      position: "absolute !important",
      right: "-13px !important",
      top: "10px !important",
      width: "125px",

      height: "25%",
      background: "rgb(12, 87, 108)",
    },
  },
  notify: {
 
    color: '#8B5CF6',
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 600,
  },
  notiMain: {
    color: '#242424',
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 300,
    wordBreak:'break-word !important',
    [theme.breakpoints.down("xs")]: {
      fontSize: "14.2094px",
    },
  },
  notiSub: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 400,
  },
  notiDate: {
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 400,
    textAlign: "end",
  },
  typoDelete: {
    textAlign: "end",
    textDecoration: "underline",
    cursor: "pointer",
 
    // fontFamily: "Poppins",
    fontStyle: "normal",
    // fontWeight: "600",
    fontSize: "13.5079px",
    lineHeight: "20px",
    color: "#FF0000",
    [theme.breakpoints.down("md")]: {
      fontWeight: "900",
    },
    [theme.breakpoints.down("sm")]: {
      fontWeight: "900",
    },
    [theme.breakpoints.down("xs")]: {
      fontWeight: "900",
    },
  },
  category: {
    color: "#fff",
    fontSize: "14px",
    minWidth: "70px",
    wordBreak: "normal",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
      minWidth: "50px",
    },
  },
  imageNotify: {
    height: "70px",
    width: "70px",
    borderRadius: "50%",
    fontSize: "11px",
    [theme.breakpoints.down("xs")]: {
      height: "50px",
      width: "50px",
    },
  },
  searchButtonDisabled: {
    color: "#fff",
    width: "100%",
    border: "none",
    cursor: "pointer",
    height: "42px",
    minWidth: "105px",
    fontSize: "14px",
    background: "#FF6B35",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "14px",
    borderRadius: "5px",
  },
  dialogContent: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "560px !important",
      top: "0px",
      width: "100%",
      background: "#7B2CBF",
      minHeight: "260.71px !important",
      height: "auto",
      borderRadius: "14.7507px",
      // maxHeight:"192px",
      // maxWidth:"442px"
      // "@media(min-width:320px) and (max-width:460px)":{
      //   width: "100%",
      //   minHeight:"80px",
      // },
    },
  },
  logoutTypo: {
    // paddingTop: "30px",

    fontSize: "22.5513px",
    lineHeight: "40px",
    textAlign: "center",

    color: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "17.5513px !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "19.5513px !important",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "22.5513px",
    },
  },
  logoutTypo1: {
    paddingTop: "20px",
    wordBreak: "break-word !important",
    fontSize: "22.5513px",
    lineHeight: "40px",
    textAlign: "center",

    color: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14.5513px !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "19.5513px !important",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "22.5513px",
    },
  },
  gridButtons: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "35px",
    gap: "10px",
  },
  yesButton: {
    height: "45px",
    width: "100%",
    color: "#6D28D9",
    fontSize: "18px",
    fontWeight: "900 !important",
    minWidth: "150px",
    background: "#FF6B35",
    borderRadius: "7.37537px",
    "@media(min-width:320px) and (max-width:460px)": {
      width: "100%",
      minWidth: "80px",
      fontSize: "14px",
    },
  },
  noButton: {
    width: "100%",
    minWidth: "150px",
    fontSize: "18px",
    fontWeight: "900 !important",
    height: "45px",
    border: "1.47507px solid #FF6B35",
    borderRadius: " 7.37537px",
    "@media(min-width:320px) and (max-width:460px)": {
      width: "100%",
      minWidth: "80px",
      fontSize: "14px",
    },
  },
  carousel: {
    position: "sticky !important",
    paddingTop: "15px",

    overflow: "hidden",
    "& .css-1l7c0cy": {
      background: "#8B5CF61f",
    },
  },
  topHeaderClass: {
    display: "flex",
    justifyContent: "end",
  },
  list: {
    width: 250,
    padding: "42px 20px",
  },
  listTopDrawer: {
    padding: "20px 20px",
  },
  drawerHeader: {
    "& .MuiDrawer-paperAnchorRight": {
      background: "#8B5CF6",
    },
    "& .MuiDrawer-paperAnchorTop": {
      background: "#8B5CF6",
    },
  },
  drawerHeaderLeft: {
    "& .MuiDrawer-paperAnchorLeft": {
      background: "#8B5CF6",
      // top: `${topPosition}px`,

      overflowY: "scroll",

      height: "-webkit-fill-available",
    },
  },
  arrowImg: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    color: "#fff",
  },
  gridItemCenter: {
    display: "flex",
    alignItems: "center",
  },
  searchbox: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "7px",
  },

  searchItemField: {
    fontFamily: "Poppins !important",
    "&.MuiInputBase-input": {
      "&::placeholder": {
        fontFamily: "Poppins !important",
      },
    },
    "&.MuiFormControl-root": {
      marginTop: "0px !important",
      minWidth: "70px",
    },
    "& input:-webkit-autofill": {
      "-webkit-background-clip": "text !important",
      "-webkit-text-fill-color": "black !important",
    },
    "&::placeholder": {
      fontFamily: "Poppins !important",
    },
  },

  topBarBox: {
    display: "flex",
    width: "100%",
    background: "linear-gradient(90deg, #A78BFA 0%, #9333EA 10.18%, #7B2CBF 70.35%, #6D28D9 100%)",
    alignItems: "center",
    padding: "27px 45px",
    justifyContent: "space-evenly",
    flexShrink: 0,

    "@media (max-width:1400px)": {  
      gap: '20px',
    },

    [theme.breakpoints.down("xs")]: {
      padding: "15px 12px",
      gap: "20px",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      // justifyContent: "space-around",
      gap: "20px",
    },
    [theme.breakpoints.down("md")]: {
      // justifyContent: "space-around",
      gap: "20px",
    },
  },
  categBox: {
    display: "flex",
  },
  categdrop: {
    cursor: "pointer",
    minHeight: "12px",
    minWidth: "12px",
  },
  subCategoryDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    minWidth: "200px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    padding: "8px 0",
    zIndex: 1000,
    marginTop: "5px",
  },
  subCategoryItem: {
    color: "#242424",
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Poppins",
    padding: "8px 15px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      background: "#F3E8FF",
      color: "#8B5CF6",
    },
  },
  productsNavBar: {
    width: "100%",
    background: "#F3E8FF",
    padding: "12px 45px",
    borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
    display: "block",
    flexShrink: 0,
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px",
    },
  },
  productsNavContainer: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "15px",
      justifyContent: "flex-start",
    },
  },
  productNavItem: {
    cursor: "pointer",
  },
  productNavItemText: {
    color: "#8B5CF6",
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "Poppins",
    padding: "5px 0",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    "&:hover": {
      color: "#6D28D9",
      fontWeight: "600",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  searchIconTopBar: {
    display: "flex",
    alignItems: "center",
  },
  Searchicon: {
    color: "#fff",
    background: "gray",
    borderRadius: "6px",
    padding: "5px",
  },
  chatTooltip: {
    display: "flex",
    alignItems: "center",
  },
  NotiClose: {
    textAlign: "end",
    paddingTop: "5px",
    maxHeight: "42px",
    position: "fixed",
    right: "34px",
  },
  NotificData: {
    display: "flex",
    gap: "20px",

    padding: "5px 35px 5px 0",
    alignItems: "center",
  },
  notifidetails: {
    width: "100%",
    maxWidth: "330px",
  },
  notifiDuration: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifiBox: {
    backgroundColor: "#F4F4F4",
    padding:'20px'
  },

  iconImage: {
    cursor: "pointer",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpOpenRegister, setOtpOpenRegister] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [topHeader, setTopHeader] = useState(false);

  const handleDialogHeader = () => {
    setTopHeader(true);
  };

  const handleDrawerClose = () => {
    setTopHeader(false);
  };

  const handleListItemClick = () => {
    handleDrawerClose();
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isHeaderVisible = screenWidth >= 300 && screenWidth <= 1204;

  const handleLoginModal = () => {
    setLoginOpen(!loginOpen);
  };

  const handleForgotModal = () => {
    setForgotOpen(!forgotOpen);
    // setLoginOpen(false);
  };

  const handleLogoutModal = () => {
    setLogout(false);
    setIsLoading(false);
  };

  const handleRegisterModal = () => {
    setRegisterOpen(!registerOpen);
  };
  const handleOtpModal = () => {
    setOtpOpen(!otpOpen);
    setForgotOpen(false);
    setRegisterOpen(false);
  };
  const handleOtpClose = () => {
    setOtpOpen(false);
  };
  const handleOtpModalRegister = () => {
    setOtpOpenRegister(!otpOpenRegister);
    setForgotOpen(false);
    setRegisterOpen(false);
  };
  const handleOtpCloseRegister = () => {
    setOtpOpenRegister(false);
  };
  const handleLogout = () => {
    setIsLoading(true);

    localStorage.clear();
    sessionStorage.clear();
    if (localStorage.getItem("token") === null) {
      setIsLoading(false);

      toast.success("Logout Successfully.");
      history.push("/");
      handleLogoutModal();
    }
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };
  const handleResetModal = () => {
    setResetModal(!resetModal);
    setOtpOpen(false);
  };
  const [name, setName] = useState("");
  useEffect(() => {
    setName(window.localStorage.getItem("name"));
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.localStorage.getItem("name")]);

  const getCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listCategory,
        params: {
          type: "PRODUCT",
          limit: 40,
        },
      });
      if (res.data.responseCode === 200) {
      }
    } catch (error) {}
  };

  const onChat = () => {
    toast.warn("Please sign in");
  };

  const createAds = () => {
    toast.warn("Please sign in");
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <Box style={{ textAlign: "end" }}>
        <CloseIcon
          onClick={() => {
            setTopHeader(false);
          }}
          style={{ color: "#fff", cursor: "pointer" }}
        />
      </Box>
      {localStorage.getItem("token") && (
        <>
          <Grid item md={3} align="initial">
            <Button
              style={{
                cursor: "pointer",
                color: "#fff",
                whiteSpace: "nowrap",
                fontSize: "16px",
              }}
              onClick={() => {
                history.push("/ads");
                handleListItemClick();
              }}
            >
              My Ads
            </Button>
          </Grid>

          <Grid item md={3} align="initial">
            <Button
              mt={2}
              style={{
                cursor: "pointer",
                color: "#fff",
                whiteSpace: "nowrap",
                fontSize: "16px",
              }}
              onClick={() => {
                history.push("/wishlist");
                handleListItemClick();
              }}
            >
              My Wishlist
            </Button>
          </Grid>
          <Grid item md={3} align="initial">
            {" "}
            <Button
              style={{
                cursor: "pointer",
                color: "#fff",
                whiteSpace: "nowrap",
                fontSize: "16px",
              }}
              mt={2}
              onClick={() => {
                history.push("/settings");
                handleListItemClick();
              }}
            >
              My Account
            </Button>
          </Grid>
        </>
      )}
      <Box className={classes.createAdsBox}>
        {localStorage.getItem("token") ? (
          <Button
            onClick={() => history.push("/create-ads")}
            className={classes.createAddsTopBar}
            startIcon={<img src="images/plus_icon.svg" alt="start icon" />}
          >
            Create Ads
          </Button>
        ) : (
          <Button
            onClick={() => createAds()}
            className={classes.searchButtonDisabled}
            startIcon={<img src="images/plus_icon.svg" alt="start icon" />}
          >
            Create Ads
          </Button>
        )}
        {localStorage.getItem("token") ? (
          <>
            <button
              onClick={() => {
                history.push("/chat-history");
              }}
              className={classes.createAddsTopBar}
            >
              Chat us
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onChat()}
              className={classes.searchButtonDisabled}
            >
              Chat us
            </button>
          </>
        )}
      </Box>
    </div>
  );

  return (
    <>
      <AppBar
        className={clsx(classes.root, className)}
        color="default"
        {...rest}
      >
        <Box className={classes.upperHeader}>
          <Grid container spacing={3}>
            <Grid item sm={3} xs={3} style={{ whiteSpace: "nowrap" }}>
              {name ? (
                <Box>
                  {" "}
                  Hi!{" "}
                  <span className={classes.signIn}>
                    {name.length <= 15
                      ? name.slice(0, 15)
                      : name.slice(0, 15) + "..."}
                  </span>{" "}
                  <Button
                    style={{ color: "#000" }}
                    // onClick={() => handleLogout()}
                    onClick={() => setLogout(true)}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Box>
                  {" "}
                  Hi!{" "}
                  <Button className={classes.signIn} onClick={handleLoginModal}>
                    Sign in
                  </Button>{" "}
                  or{" "}
                  <Button
                    className={classes.register}
                    onClick={handleRegisterModal}
                  >
                    Register
                  </Button>{" "}
                </Box>
              )}
            </Grid>
            <Grid item sm={9} xs={9} md={9} className={classes.topHeaderClass}>
              {isHeaderVisible ? (
                <>
                  <Grid item>
                    <Box className={classes.iconDivTop}>
                      <img
                        src="images/menu.svg"
                        onClick={handleDialogHeader}
                        style={{ height: "40px" }}
                        alt="img"
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  {localStorage.getItem("token") && (
                    <Grid item sm={8}>
                      <Grid
                        container
                        spacing={2}
                        style={{ justifyContent: "end" }}
                      >
                        <Grid item md={3} align="center"></Grid>
                        <Grid item md={3} align="center">
                          <Button
                            style={{ cursor: "pointer", color: "#000" }}
                            onClick={() => history.push("/ads")}
                          >
                            My Ads
                          </Button>
                        </Grid>
                        <Grid item md={3} align="center">
                          <Button
                            mt={2}
                            style={{ cursor: "pointer", color: "#000" }}
                            onClick={() => history.push("/wishlist")}
                          >
                            My Wishlist
                          </Button>
                        </Grid>
                        <Grid item md={3} align="center">
                          <Link to="/settings">
                            {" "}
                            <Button
                              style={{ cursor: "pointer", color: "#000" }}
                              mt={2}
                            >
                              My Account
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>

        
          <>
            <Box>
              {" "}
              <Toolbar className={classes.toolbar} id="sidebar">
                <TopBarData />
              </Toolbar>
            </Box>

            <Drawer
              anchor={"right"}
              open={topHeader}
              onClose={handleDrawerClose}
              className={classes.drawerHeader}
            >
              {list("anchor")}
            </Drawer>
          </>
        
      </AppBar>

      <Login
        handleLoginModal={handleLoginModal}
        handleForgotModal={handleForgotModal}
        handleRegisterModal={handleRegisterModal}
        open={loginOpen}
        closeLog={closeLogin}
      />
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleOtpModal={handleOtpModalRegister}
        open={registerOpen}
      />
      <Forgot
        handleLoginModal={handleLoginModal}
        handleForgotModal={handleForgotModal}
        handleOtpModal={handleOtpModal}
        open={forgotOpen}
      />
      <OtpVerify
        handleLoginModal={handleLoginModal}
        handleOtpModal={handleOtpModal}
        handleResetModal={handleResetModal}
        open={otpOpen}
        otpClose={handleOtpClose}
      />
      <OtpVerifyRegister
        handleLoginModal={handleLoginModal}
        handleOtpModalRegister={handleOtpModalRegister}
        open={otpOpenRegister}
        otpCloseRegister={handleOtpCloseRegister}
      />

      <Reset
        handleResetModal={handleResetModal}
        handleLoginModal={handleLoginModal}
        open={resetModal}
      />

      <Dialog
        open={logout}
        onClose={handleLogoutModal}
        className={classes.dialogContent}
      >
        <Box style={{ padding: "35px" }}>
          {" "}
          <Typography className={classes.logoutTypo}>Confirm</Typography>
          <Typography className={classes.logoutTypo1}>
            Are you sure you want to logout?
          </Typography>
          <Grid container className={classes.gridButtons}>
            <div>
              <Button
                className={classes.yesButton}
                disabled={isloading}
                onClick={() => handleLogout()}
              >
                Yes
                {isloading && <ButtonCircularProgress />}
              </Button>
            </div>

            <div>
              <Button
                className={classes.noButton}
                onClick={() => handleLogoutModal()}
              >
                No
              </Button>
            </div>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [stateOpen, setStateOpen] = useState(false);
  const [dataNotify, setDataNotify] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [topHeaderItem, setTopHeaderItem] = useState(false);
  const [showFullBody, setShowFullBody] = useState(false);

  const handleClickViewMore = () => {
    setShowFullBody(!showFullBody);
  };
  const handleTopDrawerClose = () => {
    setTopHeaderItem(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHeaderVisibleTop = screenWidth >= 100 && screenWidth <= 700;

  useEffect(() => {
    getAllNotifications();
    if (window.location.pathname !== "/search") {
      user.setSearchText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotification = () => {
    setStateOpen(true);
  };


  const handleClose = () => {
    setStateOpen(false);
  };

  const getAllNotifications = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.getAllNotification,
        headers: {
          token: token,
        },
      });

      if (res?.data?.responseCode === 200) {
        setDataNotify(res?.data?.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const clearAllNotifications = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.clearAllNotification,
        headers: {
          token: token,
        },
      });

      if (res?.data?.responseCode === 200) {
        toast.success(res?.data?.responseMessage);
        getAllNotifications();
      }
    } catch (error) {}
  };
  const handleSearch = (e) => {
    user.setSearchText(e.target.value);
  };
  const getSearchProduct = async (limit, location) => {
    const res = await user.getSearchProduct(limit, user.searchText, location);
    let searchValue = user.searchText;
    try {
      if (res.data.responseCode === 200) {
        history.push({
          pathname: "/search",
          search: `?name=${searchValue}`,
          state: searchValue,
        });
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      history.push({
        pathname: "/search",
        search: `?name=${searchValue}`,
        state: searchValue,
      });
      if (error.response) {
        toast.error("Error");
      }
    }
  };

  const onChat = () => {
    toast.warn("Please sign in");
  };

  const createAds = () => {
    toast.warn("Please sign in");
  };

  function handleKeyDownSearch(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      if (user?.searchText?.length === 0) {
        history.push("/");
      } else {
        getSearchProduct();
      }
    }
  }
  const listTop = () => {
    return (
      <>
        <div className={clsx(classes.listTopDrawer)} role="presentation">
          <Box style={{ textAlign: "end" }}>
            <CloseIcon
              onClick={() => {
                setTopHeaderItem(false);
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            />
          </Box>

          <Box className={classes.rightSidebarBox}>
            <Box className={classes.searchbox}>
              {" "}
              <TextField
                type="text"
                fullWidth
                id="searchInput"
                inputProps={{ maxLength: 256 }}
                value={user?.searchText}
                className={classes.searchItemField}
                placeholder="Search for anything"
                onChange={(e) => handleSearch(e)}
                onKeyDown={handleKeyDownSearch}
                InputProps={{
                  className: classes.TextBox,
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/images/search.svg" alt="img" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <div className="dropdown"></div>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              {" "}
              <button
                onClick={() => {
                  if (user?.searchText?.length === 0) {
                    history.push("/");
                    setTopHeaderItem(false);
                  } else {
                    getSearchProduct();
                    setTopHeaderItem(false);
                  }
                }}
                className={classes.searchButton}
              >
                Search
              </button>
            </Box>
          </Box>
        </div>
      </>
    );
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box className={classes.topBarBox}>
        <Box>
          <img
            onClick={() => history.push("/")}
            src="/images/logo.svg"
            alt="Logo"
            className={classes.siteLogo}
          />{" "}
        </Box>


        {isHeaderVisibleTop ? (
          <>
            <Box className={classes.searchIconTopBar}>
              <SearchIcon
                className={classes.Searchicon}
                onClick={() => {
                  setTopHeaderItem(!topHeaderItem);
                }}
              />
            </Box>
          </>
        ) : (
          <>
            {topHeaderItem ? setTopHeaderItem(false) : null}

            <Box className={classes.searchFieldBox}>
              {" "}
              <TextField
                type="text"
                fullWidth
                id="searchInput"
                inputProps={{ maxLength: 256 }}
                value={user?.searchText}
                className={classes.searchItemField}
                placeholder="Search By Category , Product Name"
                onChange={(e) => handleSearch(e)}
                onKeyDown={handleKeyDownSearch}
                InputProps={{
                  className: classes.TextBox,
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/images/search.svg" alt="img" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <div className="dropdown"></div>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* <Box>
              {" "}
              <button
                onClick={() => {
                  if (user?.searchText?.length === 0) {
                    history.push("/");
                  } else {
                    getSearchProduct();
                  }
                }}
                className={classes.searchButton}
              >
                Search
              </button>
            </Box> */}
          </>
        )}

        {
          <Box className={classes.createAdsBox}>
            {" "}
            {localStorage.getItem("token") ? (
              <Button
                onClick={() => history.push("/create-ads")}
                className={classes.searchButton}
                startIcon={<img src="images/plus_icon.svg" alt="start icon" />}
              >
                Create Ads
              </Button>
            ) : (
              <Button
                onClick={() => createAds()}
                className={classes.searchButtonDisabled}
                startIcon={<img src="images/plus_icon.svg" alt="start icon" />}
              >
                Create Ads
              </Button>
            )}
          </Box>
        }

        {
          <Box className={classes.iconDivNoti}>
            {!localStorage.getItem("token") ? (
              <>
                <img
                  src="/images/bell.svg"
                  alt="img"
                  onClick={() => onChat()}
                  className={classes.notificIcon}
                />
              </>
            ) : (
              <>
                {dataNotify?.length > 0 ? (
                  <>
                    <img
                      src="/images/bell.svg"
                      onClick={() => handleNotification()}
                      alt="img"
                      className={classes.notificIconBefore}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src="/images/bell.svg"
                      alt="img"
                      onClick={() => handleNotification()}
                      className={classes.notificIcon}
                    />
                  </>
                )}
              </>
            )}
            {!localStorage.getItem("token") ? (
              <>
                <img
                  src="images/newWishlist.svg"
                  alt="wishlist"
                  onClick={() => history.push("/wishlist")}
                  className={classes.iconImage}
                />
              </>
            ) : (
              <>
                <img
                  src="images/newWishlist.svg"
                  alt="wishlist"
                  onClick={() => history.push("/wishlist")}
                  className={classes.iconImage}
                />
              </>
            )}
            {!localStorage.getItem("token") ? (
              <>
                <img
                  src="images/newUser.svg"
                  alt="user"
                  className={classes.iconImage}
                />
              </>
            ) : (
              <>
                <img
                  src="images/newUser.svg"
                  alt="user"
                  className={classes.iconImage}
                  onClick={() => {
                    history.push("/settings");
                   }}
              
                />
                {/* <Typography
                  onClick={() => {
                    history.push("/settings");
                    // handleListItemClick();
                  }}
                >
                  My Profile
                </Typography> */}
              </>
            )}
             {!localStorage.getItem("token") ? (
              <tooltip title="Sign in to Chat" className={classes.chatTooltip}>
                <img
                  src="/images/chaticon.svg"
                  onClick={() => onChat()}
                  alt="img"
                  className={classes.chatIcon}
                />
              </tooltip>
            ) : (
              <img
                src="/images/chaticon.svg"
                alt="img"
                onClick={() => {
                  history.push("/chat-history");
                }}
                className={classes.chatIcon}
              />
            )}
          </Box>
        }
      </Box>


      {/* Products Navigation Bar */}
      <Box className={classes.productsNavBar}>
        <Box className={classes.productsNavContainer}>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/view-product")}
            >
              Suggest Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/view-BestPriceProducts")}
            >
              Best Price Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/best-for-you-products")}
            >
              Best For You Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/great-price-products")}
            >
              Great Price Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/featured-products")}
            >
              Featured Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/popular-product")}
            >
              Popular Products
            </Typography>
          </Box>
          <Box className={classes.productNavItem}>
            <Typography
              className={classes.productNavItemText}
              onClick={() => history.push("/recent-product")}
            >
              New Products
            </Typography>
          </Box>
        </Box>
      </Box>

      <Dialog open={stateOpen} onClose={handleClose} className={classes.dialog}>
        <Box className={classes.notifiBox}>
          
          <Box  style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Typography className={classes.notify}>Notifications</Typography>
            <img
              src="images/Close.png"
              alt="img"
              onClick={() => handleClose(true)}
              style={{ cursor: "pointer" }}
            />
            {isloading && <ButtonCircularProgress style={{ color: "red" }} />}
          </Box>

          {dataNotify.length > 0 ? (
            <>
              {dataNotify.map((data) => {
                return (
                  <>
                    <Box className={classes.NotificData}>
                      <Box>
                        <img
                          src={
                            data.imageUrl ? data.imageUrl : "images/notify.svg"
                          }
                          alt={data.imageUrl ? "image" : "No image"}
                          className={classes.imageNotify}
                        />
                      </Box>
                      <Box className={classes.notifidetails}>
                        <Typography className={classes.notiMain}>
                          <span style={{ color: "#000", fontWeight: "500" }}>
                            {data.title}
                          </span>{" "}<br/>
                          {/* {data.body <= 40
                            ? data.body
                            : data.body } */}
                            {data.body &&
                                data.body.length > 25
                                ? showFullBody
                                  ? data.body
                                  : data.body.slice(0, 25) +
                                  "......."
                                : data.body || "--"} 
                              {data.body &&
                                data.body.length > 25 && (
                                  <Button
                                    style={{
                                      color: showFullBody
                                        ? "#004e63"
                                        : "#8B5CF6",
                                      //border: showFullCategoryName ? '1px solid red' : '1px solid blue',
                                    }}
                                    className={classes.ViewMoreLink}
                                    onClick={handleClickViewMore}
                                  >
                                    {showFullBody
                                      ? "View Less"
                                      : "View More"}
                                  </Button>
                                )}

                        </Typography>
                        <Box className={classes.notifiDuration}>
                          <Typography className={classes.notiSub}>
                            {data.currentDay ? data.currentDay : "--"}{" "}
                            {moment(data.currentTime).format("LT")}
                          </Typography>

                          <Typography className={classes.notiDate}>
                            {moment(data.updatedAt).format("MMM DD, YYYY")}
                          </Typography>
                        </Box>
                      </Box>

                    </Box>
                    <Divider/>
                  </>
                );
              })}
              <Box pr={2} pt={2}>
                <Typography
                  className={classes.typoDelete}
                  onClick={() => clearAllNotifications()}
                >
                  Clear All
                </Typography>
              </Box>
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "80px" }}>
              <img
                style={{ width: "202px" }}
                src="images/DataNotFound.svg"
                alt="NO data found"
              />
            </div>
          )}
        </Box>
      </Dialog>
      
      <Drawer
        anchor={"top"}
        open={topHeaderItem}
        onClose={handleTopDrawerClose}
        className={classes.drawerHeaderLeft}
        style={{
          overflowY: "scroll",
          height: "-webkit-fill-available",
        }}
      >
        {listTop("anchor")}
      </Drawer>
    </Box>
  );
}
