import React, { useState, useContext } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  Link,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import Page from "src/component/Page";
const useStyles = makeStyles((theme) => ({
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
  },
  TextBox: {
    borderRadius: "5px",
    background: "#fff",
    fontSize: "13px",
    caretColor: '#fff',
    caretColor: 'black',
    "&::placeholder": {
      color: "#fff !important",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "24px",
    },
    "& .MuiInputBase-input": {
      color: "#000 !important",
      height: "30px",
      fontFamily: "Roboto !important",
      paddingLeft: "14px",
      paddingTop: "6px",
      paddingRight: '20px'
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: 'none !important'
    },
    "& .MuiIconButton-edgeEnd": {
      marginRight: "10px"
    },
    '& .MuiInputBase-root': {
      border: "0.8px solid  rgb(133, 133, 133, 0.5)",
    }
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  Title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "40px",

    lineHeight: "60px",
    /* identical to box height */

    color: "#000000",
  },
  verify: {
    height: "57px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    fontFamily: "Poppins",
    lineHeight: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    marginTop: "40px",
    background: "#0C576C",
    borderRadius: "20px",
  },
  subHeadingText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "24px",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "24px",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  linkText: {
    textDecoration: "none",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#0C576C",
    cursor: "pointer",
    "& span": {
      color: "#000000",
    },
  },
  BottomGrid: {
    textAlign: "center",
  },
}));
function Login(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const [isLoading, setLoader] = useState(false);
  const [isloading, setloader] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.verifyOTP,
        data: {
          otp: values.otp.toString(),
          email: window.localStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("OTP has been verified.");
        setLoader(false);

        localStorage.setItem("token", res.data.result.token);

        history.push({
          pathname: "/reset-password",
          state: { email: values.email, otp: values.otp },
        });
      } else {
        setLoader(false);
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setLoader(false);
      if (error.response.data.responseMessage) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const resetotphandle = async (values) => {
    try {
      setloader(true);

      const res = await axios({
        method: "PUT",
        url: ApiConfig.forgotPassword,
        data: {
          email: localStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("OTP has been sent to your registered email address.");
        setloader(false);

        auth.setEndtime(moment().add(2, "m").unix());
      } else {
        setloader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setloader(false);
      if (error.response.data.responseMessage) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  const email = window.localStorage.getItem("email");
  const minute = auth.timeLeft?.minutes?.toString();
  const second = auth.timeLeft?.seconds?.toString();
  return (
    <>
      <Page title="Verify OTP">
        <Grid className="d-flex height100">
          <Box className="loginForm">
            <Box className="signupbox">
              <Grid container direction={"column"}>
                <Grid
                  item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* <Logo
                width="110"
                style={{ padding: "15px 0", cursor: "pointer" }}
              /> */}
                </Grid>{" "}
                <Grid item>
                  <Box className={classes.logosec}>
                    <img
                      style={{ cursor: "pointer", width: "103px", borderRadius:'10px' }}
                      onClick={() => history.push("/")}
                      src="images/logo.svg"
                    />
                  </Box>
                </Grid>
                <Grid item className={classes.TopText}>
                  <Typography variant="h3" className={classes.Title}>
                    Verify OTP
                  </Typography>
                </Grid>
                <Grid item className={classes.TopText}>
                  <Typography variant="h3" className={classes.subHeadingText}>
                    OTP has been sent to abc@gmail.com
                  </Typography>
                  <Typography variant="h3" className={classes.subHeadingText}>
                    Please enter the OTP.
                  </Typography>
                </Grid>
               
                <Formik
                  onSubmit={(values) => handleFormSubmit(values)}
                  initialValues={{
                    otp: "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    otp: yep
                      .string()
                      .required("OTP is required.")
                      .matches(/^[0-9]*$/, "Must be a valid OTP")
                      .max(4, "Should not exceeds 4 digits")
                      .min(4, "Must be only 4 digits"),
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
                      <Grid item className="fullwidth">
                        <Box>
                          <label className={classes.label}>
                            Please enter OTP
                          </label>
                          <TextField
                             className={classes.TextBox}
                            placeholder="Enter Your OTP"
                            type="number"
                            onWheel={() => document.activeElement.blur()}
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="otp"
                            inputProps={{ maxLength: 4 }}
                            error={Boolean(touched.otp && errors.otp)}
                            onBlur={handleBlur}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 4);
                            }}
                            onChange={handleChange}
                            InputProps={{
                              className: classes.TextBox,
                            }}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: '5px'
                            }}
                          >
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.otp && errors.otp}
                            </FormHelperText>
                            <Box
                              style={{ display: "flex", justifyContent: "end",  }}
                            >
                              {auth.timeLeft?.minutes > 0 ||
                                auth.timeLeft?.seconds > 0 ? (
                             
                                  <Box>
                                    <Typography
                                      variant="body1"
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                        fontWeight: "800",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {minute.length > 1
                                        ? minute
                                        : "0" + minute}{" "}
                                      :{" "}
                                      {second.length > 1
                                        ? second
                                        : "0" + second}
                                    </Typography>{" "}
                                  </Box>
                             
                              ) : (
                                <>
                                  <Button
                                    style={{
                                      color: "#0C576C",
                                      fontFamily: "Poppins",
                                      fontWeight: "800",
                                    }}
                                    // fullWidth
                                    onClick={() => {
                                      resetotphandle();
                                    }}
                                    disabled={
                                      auth.timeLeft && auth.timeLeft.seconds > 0
                                    }
                                  >
                                    {" "}
                                    Resend OTP{" "}
                                  </Button>{" "}
                                  &nbsp;
                                </>
                              )}{" "}
                            </Box>
                          </div>
                        </Box>
                      </Grid>

                      <Box>
                        <Button
                          className={classes.verify}
                          fullWidth
                          style={{ marginTop: "30px", padding: "10px" }}
                          type="submit"
                          disabled={isLoading}
                        >
                          Verify
                          {isLoading && <ButtonCircularProgress />}
                        </Button>
                        &nbsp;&nbsp;
                      </Box>
                    </Form>
                  )}
                </Formik>
                <Grid item>
                <Typography
                  color="primary.main"
                  variant="body2"
                  className={classes.BottomGrid}
                >
                  <Link
                    component={RouterComponent}
                    to="/"
                    className={classes.linkText}
                  >
                    <span>Back to</span> Log in
                  </Link>
                </Typography>
              </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Page>
    </>
  );
}

export default Login;
