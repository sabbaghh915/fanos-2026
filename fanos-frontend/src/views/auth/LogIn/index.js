import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  Dialog,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Logo from "src/component/Logo";
import { Form, Formik } from "formik";
import * as yep from "yup";
import {  Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APIConfig";
import { AuthContext } from "src/context/Auth";
import axios from "axios";
// import { toast } from "react-toastify";

import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  dialogMain: {
    background: "rgba(0, 0, 0, 0.6)",

    "& .MuiBackdrop-root": {
      backgroundColor: "rgb(74 74 74 / 50%)",
    },
    "& .MuiDialog-paperWidthSm": {
      background: "#8B5CF6",
      width: "100%",
      maxWidth: "392px",
      position: "unset !important",
      maxHeight: "1100px",
      height: "fit-content",
      padding: "55px",
      [theme.breakpoints.up("xs")]: {
        padding: "30px",
       
      },
    },
  },
  TextBox: {
    borderRadius: "10px",
   "& ::-webkit-input-placeholder":{
      /* Chrome/Opera/Safari */
      color: "#fff !important"
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderRadius: "2.77px",
    },
    "& .MuiOutlinedInput-root:hover": {
      borderColor: "#ffffff !important",
    },
    "& .MuiOutlinedInput-input": {
      height: "22px",
      // fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "18px",

      color: "#FFFFFF !important",
      padding:"9.5px 14px !important"
    },
    "&::placeholder":{
      color:"#fff !important"
    }

  },
  heading: {
    // fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
    lineHeight: "14px",
    color: "#FFFFFF",
    margin: "0",
    marginBottom: "12px",
  },
  subHeading: {
    // fontFamily: "Poppins ",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "20px",
    color: "rgba(255, 255, 255, 0.6)",
    [theme.breakpoints.up("xs")]: {
      fontSize: "11px",

    },
  
  },
  headingDiv: {
    textAlign: "center",
  },

  rememberMe: {
    "& .MuiTypography-body1": {
      // fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "20px",
      color: "rgba(255, 255, 255, 0.6)",
    },
  },
  forgotPassword: {
    // fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#FF6B35",
    paddingTop:"3px"
  },
  submitButton: {
    width: "100%",
    height: "44px",
    background: "#FF6B35",
    borderRadius: "5px",
    // fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "21px",
    color: "#FFFFFF",
  },
  gridOR: {
    color: "#FF6B35",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "40px",
    paddingTop:"13px"
  },
  socialLoginBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    color: "#fff",
    cursor: "pointer"
  },
  dontHaveAccount: {
    // fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#FF6B35",
    textAlign: "center",
    padding: "14px",
    paddingTop:"20px"
  },
  guestBtn:{
    textTransform:"none"
  }
}));
export default function Login(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [isloading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [wrongPass] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
  const formInitialSchema = isRememberMe
    ? {
      email: "",
      password: "",
    }
    : {
      email: window.localStorage.getItem("email")
        ? window.localStorage.getItem("email")
        : "",
      password: window.localStorage.getItem("password")
        ? window.localStorage.getItem("password")
        : "",
    };
  const handleFormSubmit = async (values) => {

    setLoader(true);
    try {
      const res = await axios.post(ApiConfig.login, {
        email: values.email,
        password: values.password,
      });

      if (res.data.responseCode === 200) {
        setLoader(false);
        auth.userLogIn(res.data.result.token, true);
        window.localStorage.setItem("name", res.data.result.name);
        window.localStorage.setItem("email", res.data.result.email);
        window.localStorage.setItem("_id", res.data.result._id);
        toast.success("You are successfully logged in.");
        props.handleLoginModal();
        auth.userLogIn(res.data.result.token, true);
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

      toast.error(error.response.data.responseMessage);
    }
  };
  return (
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleLoginModal}
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogMain}
      >
        <Box>
          <Logo style={{ marginBottom: "30px", width: "157px" }} />
        </Box>
        <Box className={classes.headingDiv}>
          <Typography className={classes.heading}>Hello Again!</Typography>
          <Typography className={classes.subHeading}>
            Easily buy and sell items with just a few clicks
          </Typography>
        </Box>
        <Box>
          <Formik
            onSubmit={
              (values) => handleFormSubmit(values)
       
            }
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              email: yep
                .string()
                .email(
                  "You have entered an invalid email address. Please try again."
                )
                .required("Please enter your email address.")
                .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

              password: yep
                .string()
                .max(16)
                .required("Please enter your password."),
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
                <Grid item style={{ marginTop: "1.3rem" }}>
                  <TextField
                    label="Email"
                    type="text"
                    variant="outlined"
                    fullWidth
                    id="email outlined-basic"
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.email}
                    placeholder="Please Enter Email"
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
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
                <Grid item style={{ marginTop: "20px" }}>
                  <FormControl fullWidth>
                    <Box
                      style={{ width: "100%" }}
                      className={classes.loginForm1}
                    >
                      <TextField
                        className={classes.TextBox}
                        label="Password"
                        size="small"
                        variant="outlined"
                        fullWidth
                        id="password outlined-basic"
                        placeholder="Please Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        inputProps={{maxLength: 16 }}
                        name="password"
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: { color: "#fff" },
                        }}
                        InputProps={{
                          className:
                            wrongPass === true
                              ? classes.wrongPassword
                              : classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="center"
                              >
                                <Box className={classes.passsec}>
                                  {showPassword ? (
                                    <img
                                    alt ="img"
                                      src="/images/Eye.png"
                                      style={{
                                        fontSize: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        filter:'invert(100%)',
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <img
                                    alt ="img"
                                      src="/images/Hide.png"
                                      style={{
                                        fontSize: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        filter:'invert(100%)',
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
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                      >
                        {touched.password && errors.password}
                      </FormHelperText>
                    </Box>
                  </FormControl>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginTop: "13px" }}
                  >
                    <Box pl={1} mt={-1}>
                      <FormControlLabel
                        className={classes.rememberMe}
                        control={
                          <Checkbox
                            name="checkedC"
                            checked={isRememberMe}
                            onClick={rememberMe}
                          />
                        }
                        label="Remember me"
                      />
                    </Box>
                    <Typography>
                      <Link
                        component={RouterComponent}
                        className={classes.forgotPassword}
                        onClick={() => {  
                          props.closeLog();
                          props.handleForgotModal();
                        
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Typography>
                  </Box>
                </Grid>

                <Grid>

                  <Box className={classes.SubmitBtnBox} mt={2}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isloading}
                    >
                      Login
                      {isloading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
                <Grid container>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.gridOR}>OR</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={classes.socialLoginBox}>

                      <Button onClick={props.handleLoginModal} className={classes.guestBtn}>Enter as Guest</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>

                    <Typography className={classes.dontHaveAccount}>
                      Don’t have an account?&nbsp;
                      <span onClick={() => { props.handleRegisterModal(); props.handleLoginModal(); }} style={{ color: "#ffffff", cursor: "pointer" }}>Create one</span>
                    </Typography>

                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
}
