import React, { useState, useContext, useEffect } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  Link,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import Page from "src/component/Page";
const useStyles = makeStyles((theme) => ({
  buttonbox: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "16px",
    height: "57px",
    marginTop: "24px",
    [theme.breakpoints.only("sm")]: {
  
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
  
      fontSize: "16px",
    },
  },
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

  wrongPassword: {
    borderRadius: "10px",
    border: "1px solid red",
    background: theme.palette.background.taf,
    height: "55px",
  },
  Title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "40px",
    lineHeight: "60px",
    fontWeight: "bold",
    color: "#000000",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "center",
  },
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
  },
  linkText: {
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
  SubmitBtnBox: {
    textAlign: "center",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "24px",
    marginTop: "15px !important",
    marginBottom: "-5px !important",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  rememberMe: {
    "& .MuiTypography-body1": {
      fontFamily: "Poppins !important",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#1E1E1E",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
  },
  checkedB:{
    "& .MuiIconButton-root":{
      color:'#0C576C !important'
    }
  }
}));

function Login(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [isloading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [tokendata, settokendata] = useState("");
  const [Ip, setIP] = useState("");
  const [deviceBrower, setDeviceBowser] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [Name,setName] = useState("");

  const history = useHistory();
  const getData = async () => {
    const res = await Axios.get("https://geolocation-db.com/json/");
    setIP(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const formInitialSchema = isRememberMe
    ? {
      email: (""),
      password: (""),
    }
    : {
      email: window.sessionStorage.getItem("email")
        ? window.sessionStorage.getItem("email")
        : "",
      password: window.localStorage.getItem("password")
        ? window.localStorage.getItem("password")
        : "",
    };

  const handleFormSubmit = async (values) => {

    sessionStorage.setItem("email", values.email);
    setLoader(true);
    try {
      const res = await Axios.post(ApiConfig.userLogin, {
        email: values?.email,
        password: values?.password,
      });

      if (res.data.responseCode === 200) {
        auth.userLogIn(res.data.result.token, true);
        const Data = res?.data?.result
        setName(Data)

        setTimeout(() => {
          history.push("/dashboard");
        }, 1000);
        toast.success('Successfully logged in!', {
          autoClose: 10000,
        });

       
        window.localStorage.setItem("token", res.data.result.token);

      } else if (res.data.status === 500) {
        setLoader(false);
        toast.error(
          "Cannot reach internet. Please check your device internet connections."
        );
      } else {
        toast.warn(res.data.message);
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

  useEffect(() => {
    const { detect } = require("detect-browser");
    const browser = detect();
    if (browser) {
      setDeviceBowser(browser?.name);
    }
  }, []);

  useEffect(() => {
    if (
      window.localStorage.getItem("password") ||
      window.sessionStorage.getItem("email")
    ) {
      setIsRememberMe(true);
    } else {
      setIsRememberMe(false);
    }
  }, [
    window.sessionStorage.getItem("email"),
    window.localStorage.getItem("password"),
  ]);

  function rememberMe() {
    if (!isRememberMe) {
      setIsRememberMe(true);
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      window.sessionStorage.setItem("email", email?.value);
      window.localStorage.setItem("password", password?.value);
    } else {
      setIsRememberMe(false);
      window.sessionStorage.removeItem("email");
      window.localStorage.removeItem("password");
    }
  }
  return (
    <>
      <Page title="Login">
        <ToastContainer />
        <Grid className="d-flex height100">
          <Box className="loginForm">
            <Box className={`${classes.SignUp} signupbox`}>
              <Grid container direction={"column"}>
                <Grid item>
                  <Box className={classes.logosec}>
                    <img
                      style={{ cursor: "pointer", width: "103px", borderRadius:'10px', }}
                      onClick={() => history.push("/")}
                      src="images/logo.svg"
                    />
                  </Box>
                </Grid>
                <Grid item className={classes.TopText}>
                  <Typography variant="h3" className={classes.Title}>
                    Login
                  </Typography>

                </Grid>
                <Formik
                  onSubmit={(values) => handleFormSubmit(values)}
                  initialValues={formInitialSchema}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    email: yep
                      .string()
                      .email("Please enter a valid email address")
                      .required("Please enter your email address.")
                      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

                    password: yep
                      .string()
                      .max(16)
                      .min(8, "Password must be at least 8 characters")
                      .required("Please enter a valid password"),

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
                        <label className={classes.label}>
                          Email {" "}
                          <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="mail@website.com"
                          type="text"
                          variant="outlined"
                          fullWidth
                          id="email"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.email}
                          name="email"
                          className={classes.TextBox}
                          error={Boolean(touched.email && errors.email)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        >
                          {touched.email && errors.email}
                        </FormHelperText>
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
                              Password{" "}
                              <span className={classes.redText}>*</span>
                            </label>
                            <TextField
                              placeholder="Example@123"
                              size="small"
                              variant="outlined"
                              className={classes.TextBox}
                              fullWidth
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              // value="Mobiloitte@1"
                              inputProps={{ minLength: 8, maxLength: 16 }}
                              name="password"
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                className: classes.TextBox,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
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
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.password && errors.password}
                            </FormHelperText>
                          </Box>
                        </FormControl>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          style={{ marginTop: "5px" }}
                        >
                          <Box pl={1} mt={-1}>
                            <FormControlLabel
                              className={classes.rememberMe}
                              control={
                                <Checkbox
                                className={classes.checkedB}
                                  name="checkedC"
                                  checked={isRememberMe}
                                  onClick={rememberMe}
                                />
                              }
                              label="Remember me"
                            />
                          </Box>
                          <Typography variant="body2">
                            <Link
                              component={RouterComponent}
                              to="/forget-password"
                              style={{ color: "#0C576C" }}
                              className={classes.linkText}
                            >
                              Forgot Password?
                            </Link>
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid>
                        <Box className={classes.SubmitBtnBox} mt={2}>
                          <Button
                            type="submit"
                            className={classes.buttonbox}
                            disabled={isloading}
                            fullWidth
                          >
                            LOGIN
                            {isloading && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Page>
    </>
  );
}

export default Login;
