import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,

  FormHelperText,

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
import ApiConfig from "src/config/APIConfig";
import { AuthContext } from "src/context/Auth";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";

import moment from "moment";
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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderRadius: "2.77px",
    },
    "& .MuiOutlinedInput-root:hover": {
      borderColor: "#ffffff !important",
    },
    "& .MuiOutlinedInput-input": {
      height: "22px",
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "18px",
      padding:"9.5px 14px !important",
      color: "#FFFFFF !important",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
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
    color: "#FF6B35",
  },
  submitButton: {
    width: "100%",
    height: "44px",
    background: "#FF6B35",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#FFFFFF",
  },
  alreadyAccount: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#FF6B35",
  },
  passsec: {
    marginRight: "0px"
  }
}));
export default function Register(props) {
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const formInitialSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // phoneNo: "",
  };

  const handleFormSubmit = async (values) => {

    setIsLoading(true);
    localStorage.setItem("email", values.email);

    try {
      // });
      const res = await axios({
        method: "POST",
        url: ApiConfig.signup,
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
  
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("OTP sent sucessfully.");
        window.localStorage.setItem("id", res.data.result._id);
        window.localStorage.setItem("email", res.data.result.email);
        auth.setEndtime(moment().add(3, "m").unix());
        props.handleRegisterModal();
        props.handleOtpModal();

      } else if (res.data.status === 205) {
        toast.warn(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.responseMessage);
    }
  };
  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleRegisterModal}
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
            onSubmit={(values) => handleFormSubmit(values)}
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              name: yep
                .string()
                .required("Please enter your name.")
                .min(2, "Please enter at least 2 characters.")
                .max(256, "You can enter only 256 characters."),
                //.matches(
                  ///^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                  //"Only alphabets and whitespaces are allowed for this field number are not. "
                //),
              email: yep
                .string()
                .email(
                  "You have entered an invalid email address. Please try again."
                )
                .required("Please enter your email address.")
                .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

              password: yep
              .string()
              .max(20)
              // .min(8)
              .required("Please enter your password"),
              //.matches(
                ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                //"Password must contain  8-16 characters and at least 1 uppercase letter,1 lowercase letter, 1 number, and 1 special character"
              //),
                // .string()
                // .max(16)
                // .min(8, "Password must be 8+ characters, 1 letter, 1 number, 1 special characters, no spaces or common words.")
                // .required("Please enter your password."),
              confirmPassword: yep
                .string()
                .required("Please confirm your password.")
                .oneOf(
                  [yep.ref("password"), null],
                  "Confirm password must match to password."
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
                <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                  <TextField
                    label="Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="name"
                    id="name outlined-basic"
                    inputProps={{ maxLength: 256 }}
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
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
                    style={{
                      fontSize: "12px",
                      paddingBottom: "0px !important",
                      fontFamily: "Poppins",
                      fontWeight: "initial",

                    }}
                  >
                    {touched.name && errors.name}
                  </FormHelperText>
                </Grid>
                <Grid item style={{ marginTop: "1.5rem" }}>
                  <TextField
                    label="Email"
                    type="text"
                    variant="outlined"
                    fullWidth
                    id="email outlined-basic"
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.email}
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

                    style={{ fontSize: "12px", fontFamily: "Poppins", fontWeight: "initial", }}
                  >
                    {touched.email && errors.email}
                  </FormHelperText>
                </Grid>

                <Grid item style={{ marginTop: "1.5rem" }}>
                  <TextField
                    className={`${classes.inputvalue} textFeilds`}
                    label="Password"
                    size="small"
                    variant="outlined"
                    fullWidth
                    id="password outlined-basic"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    inputProps={{ minLength: 8, maxLength: 16 }}
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
                            edge="end"
                          >
                            <Box className={classes.passsec}>
                              {showPassword ? (
                                <img
                                  src="/images/Eye.png"
                                  alt="eye"
                                  style={{
                                    fontSize: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    // color: "#1069C2",
                                    alignItems: "center",
                                    marginRight: "12px"
                                  }}
                                />
                              ) : (
                                <img
                                  src="/images/Hide.png"
                                  alt="eye_hide"
                                  style={{
                                    fontSize: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    // color: "#1069C2",
                                    alignItems: "center",
                                    marginRight: "12px"

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
                    style={{ fontSize: "12px", fontFamily: "Poppins", fontWeight: "initial",wordBreak:'break-word' }}
                  >
                    {touched.password && errors.password}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                  <TextField
                    label="Confirm Password"
                    id="confirm-password outlined-basic"
                    className="textFeilds"
                    size="small"
                    variant="outlined"
                    autoComplete="new-password"
                    fullWidth
                    inputProps={{ maxLength: 16 }}
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      className: classes.TextBox,
                      autocomplete: "new-password",
                      form: {
                        autocomplete: "off",
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            <Box className={classes.passsec}>
                              {showConfirmPassword ? (
                                <img
                                  src="/images/Eye.png"
                                  alt="eye"
                                  style={{
                                    fontSize: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "12px",

                                    alignItems: "center",
                                  }}
                                />
                              ) : (
                                <img
                                  src="/images/Hide.png"
                                  alt="hide_eye"
                                  style={{
                                    fontSize: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "12px",

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
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText
                      error
                      style={{
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        fontWeight: "initial",
                      }}
                    >
                      {touched.confirmPassword && errors.confirmPassword}

                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
                  <Box className={classes.SubmitBtnBox}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isLoading}
                    // onClick={() => { props.handleOtpModal(); }}
                    >
                      Register
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid item>
            <Typography
              color="primary.main"
              className={classes.alreadyAccount}
              style={{
                marginTop: "20px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Already have an account?&nbsp;
              <span
                onClick={() => {
                  props.handleLoginModal();
                  props.handleRegisterModal();
                }}
                className={classes.alreadyAccount}
                style={{ color: "#ffffff", cursor: "pointer" }}
              >
                Log In
              </span>
            </Typography>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
