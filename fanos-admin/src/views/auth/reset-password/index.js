import React, { useState, useEffect } from "react";
import "src/scss/main.css";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import Logo from "src/component/Logo";

import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";
import * as yep from "yup";
import {
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  FormControl,
  makeStyles,
  DialogContent,
  InputAdornment,
  DialogContentText,
  DialogActions,
  FormHelperText,
  Link,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
const useStyles = makeStyles((theme) => ({
  buttonbox: {
    background: "#0C576C",
    borderRadius: "16px",
    width: "100%",
    height: "57px",
    marginTop: "30px",
    marginBottom: "20px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "22px",
    letterSpacing: "0.2px",
    color: "#FFFFFF",

    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "18px",
    },
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      // borderRadius: "10px",
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
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
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
  subTitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#000000",
  },
  TopText: {
    fontFamily: "Poppins",
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  submitDiv: {
    textAlign: "center",
  },
  label: {
    marginTop: "19px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  BottomGrid: {
    textAlign: "center",
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
}));
function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const otp = location.state?.otp;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setLoader] = useState(false);


  const resetPaswordHandler = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setLoader(false);
        setOpen(true);
        history.push("/");
      } else if (res.responseCode === 500) {
        toast.error("Invalid user");
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

  return (
    <Page title="Reset password">
      <Grid className="d-flex height100">
        <Box className="loginForm">
          <Box className="signupbox">
            <Grid container direction={"column"}>
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                {/* <Logo
                width="110"
                style={{ padding: "15px 0", cursor: "pointer" }}
              />*/}
              </Grid>
              <Grid item>
                <Box className={classes.logosec}>
                  <img
                    style={{ cursor: "pointer", width: "103px", borderRadius:'10px' }}
                    onClick={() => history.push("/")}
                    src="images/logo.svg"
                  />
                  {/* <Logo width="180" style={{ cursor: "pointer" }} /> */}
                </Box>
              </Grid>
              <Grid item className={classes.TopText}>
                <Typography variant="h3" className={classes.Title}>
                  Reset Password
                </Typography>
              </Grid>
              <Formik
                onSubmit={(values) => resetPaswordHandler(values)}
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  password: yep
                    .string()
                    .required("Please enter your password.")
                    .min(8, "Minimum 8 characters are allowed.")
                    .max(16, "Maximum 16 characters are allowed.")
                    .matches(
                      /^(?=.*[A-Z][a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                      "Password must contain a uppercase letter, a number & a special character"),
                  confirmPassword: yep
                    .string()
                    .required("Please enter confirm password.")
                    .oneOf(
                      [yep.ref("password"), null],
                      "Confirm Password should match with New Password"),
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
                    <Grid
                      item
                      style={{ marginBottom: "10px", marginTop: ".5rem" }}
                    >
                      <Box>
                        <label className={classes.label}>
                          New Password&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Please enter password"
                          size="small"
                          variant="outlined"
                          fullWidth
                          className={classes.TextBox}
                          disabled={isLoading}
                          inputProps={{ minLength: 8, maxLength: 16 }}
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
                          // placeholder="Enter your password"
                          error={Boolean(touched.password && errors.password)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  <Box className={classes.passsec}>
                                    {showPassword ? (
                                      <img
                                        src="/images/Eye.png"
                                        style={{
                                          fontSize: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          // color: "#1069C2",
                                          alignItems: "center",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src="/images/Hide.png"
                                        style={{
                                          fontSize: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          // color: "#1069C2",
                                          alignItems: "center",
                                        }}
                                      />
                                    )}
                                  </Box>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {
                            touched.password && errors.password
                            // && (
                            //   <FormHelperText
                            //     error
                            //     style={{ margin: "0px", fontSize: "12px" }}
                            //   >
                            //     <ul
                            //       style={{
                            //         padding: "0px 0px 0px 19px",
                            //         marginTop: "0px",
                            //       }}
                            //     >
                            //       <li>
                            //         Must contain 8 characters, one uppercase, one
                            //         lowercase, one number and one special case
                            //         character
                            //       </li>
                            //     </ul>
                            //   </FormHelperText>
                            // )
                          }
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      style={{ marginBottom: "10px", marginTop: "-17px" }}
                    >
                      <FormControl fullWidth>
                        <Box
                          style={{ width: "100%" }}
                          className={classes.loginForm1}
                        >
                          <label className={classes.label}>
                            Confirm Password&nbsp;
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextField
                            placeholder="Confirm your password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            disabled={isLoading}
                            inputProps={{ minLength: 8, maxLength: 16 }}
                            type={showPassword1 ? "text" : "password"}
                            value={values.confirmPassword}
                            name="confirmPassword"
                            // placeholder="Confirm your password"
                            error={Boolean(
                              touched.confirmPassword && errors.confirmPassword
                            )}
                            onBlur={handleBlur}
                            className={classes.TextBox}
                            onChange={handleChange}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword1(!showPassword1)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword1 ? (
                                        <img
                                          src="/images/Eye.png"
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            // color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src="/images/Hide.png"
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            // color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error>
                            {touched.confirmPassword && errors.confirmPassword}
                          </FormHelperText>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Box className={classes.submitDiv}>
                      <Button className={classes.buttonbox} type="submit">
                        Submit {isLoading && <ButtonCircularProgress />}
                      </Button>
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
  );
}

export default Login;
