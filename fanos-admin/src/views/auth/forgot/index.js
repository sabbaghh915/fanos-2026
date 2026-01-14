import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,

  FormHelperText,

  Dialog,

} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Logo from "src/component/Logo";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APICongig";
import { AuthContext } from "src/context/Auth";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  dialogMain: {
    background: "rgba(0, 0, 0, 0.6)",

    "& .MuiBackdrop-root": {
      backgroundColor: "rgb(74 74 74 / 50%)",
    },
    "& .MuiDialog-paperWidthSm": {
      background: "#0C576C",
      width: "100%",
      maxWidth: "392px",
      position: "unset !important",
      maxHeight: "1100px",
      height: "fit-content",
      padding: "55px",
      [theme.breakpoints.up("xs")]: {
        // padding: "30px",
      },
    },
    
  },
  TextBox: {
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderRadius: "2.77px",
    },
    "& .MuiOutlinedInput-root:hover": {
      borderColor: "#ffffff !important",
    },
    "& .MuiOutlinedInput-input": {
      height: "22px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "18px",
      padding: "9.5px 14px !important",

      color: "#FFFFFF",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "14px",
    color: "#FFFFFF",
    margin: "0",
    marginBottom: "12px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "20px",
    color: "#D39B2D",
    textAlign: "initial",
    paddingTop: "10px",
    maxWidth: "600px",
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      fontSize: "14px",

    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "17px",

    },
  },
  headingDiv: {
    textAlign: "center",
  },

  rememberMe: {
    "& .MuiTypography-body1": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "20px",
      color: "rgba(255, 255, 255, 0.6)",
    },
  },
  forgotPassword: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#D39B2D",
  },
  submitButton: {
    width: "100%",
    height: "44px",
    background: "#D39B2D",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#FFFFFF",
  },
  gridOR: {
    color: "#D39B2D",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "40px",
  },
  signin: {
    color: "#D39B2D",
    fontSize: "14px",
    paddingTop: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
  SubmitBtnBox: {
    paddingTop: "30px",
  },
}));
export default function Login(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [isloading, setLoader] = useState(false);


  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formInitialSchema = {
    email: "",
    password: "",
  };
  const handleFormSubmit = async (values) => {
    setLoader(true);
    try {
      const res = await axios.put(ApiConfig.forgot, {
        email: values.email,
      });

      if (res.data.responseCode === 200) {
        setLoader(false);
        toast.success("OTP Sent Successfully");
        window.localStorage.setItem("id", res.data.result._id);
        window.localStorage.setItem("email", res.data.result.email);
        window.localStorage.setItem("forgot", true);
        auth.setEndtime(moment().add(3, "m").unix());
        props.handleOtpModal();

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
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleForgotModal}
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogMain}
      >
        <Box>
          <Logo style={{ marginBottom: "30px", width: "150px" }} />
        </Box>
        <Box className={classes.headingDiv}>
          <Typography className={classes.heading}>Forgot Password</Typography>
          <Typography className={classes.subHeading}>
            Please enter your registered email address <br />to receive the one time
            password.
          </Typography>
        </Box>
        <Box>
          <Formik
            onSubmit={
              (values) => handleFormSubmit(values)
              // history.push("/")
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
                <Grid item style={{ marginTop: "1.5rem" }}>
                  <TextField
                    label="Email"
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.email}
                    placeholder="Please Enter Email"
                    name="email"
                    className="textFeilds"
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

                <Grid>
                  <Box className={classes.SubmitBtnBox} mt={2}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isloading}
                      onClick={() => handleFormSubmit()}
                    >
                      Submit
                      {isloading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
                <Grid align="center">
                  <Button
                    className={classes.signin}
                    onClick={() => {
                      props.handleLoginModal();
                      props.handleForgotModal();
                      
                    }}
                  >
                    Sign in
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
}
