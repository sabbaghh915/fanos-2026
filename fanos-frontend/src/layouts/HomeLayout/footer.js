import React from "react";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import Scroll from "react-scroll";
import { Link as RouterLink, useHistory } from "react-router-dom";
import SettingsContext from "src/context/SettingsContext";

// Contains the value and text for the options

const ScrollLink = Scroll.Link;
const useStyles = makeStyles((theme) => ({
  colorFFF: {
    color: "#fff",
  },
  mainContainer: {
    "@media (max-width: 1280px)": {
      "& .MuiContainer-maxWidthLg": {
        maxWidth: "1500px",
      },
    },
  },
  footerSection: {
    background: "linear-gradient(180deg, #A78BFA 0%, #9333EA 10.18%, #7B2CBF 70.35%, #6D28D9 100%)",
    padding: "35px",
  },

  baseSection: {
    display: "flex",
    justifyContent: "center",
    "& p": {
      // fontFamily: "Poppins",
      // color: "#D0D3DC",
      // fontSize: "15px",
      // lineHeight: "26px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
    },
    "@media(max-width:565px)": {
      display: "flex",
      flexDirection: "column",
    },
  },

  textFeild: {
    fontFamily: "Poppins",
    backgroundColor: "#fff",
    boxShadow: "0px 35px 55px -12px rgba(57, 49, 117, 0.1)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "11px",
    borderRadius: "10px",
    "& input": {
      color: "#000 !important",
      paddingLeft: "10px",
    },
  },

  icon: {
    cursor: "pointer",
    color: "#fff",
    background: "#3C3C3C",
    marginRight: "10px",
    fontSize: "18px",
    padding: "6px",
    borderRadius: "25px",
    "& :hover": {
      color: "#FF6B35",
    },
  },
  agree: {
    marginTop: "8px",
  },

  bin: {
    color: theme.palette.text.primary,
  },

  textBtn: {
    fontFamily: "Poppins",
    color: "#fff",
    width: "160px",
    fontSize: "15px",
    padding: "10px 10px !important",

    background: "#8B5CF6",
    borderRadius: "10px",
    fontWeight: "500",
  },
  listbox: {
    background: "none",
    border: "none",
    margin: "0px",
    paddingTop: "10px",
    "& a": {
      fontFamily: "Poppins",

      display: "block",
    },
  },

  listName: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "13px",
    color: "#fff",
    gap: "10px",

    cursor: "pointer",
    listStyleType: "disc",
  },
  listNameContact: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "14px",
    color: "#fff",
    padding: "8px 0 !important",
    textDecorationLine: "none",
    cursor: "pointer",
    listStyleType: "disc",

    "& span": {
      fontSize: "13px",
      lineHeight: "20px",
    },
  },
  socialDiv: {
    width: "100%",
    maxWidth: "225px",
  },

  socialText: {
    fontFamily: "Poppins !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
    lineHeight: "17px !important",
    color: "#ffffff !important",
    paddingBottom: "0 !important",
  },
  socialImg: {
    display: "flex",
    gap: "10px",
    cursor: "pointer",
  },
  bannerBox: {
    width: "100%",
    "@media (min-width: 1280px)": {
      "& .MuiContainer-maxWidthLg": {
        maxWidth: "1600px",
      },
    },
  },
  selectNftInput: {
    marginTop: "20px",
    padding: "9px 19px",
    minWidth: "211px",
    height: "38px",
    fontFamily: "Poppins",
    border: "1px solid #fff",
    borderRadius: "50px",
    fontSize: "14px",
    color: "#fff",
    fontWeight: "400",
    background: "transparent",
    "& option": {
      background: "transparent",
    },
  },
  instasvg: {
    width: "30px",
    height: "30px",
    marginLeft: "3px",
  },
  divDropdown: {
    display: "flex",
    whiteSpace: "noWrap",
    border: "1px solid #FF6B35",
    borderRadius: "5px",
    width: "fit-content",
    "& .MuiMenu-paper": {
      top: "650px !important",
    },
  },
  logoBox: {
    paddingLeft: "16px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "8px",
    },
  },
  followus: {
    fontFamily: "Poppins",
    weight: "400",
    fontSize: "16px !important",
  },
  logBoxGrid: {
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
    },
  },
  followUsBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    // justifyContent: "center",
    paddingTop: "10px",
    [theme.breakpoints.down("md")]: {
      justifyContent: "left",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "left",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "left",
    },
  },
  iconsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: 'center',
    margin: '15px 0',

    "& img": {
      cursor: "pointer",
    },
  },

  headingBuy: {
    color: "#FFF !important",
    fontFamily: "Poppins !important",
    fontSize: "18px !important",
    fontWeight: " 700 !important",
  },
  contentContainer: {
    "& p": {
      color: "#FFF",
      fontSize: "14px",
      fontWeight: "400 !important",
      paddingTop: "10px",
      cursor: "pointer",
    },
  },
  footerText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: " 400 !important",
    opacity: "0.5",
  },
  typo: {
    color: "#FFF",
    fontSize: "14px",
    fontWeight: "400 !important",
  },

  contentConatiner: {
    display: 'flex',
    gap: "50px",
    justifyContent: "flex-end",
  },

  leftContentContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  googlePlayContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',

    "& img": {
      cursor: 'pointer',
    },
  },

  sellContainer: {

  },
  companyContainer: {

  },

  contactusContainer: {

  },


}));



