import { Typography, Box, Grid, TextField, Button, FormHelperText, InputAdornment } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ButtonCircularProgress from "../../../component/ButtonCircularProgress";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer } from "react-toastify";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";


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
    borderRadius: "5px",
    height: "42px",
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
    maxWidth: "230px",
    color: "#FFFFFF",
  },
  codeBtn: {
    background: "#0C576C ",
    color: "#FFFFFF",
  },

  colorbox: {
    "& .MuiDropzoneArea-textContainer": {
      display: "block",
    },
    "& .MuiDropzoneArea-root": {
      backgroundColor: "lightgray",
      height: "fit-content",
      width: "100%",
    },
  },
  colorbox1: {
    color: theme.palette.text.primary,
    "& .MuiDropzonePreviewList-image": {
      height: "100%",
      maxHeight: '300px'
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
      width: "100%",
      maxWidth: "80%",
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
  const [couponAmount, setCouponAmount] = useState();
  const [toDate, settoDate] = useState(null);
  const [couponCode, setcouponCode] = useState();
  const [couponCodeErr, setcouponCodeErr] = useState(false);
  const [maxUser, setMaxUser] = useState();
  const [minAmount, setMinAmount] = useState();
  const [idd, setIdd] = useState(props?.location?.state);
  const [historyData, setHistoryData] = useState([]);

  const formInitialSchema = {
    couponAmount: "",
    toDate: "",
    maxUser: "",

  };

  const handleBack = () => {
    history.push("/Coupon-Management");
  };
  const token = localStorage.getItem("token");

  const GetStaticDataByType = async (type) => {
    setLoader(true);
  
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.couponDetails,
        headers: {
          token: token,
      },
        params:{
          _id:idd,
        }
      });
      if (res.data.responseCode === 200) {
        setHistoryData(res.data.result.data);
        setLoader(false);
     
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleFormSubmit = async (values) => {
   
      // console.log("func called")
      setLoader(true);
      try {
        // console.log("try")
        const res = await Axios({
          method: "PUT",
          url: ApiConfig.updateCoupon,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            _id:idd,
            endDate: toDate,
            maxUsage: values.maxUser,
            minimumPurchaseAmount: values.minAmount,
          },
        });
        if (res.data.responseCode === 200) {
          setLoader(false);

          toast.success("Coupon updated successfully");


          history.push("/Coupon-Management")

        } else if (res.data.responseCode === 500) {
          setLoader(false);
          setCouponAmount(" ");
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
  useEffect(() => {
    const id = props?.location?.state?.id;
    GetStaticDataByType( id); 

  }, []);



  return (
    <Page title={"Create-Coupon"}>
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
              maxUser: yep
                .string()
                .max(15)
                .required("Please enter maximum User."),
              minAmount: yep
                .string()
                .max(15)
                .required("Please enter minimum amount."),
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
                    <Grid container spacing={2}>
                      <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          Coupon Code <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="Coupon Code"
                          type="text"
                          maxLength={8}
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={historyData.couponCode}
                          name="couponCode"
                          className={classes.TextBox}
                        />
                      </Grid>

                      <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          Coupon Amount <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="Coupon Amount"
                          type="number"
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={historyData.couponAmount}
                          name="couponAmount"
                          inputProps={{ maxLength: "5" }}
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                        
                      </Grid>

                      <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          From Date <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="DD/MM/YYYY"
                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={moment(historyData.createdAt).format("lll")}
                          name="couponAmount"
                          className="textFeilds"
                          InputProps={{
                            className: classes.TextBox,
                          }}
                        />
                       
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          To Date <span className={classes.redText}>*</span>
                        </label>
                        <KeyboardDatePicker
                          className={`${classes.date} ${classes.search} textFeilds`}
                          InputProps={{
                            className: classes.iconCss,
                          }}
                          placeholder="DD/MM/YYYY"
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          disablePast
                          margin="dense"
                          name="toDate"
                          value={toDate}
                          onChange={(date) => {
                            settoDate(date);

                          }}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", fontFamily: "Poppins" }}
                        >
                          {toDate === null && (errors.toDate || touched.toDate)}
                        </FormHelperText>
                      </Grid>
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
                      <Grid item sm={12} lg={6}>
                        <label className={classes.label}>
                          Minimun Amount <span className={classes.redText}>*</span>
                        </label>
                        <TextField
                          placeholder="Coupon Amount"
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 5);
                            setMinAmount(minAmount);
                          }}

                          variant="outlined"
                          fullWidth
                          id="role"
                          size="small"
                          value={values.minAmount}
                          name="minAmount"
                          inputProps={{ maxLength: "5" }}
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
                          {touched.minAmount && errors.minAmount}
                        </FormHelperText>
                      </Grid>
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
                        >
                          Save {loader ? <ButtonCircularProgress /> : ""}
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
