import React, { useState, useHistory } from "react";
import Page from "src/component/Page";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  Container,
  makeStyles,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { BiLock, BiLockOpen } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonbox: {
    background: "#0C576C",
    borderRadius: "20px",
    width: "100%",
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

    [theme.breakpoints.only("xs")]: {
      fontSize: "20px",
    },
  },
  mainBox: {
    "& h5": {
      fontSize: "18px",
    },
    "& h6": {
      fontSize: "15px",
    },

    "& .mainLine1": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "& .setBox1": {
        display: "flex",
        alignItems: "center",
        "& .imageBox": {
          marginRight: "20px",
          maxWidth: "45px",
        },
      },
      "& .butonBox": {
        marginLeft: "25px",
      },
    },
  },
  googleBtn: {
    color: "#848484",
    border: "1px solid #3a96dd",
    filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
    padding: " 9px 10px !important",
    fontSize: " 13px",
    fontWeight: 400,
    borderRadius: "30px",
  },
  contentBox: {
    background: theme.palette.background.taf,
    borderRadius: "10px",
    padding: "10px 15px",
  },
  containerBox: {
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "10px",
    // border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "bold",
    marginTop: "0px !important",
    marginBottom: "-5px ",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  TextBox: {
    borderRadius: "10px",
    height: "55px",
    background: theme.palette.background.taf,
    "& .MuiInputBase-input ": {
      color: "#000000 !important",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "54px",
    textAlign: "left",
    /* identical to box height */

    color: "#000",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      marginTop: "30px",
      fontSize: "25px",
      borderRadius: "16px",
    },
  },
  search: {
    backgroundColor: "transparent",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#c4c4c4',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },
    },
  },
}));

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles();

  const resetPaswordHandler = async (values, resetForm) => {
    console.log(values, "passwordvalue")
    setIsLoading(true);   
    setErrorMessage("");
 
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.changepassword,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          newPassword: values.password,
          confirmPassword: values.confirm,
          oldPassword:values.oldpassword,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading(false);
        resetForm();
        // history.push("/login");
      } else if (res.data.responseCode === 205) {
        setErrorMessage(res.data.responseMessage);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.responseMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Page title="Change password">
        <Box className={classes.mainBox}>
          <Box>
            <Box align="center" mt={2}>
              <Typography className={classes.heading}>
                Change Password
              </Typography>
            </Box>
            <Formik
              onSubmit={(values, { resetForm }) => {
                resetPaswordHandler(values);
                resetForm();
              }}
              initialValues={{
                oldpassword: "",
                password: "",
                confirm: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yup.object().shape({
                oldpassword: yup
                  .string()
                  .required("Old password is required."),
                password: yup
                  .string()
                  .max(16)
                  .min(8, "Password must be at least 8 characters")
                  .required("Password is required.")
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m,
                    "Password should be 8 to 16 characters long with one uppercase, one lowercase, one special character, and one numerical value."
                  ),
                confirm: yup
                  .string()
                  .required("Password confirmation is required.")
                  .oneOf([yup.ref("password")], "Passwords do not match"),
              })}
            //    --------------------     //
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
                 
                  <Container
                    maxWidth="sm"
                    style={{
                      border: "3px solid #0C576C",
                      borderRadius: "33px",
                    }}
                  >
                    {" "}
                    <Box mt={4}>
                      <Box className={classes.containerBox} align="center">
                        <Box mt={2} align="left">
                          <label className={classes.label}>Current Password</label>
                          <TextField
                            className={`${classes.inputvalue} ${classes.search} textFeilds`}
                            placeholder="Enter your current  password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            
                            value={values.oldpassword}
                            name="oldpassword"
                            inputProps={{ minLength: 8, maxLength: 16 }}
                            error={Boolean(
                              touched.oldpassword && errors.oldpassword
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
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
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
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
                            {touched.oldpassword && errors.oldpassword}
                            {errorMessage}
                          </FormHelperText>
                        </Box>
                        <Box mt={2} align="left">
                          <label className={classes.label}>New Passsword</label>
                          <TextField
                            className={`${classes.inputvalue} ${classes.search} textFeilds`}
                            placeholder="Enter Your new Password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            name="password"
                            inputProps={{ minLength: 8, maxLength: 16 }}
                            value={values.password}
                            // placeholder="Enter your password"
                            error={Boolean(touched.password && errors.password)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword1 ? "text" : "password"}
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
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
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
                            {touched.password && errors.password && (
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                <ul
                                  style={{
                                    padding: "0px 0px 0px 19px",
                                    marginTop: "0px",
                                  }}
                                >
                                  <para>
                                    Must contain 8 characters, one uppercase,
                                    one lowercase, one number and one special
                                    case character
                                  </para>
                                </ul>
                              </FormHelperText>
                            )}
                          </FormHelperText>
                        </Box>
                        <Box mt={2} align="left">
                          <label className={classes.label}>
                            Confirm Passsword
                          </label>
                          <TextField
                            className={`${classes.inputvalue} ${classes.search} textFeilds`}
                            placeholder="Re-Enter Your new Password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            value={values.confirm}
                            name="confirm"
                            inputProps={{ minLength: 8, maxLength: 16 }}
                            error={Boolean(touched.confirm && errors.confirm)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword2 ? "text" : "password"}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword2(!showPassword2)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword2 ? (
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
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
                            {touched.confirm && errors.confirm}
                          </FormHelperText>
                        </Box>

                        <Box mt={3}>
                          <Button
                            type="submit"
                            className={classes.buttonbox}
                            disabled={isLoading}
                            style={{
                              padding: "10px 40px",
                              borderRadius: "8px",
                            }}
                          >
                            Update {isLoading && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Page >
    </>
  );
};

export default ChangePassword;
