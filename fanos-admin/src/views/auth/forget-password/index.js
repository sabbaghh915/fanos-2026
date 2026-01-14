import React, { useState, useContext } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  makeStyles,
  Button,
  Link,
  FormHelperText,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
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
  Title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "40px",
    lineHeight: "60px",
    color: "#000000",
  },
  TopText: {
    marginTop: "10px",
    marginBottom: "20px",
    textAlign: "center",
  },
  subHeadingText:{
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "bold",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  buttonbox: {
    background: "#0C576C",
    borderRadius: "20px",
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
    marginTop: "30px",
    [theme.breakpoints.only("sm")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "18px",
    },
    "@media (max-width: 959px)": {
      maxWidth: "100%",
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
    marginTop: "20px",
    textAlign: "center",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "bold",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
}));

function Login(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "PUT",
        url: ApiConfig.forgotPassword,
        data: {
          email: values.email,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.message);
        window.localStorage.setItem("email", values.email);
        //window.localStorage.setItem("token", res.data.token);
        setLoader(false);
        setIsSubmit(true);
        auth.setEndtime(moment().add(3, "m").unix());
        toast.success(
          "We have sent the OTP on your entered email address."
        );
        history.push({
          pathname: "/verify-otp",
          state: { email: values.userId },
        });
      } else {
        setLoader(false);
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
  return (
    <Page title="Forget password">
      <Grid className="d-flex height100">
        <Box className="loginForm">
          <Box className="signupbox">
            <Grid container direction={"column"}>
              <Grid
                item
                style={{ display: "flex", justifyContent: "center" }}
              ></Grid>
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
                  Forget password ? 
                </Typography>
              </Grid>
              <Grid item className={classes.TopText}>
                <Typography variant="h3" className={classes.subHeadingText}>
                Enter your registered email here, we will send a verification link to retrieve your password.
                </Typography>
              </Grid>
              <Formik
                onSubmit={(values) => handleFormSubmit(values)}
                initialValues={{
                  email: "",
                  password: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .email("Please enter a valid email address.")
                    .required("Please enter a valid email address.")
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
                    <Grid item className="fullwidth">
                      <Box mb={2}>
                        <label className={classes.label}>
                          Email Address&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          placeholder="Please enter your email"
                          type="text"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="email"
                          className={classes.TextBox}
                          inputProps={{ maxLength: 256 }}
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
                      </Box>
                    </Grid>
                    <Button
                      fullWidth
                      className={classes.buttonbox}
                      type="submit"
                      disabled={isLoading}
                    >
                      Send
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
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
