import { Typography, Box, Grid, TextField, Button, FormHelperText } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { DropzoneArea } from "material-ui-dropzone";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer } from "react-toastify";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { MenuItem, Select, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    borderRadius: "20px",
    padding: "20px 0px",
    "& h5": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "25px",
      lineHeight: "54px",
      color: "#000000",
    },
    "& h5": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "18px",
      lineHeight: "54px",
      color: "#000000",
    },
    "& h4": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      /* identical to box height */

      color: "#0C576C",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
       
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "27px",
       
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 16px 20px 16px",
      borderRadius: "16px",
    },
  },

  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
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
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
  },
  colorbox: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    height: "auto",
    "& .MuiDropzoneArea-root": {
      width: "100% !important",
      maxWidth: "174px !important",
    },
    "& .MuiDropzoneArea-text": {
      display: "none",
    },
    "& .MuiDropzoneArea-textContainer ": {
      marginTop: "55px",
    },
    "& h2": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "36px",
      lineHeight: "54px",
      color: "#FFFFFF",
    },
    "& h3": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FFFFFF",
    },
    "& img": {
      width: "100%",
    },
  },
  tableButton: {
    border: "none",
    background: "#0C576C ",
    borderRadius: "10px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "14px",
    lineHeight: "21px",
    border: "none",
    height: "36px",
    /* identical to box height */
    maxWidth: "230px",
    color: "#FFFFFF",
  },

  colorbox: {
    "& .MuiDropzoneArea-textContainer": {
      display: "block",
    },
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      height: "fit-content",
      // borderRadius: "50%",
      width: "100%",
    },
  },
  colorbox1: {
    // color: "#1D2D3F",
    color: theme.palette.text.primary,
    // height: "auto",
    "& .MuiDropzonePreviewList-image": {
      height: "100%",
      maxHeight:'300px'
    },
    "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
      padding: "0px",
    },
    "& .MuiGrid-spacing-xs-8": {
      margin: "0px",
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiGrid-grid-xs-4": {
      flexBasis: "100% !important",
      maxWidth: "100%",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      top: "3px",
      right: "63px",
    },
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      height: "160px",
      width: "160px",
      // borderRadius: "50%",
      width: "100%",
      maxWidth:"80%",
    },
    "& .MuiDropzonePreviewList-imageContainer": {
      textAlign: "left",
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [couponAmount,setCouponAmount] = useState();
  const [maxUser, setMaxUser] = useState();
  const [currency, setcurrency] = useState();
  const [numberOfCoupons, setcnumberOfCoupons] = useState();
  const [couponPercentage, setcouponPercentage] = useState();

  const formInitialSchema = {
    companyname: "",
    title: "",
    description: "",
    maxUser: "",
    currency: "",
    numberOfCoupons: "",
    couponPercentage: "",

  };
  
  const handleBack = () => {
    history.push("/Coupon-Management");
  };

  const handleFormSubmit = async (values) => {  
    console.log("func called") 
    setLoader(true);
    try {
      console.log("try")
      const res = await Axios({
        method: "POST",
        url: ApiConfig.generatecoupon,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          couponAmount: values.companyname,
          maxUsage: values.maxUser,
          currency: values.currency,
          numberOfCoupons: values.numberOfCoupons,
          couponPercentage: values.couponPercentage,
        },
      });
      if (res.data.responseCode === 200) {
        setLoader(false);
        
        toast.success("Coupon generated successfully");

        setTimeout(() => {
          history.push("/generate-coupon")
        }, 1000);
      } else if (res.data.responseCode === 500) {
        setLoader(false);
        setCouponAmount(" ");
        setcurrency(" ");
        //setcnumberOfCoupons(" "),
        //setcouponPercentage(" ")
        toast.success("Server Error");
        toast.error(
          "Cannot reach internet. Please check your device internet connections."
        );
      } else {
        toast.warn(res.data.message);
        setLoader(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setLoader(false);
      if (error.res) {
        toast.error(error.response.data.responseMessage);
      }
    }
  };

  return (
    <Page title={"Create-Roles"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Generate Coupon</Typography>
          </Grid>
          <Formik
            onSubmit={(values) => handleFormSubmit(values)}
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({

              companyname: yep
                .string()
                .max(256)
                .required("Please enter Coupon amount."),
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
                <Box mt={2}> 
                  <Box>
                    <label className={classes.label}>
                      Coupon Amount <span className={classes.redText}>*</span>
                    </label>
                    <TextField
                      placeholder="Coupon Amount"
                      type="number"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 5);
                          setCouponAmount(couponAmount);
                      }}

                      variant="outlined"
                      fullWidth
                      id="role"
                      size="small"
                      value={values.companyname}
                      name="companyname"
                      inputProps={{maxLength:"5"}}
                      className="textFeilds"
                      onChange={handleChange}
                      InputProps={{
                        className: classes.TextBox,
                      }}
                    />
                    <FormHelperText
                      error
                      style={{ fontSize: "12px", fontFamily: "Poppins" }}
                    >
                      {touched.companyname && errors.companyname}
                    </FormHelperText>
                  </Box>
                  <Box>
                  <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          Maximun Users <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Maximun Users"
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 5);
                            setMaxUser(maxUser);
                          }}
                          inputProps={{
                            maxLength: "8"
                          }}
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={values.maxUser}
                          name="maxUser"
                          className="textFeilds"
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        >
                          {touched.maxUser && errors.maxUser}
                        </FormHelperText>
                      </Grid>
                      </Box>
                      <Box>
                  <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                        coupon Percent % <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="coupon Percent %"
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 5);
                            setcouponPercentage(couponPercentage);
                          }}
                          inputProps={{
                            maxLength: "8"
                          }}
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={values.couponPercentage}
                          name="couponPercentage"
                          className="textFeilds"
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        >
                          {touched.couponPercentage && errors.couponPercentage}
                        </FormHelperText>
                      </Grid>
                      </Box>


                      <Box>
                  <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          Number of coupons <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="Enter Number of Coupons"
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 5);
                            setcnumberOfCoupons(numberOfCoupons);
                          }}
                          inputProps={{
                            maxLength: "8"
                          }}
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={values.numberOfCoupons}
                          name="numberOfCoupons"
                          className="textFeilds"
                          onChange={handleChange}
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        >
                          {touched.numberOfCoupons && errors.numberOfCoupons}
                        </FormHelperText>
                      </Grid>
                      </Box>
                      <Box>
                      <Grid item xs={12}>
                          <Box className={classes.FromTable1}>
                            <label className={classes.label}>
                            currency
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <FormControl
                              variant="outlined"
                              fullWidth
                              className={classes.forminput}
                            >
                              <Select
                               margin="dense"
                               name="currency"
                               id="currency"
                               type="string"
                               className={classes.Selectcurrency}
                               inputProps={{
                               classes: {
                                icon: classes.icon,
                               },
                               }}
                              onChange={handleChange}
                              value={values.currency}
                               onBlur={handleBlur}
                                 >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="TRY">TRY</MenuItem>
                              </Select>
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.currency && errors.currency}
                              </FormHelperText>
                            </FormControl>
                            
                          </Box>
                        </Grid>
                      </Box>
                  <Box mt={4}>
                    <Grid container spacing={2} style={{ alignItems: "center" }}>
                      <Grid item md={6} xs={12} align="center">
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          className={classes.tableButton}
                          //onClick={() => handleRestore()}
                        >
                          Generate
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={12} align="center">
                        <Button
                          variant="contained"
                          fullWidth
                          style={{ background: "red" }}
                          className={classes.tableButton}
                          onClick={() => handleBack()}
                        >
                          Back
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Page>
  );
}
