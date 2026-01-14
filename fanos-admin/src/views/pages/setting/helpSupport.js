import {
  Typography,
  Box,
  Button,
  Grid,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "27px",
    color: "#000000",
  },
  contentDiv: {
    height: "197px",
    boxShadow: "0px 4.02545px 6.03817px -1.00636px rgba(231, 64, 0, 0.1)",
    borderRadius: "7.88px",
    marginTop: "13px",
  },
  imgDiv: {
    width: "100%",
    maxWidth: "197px",
    height: "197px",
    borderRadius: "7.88px",
    padding: "0 !important",
    "& .itemImage": {
      width: "100%",
      maxWidth: "197px",
      height: "197px",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "25.216px",
    lineHeight: "38px",
    color: "#0C576C",
  },
  price: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "28.368px",
    lineHeight: "43px",
    color: "#D39B2D",
  },
  description: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000000",
  },
  footerDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {},
  specific: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.88px",
    textTransform: "uppercase",
    color: "#002F34",
  },
  location: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15.76px",
    lineHeight: "24px",
    color: "#0A2830",
  },
  buyButton: {
    background: "#D39B2D",
    width: "135px",
  },
  soldButton: {
    border: "1px solid #D39B2D",
    color: "#000",
    width: "135px",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
  },
  helpText: {
    color: "#0A2830",

    [theme.breakpoints.up("xs")]: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },

    [theme.breakpoints.up("lg")]: {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
  },
  subhelpText: {
    color: "#D39B2D",

    [theme.breakpoints.up("xs")]: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },

    [theme.breakpoints.up("lg")]: {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
  },

  label: {
    color: "#242424",
    fontSize: "16px",
    fontWeight: "500",
  },

  submitButton: {
    width: "100%",
    maxWidth:'329px',
    height: "57px",
    background: "#D39B2D",
    borderRadius: "6px",
    color: "var(--Black, #242424)",
    fontSize: "16px",
    fontWeight: "600 !important",

  },
  TextBox: {
    "& .MuiInputBase-input": {
      padding: "18px !important",
      height: "30px",
      borderRadius: "8px",
      border: "1px solid #E8ECF4",
      background: " #F7F8F9",
      color:'#242424',
      fontSize: "15px",
      fontWeight: "500 !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "& .MuiOutlinedInput-input::placeholder":{
      color: "#707070",
      fontSize: "15px",
      fontWeight: "400 !important",
      opactiy:'0.5',
     
    },

    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#000 !important",
    },

  },
  TextAreaBox:{
    "& .MuiInputBase-input": {
      padding: "18px !important",
      borderRadius: "8px",
      border: "1px solid #E8ECF4",
      background: " #F7F8F9",
      color:'#242424',
      fontSize: "15px",
      fontWeight: "500 !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "& .MuiOutlinedInput-input::placeholder":{
      color: "#707070",
      fontSize: "15px",
      fontWeight: "400 !important",
      opactiy:'0.5',
     
    },

    "& .MuiOutlinedInput-multiline":{
      padding:'0px !important'
    },

    "& .MuiInputBase-multiline":{
      padding:'0px !important'
    },

  },

  SubmitBtnBox:{
    display:'flex',
    justifyContent:'flex-end',
  },

  bannerbox:{
    padding:'0 20px',
  },
  
}));

export default function () {
  const classes = useStyles();
  const history = useHistory();
  const [isloading, setLoader] = useState(false);
  const formInitialSchema = {
    name: "",
    email: "",
    message: "",
  };

  const helpSupport = async (values) => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.contactUs,
        headers: {
          token: token,
        },
        data: {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Updated Successfully");
        history.push("/");
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <Page title={"Settings"}>
      <Box className={classes.bannerbox}>
        {/* <Grid container>
          <Grid item lg={6} md={6}>
            {" "}
            <Box>
              <Typography className={classes.heading}>
                Help and Support
              </Typography>
              <div className={classes.border}></div>
            </Box>
          </Grid>
        </Grid> */}

        {/* <Grid container>
          <Grid item lg={12}>
            <Grid item lg={12}>
              <Typography className={classes.helpText}>
                How can we help you?
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <Typography className={classes.subhelpText}>
                It looks like you are facing problems. We are here to help so
                please get in touch with us.
              </Typography>
            </Grid>
          </Grid>
        </Grid> */}

        <Formik
          onSubmit={(values) => helpSupport(values)}
          initialValues={formInitialSchema}
          // initialValues={{
          //   email: "",
          //   password: "",
          // }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            name: yep.string().required("Please enter your name"),
            // .matches("^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$", "Invalid name"),
            email: yep
              .string()
              .email(
                "You have entered an invalid email address. Please try again"
              )
              .required("Please enter your email address")
              .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),

            message: yep
              .string()
              // .max(16)
              // .min(8, "Message must be at least 8 characters")
              .required("Please enter your message"),
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
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <label className={classes.label}>Name<span style={{color:'red'}}>*</span></label>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    id="name"
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.name}
                    name="name"
                    className="textName"
                    placeholder="Name"
                    error={Boolean(touched.name && errors.name)}
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
                    {touched.name && errors.name}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <label className={classes.label}>Email<span style={{color:'red'}}>*</span></label>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    id="email"
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.email}
                    name="email"
                    className="textEmail"
                    placeholder="Enter your email address"
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

                <Grid item xs={12} md={12} lg={12}>
                  <label className={classes.label}>Message<span style={{color:'red'}}>*</span></label>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={8}
                    id="message"
                    placeholder="Your message.."
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.message}
                    name="message"
                    error={Boolean(touched.message && errors.message)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      className: classes.TextAreaBox,
                      style:{padding:'0'}
                    }}
                  />
                  <FormHelperText
                    error
                    style={{ fontSize: "12px", fontFamily: "Poppins" }}
                  >
                    {touched.message && errors.message}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <Box className={classes.SubmitBtnBox} mt={2}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isloading}
                      onClick={() => helpSupport()}
                    >
                      Save
                      {isloading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Page>
  );
}
