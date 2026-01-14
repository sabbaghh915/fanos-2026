import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  Dialog,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Logo from "src/component/Logo";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APICongig";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineLock, AiOutlineEye } from "react-icons/ai";
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
    fontSize: "14px",
    lineHeight: "20px",
    color: "#D39B2D",
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
    fontSize: "12px",
    paddingTop: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
  SubmitBtnBox: {
    paddingTop: "30px",
  },
  title: {
    color: "#fff",
  },
  textFiled:{
    color: "#fff !important",
"& .MuiInputBase-input::placeholder":{
  color: "#fff !important",
},
"& .MuiOutlinedInput-input::placeholder":{
  color: "#fff !important",
},
"& .MuiOutlinedInput-input":{
  color: "#fff !important",
},
  },
}));
export default function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [isloading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFormSubmit = async (values) => {
    const id = window.localStorage.getItem("id");

    sessionStorage.setItem("email", values.email);
    setLoader(true);
    try {
      const res = await axios.post(ApiConfig.resetPassword, {
        _id: id,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (res.data.responseCode === 200) {
        setLoader(false);
        toast.success("Password has been changed successfully.");
        props.handleLoginModal();
        window.localStorage.removeItem("forgot");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("userId");
        props.handleResetModal();
        // props.handleLoginModal();
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
        onClose={props.handleResetModal}
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogMain}
      >
        <Box>
          <Logo style={{ marginBottom: "30px", width: "157px" }} />
        </Box>
        <Box className={classes.headingDiv}>
          <Typography className={classes.heading}>Reset Password</Typography>
          {/* <Typography className={classes.subHeading}>
            Please Enter New password.
          </Typography> */}
        </Box>
        <Box>
          <Formik
            onSubmit={
              (values) => handleFormSubmit(values)
              // history.push("/")
            }
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
                .max(16, "16 charactors are allowed.")
                .matches(
                  /^(?=.*[A-Z][a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                  "Password must be 8 to 16 characters long, with one uppercase letter, one lowercase letter, a number, and a special character. "
                )
                .required("Password is required."),
              confirmPassword: yep
                .string()
                .required("Confirm password is required")
                .oneOf(
                  [yep.ref("password"), null],
                  "Confirm password should match with the new password"
                ),
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
                <Grid item>
                  <Box>
                    <label className={classes.title}>New password</label>
                    <TextField
                      style={{ marginTop: "3%" }}
                      className={classes.textFiled}
                      placeholder="New password"
                      size="small"
                      variant="outlined"
                      fullWidth
                      id="password outlined-basic"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      error={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: 16,
                      }}
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
                                  <AiOutlineEye
                                    style={{
                                      color: "#fff",
                                      // color: "#7A7A7A",
                                      fontSize: "18px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                ) : (
                                  <AiOutlineEyeInvisible
                                    style={{
                                      color: "#fff",
                                      // color: "#7A7A7A",
                                      fontSize: "18px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
                                )}
                              </Box>
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              style={{
                                borderRight: "0.5px solid #7A7A7A",
                              }}
                            >
                              <AiOutlineLock
                                style={{
                                  marginLeft: "-2px",
                                  marginRight: "10px",
                                  width: "14px",
                                  color: "#00A4EF",
                                  fontSize: "22px",
                                }}
                              />
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText
                      error
                      style={{ fontSize: "12px", marginLeft: "1%" }}
                    >
                      {touched.password && errors.password}
                    </FormHelperText>
                  </Box>
                </Grid>
                &nbsp;
                <Grid item style={{ marginBottom: "10px", marginTop: "-0px" }}>
                  <FormControl fullWidth>
                    <Box
                      style={{ width: "100%" }}
                      className={classes.loginForm1}
                    >
                      <Typography className={classes.title}>
                        Confirm Password
                      </Typography>
                      <TextField
                        className={classes.textFiled}
                        placeholder="Enter your Confirm password"
                        size="small"
                        variant="outlined"
                        fullWidth
                        id="password outlined-basic"
                        inputProps={{ maxLength: 16 }}
                        value={values.confirmPassword}
                        type={showPassword1 ? "text" : "password"}
                        name="confirmPassword"
                        // placeholder="Confirm your password"
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box className={classes.passsec}>
                                  {showPassword1 ? (
                                    <AiOutlineEye
                                      style={{
                                        color: "#fff",
                                        // color: "#7A7A7A",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <AiOutlineEyeInvisible
                                      style={{
                                        color: "#fff",
                                        // color: "#7A7A7A",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                style={{
                                  borderRight: "0.5px solid #7A7A7A",
                                }}
                              >
                                <AiOutlineLock
                                  style={{
                                    marginLeft: "-2px",
                                    marginRight: "10px",
                                    width: "14px",
                                    color: "#00A4EF",
                                    fontSize: "22px",
                                  }}
                                />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <FormHelperText
                        error
                        style={{ fontSize: "12px", marginLeft: "1%" }}
                      >
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                </Grid>
                <Grid>
                  <Box className={classes.SubmitBtnBox} mt={2}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isloading}
                      onClick={() => {
                        props.handleOtpModal();
                      }}
                    >
                      Submit
                      {isloading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
                <Grid>
                  <Typography
                    className={classes.signin}
                    onClick={() => {
                      props.handleLoginModal();
                    }}
                  >
                    Sign in
                  </Typography>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
}
