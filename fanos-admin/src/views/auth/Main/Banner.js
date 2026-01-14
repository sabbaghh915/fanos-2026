import {
  Container,
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  Hidden,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import CookieConsent from "react-cookie-consent";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GrCircleInformation } from "react-icons/gr";
import InfoIcon from "@material-ui/icons/Info";
import ApiConfig from "../../../config/APICongig";
import Axios from "axios";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "150px 0px 90px",
    backgroundImage: `url(${"/images/bannerBack.png"})`,
    backgroundRepeat: "round",

    "@media(max-width:991px)": {
      padding: "100px 0px 0px !important",
    },
    " & span": {
      fontWeight: "600",
    },
    "& .textleft": {
      "& h3": {
        fontFamily: "Poppins",
        fontSize: "40.3166px",
        fontWeight: "400",
        marginBottom: "8px",
        lineHeight: "66px",
        color: "#000000",

        [theme.breakpoints.down("md")]: {
          fontSize: "40px",
          lineHeight: "60px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "35px",
          lineHeight: "45px",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "30px",
          lineHeight: "37px",
        },
      },
      "& h4": {
        fontFamily: "Poppins",
        fontSize: "18px",
        fontWeight: "300",
        marginBottom: "35px",
        width: "100%",
        textAlign: "justify",
        maxWidth: "648px",
        color: theme.palette.text.BannerText,
        maxWidth: "500px",
        lineHeight: "27px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "16px",
        },
      },
      "& h6": {
        fontFamily: "Poppins",
        fontSize: "18px",
        fontWeight: "600",
        lineHeight: "40px",
        color: theme.palette.text.BannerText,
      },
      "& h2": {
        fontFamily: "Poppins",
        fontSize: "20px",
        // background:"linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        background: "#0047AB",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
      },
    },

    [theme.breakpoints.down("sm")]: {
      padding: "65px 0px 50px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "33px 0px 30px",
    },
  },

  bannerImage: {
    display: "flex",
    alignItems: "center",
  },
  flexbox: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    "@media(max-width:959px)": {
      justifyContent: "left",
      display: "block",
    },
  },
  bannerSpan: {
    fontFamily: "Poppins",
    color: "#0C576C ",
  },

  iconBox: {
    position: "fixed",
    bottom: "66px",
    right: "3px",
    zIndex: "11111",
  },
  subtile: {
    alignItems: "center",
    color: "#060606",

    "& h5": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "17.0486px",
      lineHeight: "31px",
      letterSpacing: "0.180486px",
      color: "#060606",
    },

    " & .subtile1": {
      paddingLeft: "40px",
      "@media(max-width:512px)": {
        paddingLeft: "0px",
      },
    },
  },

  buttonbox: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "10px",
    width: "57%",

    height: "46px",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "14px",
      marginTop: "0px",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "14px",
      maxWidth: "112px",
      marginTop: "0",
    },
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "46px",

  },
}));

function Banner() {
  const classes = useStyles();
  const history = useHistory();
  const [ShowTopBtn, setShowTopBtn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setLoader] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const handleclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formInitialSchema = {
    email: "",
  };
  const subscribe = async (values) => {
    setIsLoading(true)
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.subscribeToNewsLetter,
        data: {
          email: values.email,
        },
      });

      if (res.data.responseCode === 200) {
        setIsLoading(false)
        toast.success("Subscribed Successfully.");
      } else {
        toast.warn(res.data.responseMessage);
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Box className="textleft" style={{ marginTop: "-37px" }}>
              <Box>
                <Typography variant="h3">
                  The First{" "}
                  <span className={classes.bannerSpan}>Blockchain</span>
                  <br /> <span className={classes.bannerSpan}>
                    Technology
                  </span>{" "}
                  based <br />
                  <span className={classes.bannerSpan}>
                    {" "}
                    Health & Charity
                  </span>{" "}
                  Token
                </Typography>
              </Box>
              <Box className={classes.subtile}>
                <Typography variant="h5">
                  A Token to create a user-focused electronic health <br />{" "}
                  record whilst maintaining a single true version of <br /> the
                  user’s data.
                </Typography>

                <Box className={classes.subtile} style={{ marginTop: "10px" }}>
                  <Formik
                    onSubmit={(values) => subscribe(values)}
                    initialValues={formInitialSchema}
                    // initialValues={{
                    //   email: "",
                    //   password: "",
                    // }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    validationSchema={yep.object().shape({
                      email: yep
                        .string()
                        .email(
                          "You have entered an invalid email address. Please try again"
                        )
                        .required("Please enter your email address.")
                        .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
                    })}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      touched,
                      values,
                      setFieldValue,
                    }) => (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            md={7}
                            style={{
                              marginBottom: "10px",
                              marginTop: ".5rem",
                            }}
                          >
                            <TextField
                              placeholder="mail@website.com"
                              type="text"
                              variant="outlined"
                              fullWidth
                              id="email"
                              size="small"
                              inputProps={{ maxLength: 256 }}
                              // value="prince@mailinator.com"
                              value={values.email}
                              name="email"
                              className="textFeilds"
                              error={Boolean(touched.email && errors.email)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                              }}
                            />
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.email && errors.email}
                            </FormHelperText>
                          </Grid>

                          <Grid item xs={12} md={5}>
                            <Box className={classes.SubmitBtnBox} mt={2}>
                              <Button
                                type="submit"
                                className={classes.buttonbox}
                                disabled={isLoading}
                                // onClick={() => history.push("/dashboard")}
                              >
                                Join Us
                                {isLoading && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>

              <Box mt={2} mb={1}></Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} className={classes.flexbox}>
            <Box className={classes.bannerImage}>
              <img
                src="./images/banner2.png"
                alt="Token Banner Image"
                className="moveTop"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box display="flex" justifyContent="flex-end">
        {ShowTopBtn && (
          <Box
            className={classes.iconBox}
            style={{
              width: "100%",
              maxWidth: "60px",
              borderRadius: "4px",
            }}
          >
            <Button onClick={handleclick}>
              <ExitToAppIcon
                style={{
                  color: "rgb(16, 105, 194)",
                  transform: "rotate(-90deg)",
                  fontSize: "50px",
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        buttonClasses="red"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "16px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </Box>
  );
}

export default Banner;