export default function Liquidity() {
  const classes = useStyles();
  const history = useHistory();

  // useEffect(() => {
  //   const googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en",
  //         includedLanguages: "tr,en,ar",
  //         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
  //       },
  //       "google_translate_element"
  //     );
  //   };

  //   if (window.google && window.google.translate) {
  //     googleTranslateElementInit();
  //   } else {
  //     const script = document.createElement("script");
  //     script.src = "//translate.google.com/translate_a/element.js";
  //     script.async = true;
  //     script.onload = googleTranslateElementInit;
  //     document.body.appendChild(script);
  //   }
  // }, []);
  const themeSeeting = React.useContext(SettingsContext);

  function handleClick() {
    // window.scrollTo({
    //   top: document.getElementById("hypertrade").offsetTop,
    //   behavior: "smooth",
    // });
    history.push("/learn-to-sell");
  }

  const handleEmailClick = () => {
    const recipientEmail = "support@classified.com";
    const subject = "";
    const body = "";

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };
  const handleLocationClick = () => {
    const latitude = 36.44591; // Replace with the actual latitude
    const longitude = 34.31368; // Replace with the actual longitude

    const locationUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;

    window.open(locationUrl);
  };

  return (
    <Box className={classes.footerSection} id="footer-section">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} >
          <Box className={classes.leftContentContainer}>


            <Box className={classes.logoBox}>
              <Box>
                {themeSeeting.settings.theme === "DARK" ? (
                  <>
                    <img
                      src=""
                      alt=""
                      width="100%"
                      style={{
                        width: "100%",
                        maxWidth: "202px",
                        // margin: "17px auto",
                        cursor: "pointer",
                      }}
                      onClick={() => history.push("/")}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src="/images/logo.svg"
                      height={60}
                      width={60}
                      alt=""
                      style={{
                        width: "100%",
                        maxWidth: "150px",
                        // margin: "17px auto",
                        cursor: "pointer",
                      }}
                      onClick={() => history.push("/")}
                    />
                  </>
                )}
              </Box>{" "}
              <Box pt={1}>

                <Box className={classes.iconsContainer}>
                  <a
                    href="https://www.facebook.com/profile.php?id=61550835017278"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img alt="img" src={"images/facebook_logo.png"} />
                  </a>
                  <a href="https://twitter.com/fanos6506" target="_blank" rel="noreferrer">
                    <img alt="img" src={"images/twitter_logo.png"} />
                  </a>
                  <a href="https://www.instagram.com/fanos6506/" target="_blank" rel="noreferrer">
                    <img alt="img" src={"images/instagram_logo.png"} />
                  </a>
                </Box>

                <Box className={classes.googlePlayContainer}>
                  <a href="https://play.google.com" target="_blank" rel="noreferrer">  <img alt="img" src={"images/googlePlay.svg"} /></a>
                  <a href="https://www.apple.com" target="_blank" rel="noreferrer">  <img alt="img" src={"images/applestore.svg"} /></a>

                </Box>

              </Box>
            </Box>

          </Box>

        </Grid>
        <Grid item xs={12} sm={6} md={9} className={classes.rightGridItem}>
          <Box className={classes.contentConatiner}>


            <Box className={classes.sellContainer}>
              <Typography variant="h3" className={classes.headingBuy}>
                Sell
              </Typography>

              <List className={classes.listbox}>
                <RouterLink
                  className="advance-feature"
                  style={{
                    textDecoration: "none",
                    color: "#7B838F",
                  }}
                >
                  <ScrollLink
                    className=""
                    smooth={true}
                    duration={500}
                    to="hypertrade"
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/create-ads")}
                  >
                    <ListItem className={classes.listName}>
                      {" "}
                      <Typography>Start selling</Typography>
                    </ListItem>
                  </ScrollLink>
                </RouterLink>
                <ListItem className={classes.listName} onClick={handleClick}>
                  Learn to sell
                </ListItem>
              </List>
              <ListItem
                className={classes.listNameContact}
                onClick={() => history.push("/Privacypolicy1")}
              >
                Privacy policy1
              </ListItem>
            </Box>

            <Box className={classes.companyContainer}>
              <Typography variant="h3" className={classes.headingBuy}>
                Company
              </Typography>
              <List className={classes.listbox}>
                <ListItem
                  className={classes.listName}
                  onClick={() => history.push("/about-us")}
                >
                  About Us
                </ListItem>
              </List>{" "}
              <ListItem
                className={classes.listNameContact}
                onClick={() => {
                  history.push("/faq");
                }}
              >
                FAQ's
              </ListItem>
              <ListItem
                className={classes.listNameContact}
                onClick={() => history.push("/terms-and-conditions")}
              >
                Terms & Conditions
              </ListItem>
              <ListItem
                className={classes.listNameContact}
                onClick={() => history.push("/Privacypolicy")}
              >
                Privacy policy
              </ListItem>
             
            </Box>

            <Box className={classes.contactusContainer}>
              <Typography variant="h3" className={classes.headingBuy}>
                Contact Us
              </Typography>
              <List className={classes.listbox}>
                <RouterLink
                  className="hovertext"
                  style={{
                    textDecoration: "none",
                    color: "#7B838F",
                  }}
                >
                  <ListItem className={classes.listName}>
                    {" "}
                    <img alt="img" src="images/lock.svg" />{" "}
                    <Typography
                      className={classes.typo}
                      onClick={() => {
                        handleLocationClick();
                      }}
                    >
                      {" "}
                      Wisconsin Ave, Suite 700 Chevy Chase, Maryland 20815
                    </Typography>
                  </ListItem>
                </RouterLink>
                <RouterLink
                  className="hovertext"
                  style={{ cursor: "pointer", color: "#7B838F" }}
                >
                  <ListItem className={classes.listName}>
                    <img alt="img" src="images/mail.svg" />{" "}
                    <Typography
                      className={classes.typo}
                      onClick={() => {
                        handleEmailClick();
                      }}
                    >
                      support@classified.com
                    </Typography>
                  </ListItem>
                </RouterLink>

                <RouterLink
                  className="hovertext"
                  style={{ cursor: "pointer", color: "#7B838F" }}
                >
                  <ListItem className={classes.listName}>
                    <img alt="img" src="images/contact.svg" />{" "}
                    <Typography className={classes.typo}>
                      +1 800 854-36-80
                    </Typography>
                  </ListItem>
                </RouterLink>
              </List>
            </Box>

          </Box>

        </Grid>

      </Grid>

      { <Grid container style={{ padding: "0px 0px 27px 0px" }}>
                    <Grid item xs={12}>
                      <Box className={classes.baseSection}>
                        <Typography
                          variant="body1"
                          className={classes.footerText}
                        >
                          © 2023 Gilo Fanos | All Rights Reserved
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid> }

      {/* <Grid container spacing={5}>
        <div style={{}} className={classes.divDropdown}>
          <div id="google_translate_element"></div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: "9999",
            }}
          >
            <div id="google_translate_element"></div>
          </div>
          <img src="images/lang.svg" style={{ paddingLeft: "10px" }} />
          <p style={{ paddingLeft: "20px" }}>Language :</p>
        </div>
      </Grid> */}
    </Box>
  );
}
