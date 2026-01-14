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
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
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
        padding: "30px",
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
      color: "#FFFFFF !important",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "14px",
    color: "#FFFFFF",
    margin: "0",
    marginBottom: "20px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "20px",
    color: "#D39B2D",
    marginBottom: "20px",
    maxWidth: "600px",
    textAlign: "initial",
    width: "100%",
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
    padding: "10px",
  },
  signIn: {
    color: "#D39B2D",
    fontSize: "12px",
    paddingTop: "20px",
  },
  resendButton: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#D39B2D",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useContext(AuthContext);
  const [isLoading, setLoader] = useState(false);

  const handleFormSubmit = async (values) => {
    const _id = window.localStorage.getItem("id");
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.verifyOTP,
        data: {
          _id: _id,
          otp: values.otp.toString(),
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("OTP has been verified.");
        setLoader(false);
        props.otpClose();
        props.handleResetModal();
      } else {
        setLoader(false);
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setLoader(false);

      if (error?.response.data?.responseMessage == "Incorrect OTP") {
        toast.error(error?.response.data?.responseMessage);
      }
      if (
        error?.response.data?.responseMessage ==
        "Your OTP verification attempt limit is exceed, wait for 3 min"
      ) {
        toast.error("OTP verification attempt limit is exceed");
      }

      if (error) {
      
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetotphandle = async (values) => {
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.resendOTP,
        data: {
          email: window.localStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("OTP has been sent to your registered email address.");
        auth.setEndtime(moment().add(3, "m").unix());
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Please enter the correct Email");
      } else {
        toast.error(error.message);
      }
    }
  };

  const minute = auth.timeLeft?.minutes?.toString();
  const second = auth.timeLeft?.seconds?.toString();

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleOtpModal}
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogMain}
      >
        <Box>
          <Logo style={{ marginBottom: "30px", width: "139px" }} />
        </Box>
        <Box className={classes.headingDiv}>
          <Typography className={classes.heading}>OTP Verification</Typography>
          <Typography className={classes.subHeading}>
            Please enter a 6- digit OTP received <br /> on your registered email
            address.
          </Typography>
        </Box>
        <Box>
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
                .max(6, "Should not exceeds 6 digits")
                .min(6, "Must be only 6 digits"),
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
                    <TextField
                      placeholder="OTP"
                      type="number"
                      onWheel={() => document.activeElement.blur()}
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="otp"
                      id="inputID"
                      label="OTP"
                      inputProps={{ maxLength: 6 }}
                      error={Boolean(touched.otp && errors.otp)}
                      onBlur={handleBlur}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);
                      }}
                      onChange={handleChange}
                      InputLabelProps={{
                        style: { color: "#fff" },
                      }}
                      InputProps={{
                        className: classes.TextBox,
                      }}
                      className="textFeilds"
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
                      <Box style={{ display: "flex", justifyContent: "end" }}>
                        {auth.timeLeft?.minutes > 0 ||
                        auth.timeLeft?.seconds > 0 ? (
                          <>
                            <Box>
                              <Typography
                                variant="body1"
                                style={{
                                  color: "#D39B2D",
                                  fontSize: "14px",
                                  paddingTop: "10px",
                                  fontWeight: "800",
                                  fontFamily: "Poppins",
                                  marginBottom: "5px",
                                }}
                              >
                                {minute.length > 1 ? minute : "0" + minute} :{" "}
                                {second.length > 1 ? second : "0" + second}
                              </Typography>{" "}
                            </Box>
                          </>
                        ) : (
                          <>
                            <Button
                              className={classes.resendButton}
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
                          </>
                        )}{" "}
                      </Box>
                    </div>
                  </Box>
                </Grid>

                <Button
                  className={classes.submitButton}
                  type="submit"
                  disabled={isLoading}
                >
                  Submit
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
}
