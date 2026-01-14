import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { Form, Formik } from "formik";
import * as yep from "yup";

import Axios from "axios";
import ApiConfig from "src/config/APIConfig";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  bannerbox: {
    padding: "50px",
    // [theme.breakpoints.up("xs")]: {
    //   padding: "20px",
    // },
  },

  heading: {
    fontWeight: "400 !important",
    fontSize: "16px",
    color: "#8B5CF6",
  },
  contentDiv: {
    height: "auto",
    borderRadius: "7.88px",
    marginTop: "13px",
    flexWrap: "nowrap",
    gap: "20px",
    display: 'flex',



    "@media(max-width:1000px)": {
      flexDirection: 'column',
    }
  },
  imgDiv: {
    width: "100%",
    maxWidth: "197px",
    maxHeight: "177px",
    height: "100%",
    color: "black",
    borderRadius: "7.88px",
    padding: "0 !important",
    "& .itemImage": {
      width: "100%",
      maxWidth: "197px",
      maxHeight: "177px",
      height: "100%",
    },
  },
  prodheading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "25.216px",
    lineHeight: "38px",
    color: "#8B5CF6",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25.216px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "25.216px",
    },
  },
  price: {
    color: "#FF6B35",
    fontSize: "24px",
    fontWeight: "600 !important",
    whiteSpace: 'nowrap',
  },
  currency: {
    color: "#FF6B35",
    fontSize: "24px",
    fontWeight: "600 !important",
    whiteSpace: 'nowrap',
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
    color: "#242424",
    fontSize: "16px",
    fontWeight: "400 !imporatant",
  },
  location: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15.76px",
    lineHeight: "24px",
    color: "#6D28D9",
    [theme.breakpoints.up("lg")]: {
      fontSize: "25.216px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25.216px",
    },
    [theme.breakpoints.up("xs")]: {
      fontSize: "12.76px",
    },
  },
  buyButton: {
    background: "#FF6B35",
    width: "135px",
  },
  soldButton: {
    border: "1px solid #FF6B35",
    color: "#000",
    width: "135px",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
  },
  divEight: {
    background: "#7B2CBF",
    maxWidth: "680px",
    height: "auto",
    borderRadius: "5px",
    padding: "10px",
  },
  paymentGrid: {
    paddingTop: "50px",
    gap: "1rem",
  },
  typomain: {
    color: "#fff",
    fontSize: "20px",
    paddingLeft: "10px",
  },
  typomainpayment: {
    color: "#707070",
    fontSize: "16px",
    fontWeight: "400 !important",
  },

  typomethod: {
    // color: "#242424",
    // fontSize: "16px",
    // fontWeight: "400 !important",

    "& .MuiTypography-body1": {
      color: "#242424",
      fontSize: "16px",
      fontWeight: "400 !important",
      marginLeft:'10px',
    },
  },

  // radioClass: {
  //   "&.MuiFormGroup-root": {
  //     flexDirection: "row",
  //   },
  // },
  // radioLabel: {
  //   "&.MuiIconButton-label": {
  //     color: "#fff",
  //   },
  // },

  paymentBox: {
    width: "100%",
    minWidth: "150px",
    height: "auto",
    left: "766px",
    top: "347px",
    padding: "10px",
    background: "#7B2CBF",
    borderRadius: "5px",
  },
  borderDiv: {
    borderBottom: "2px solid #fff",
  },
  postGrid: {
    paddingTop: "10px",
  },
  submitButton: {
    background: "#FF6B35",
    width: "100%",
    height: "54px",
    color: "#242424",
    fontSize: "16px",
    fontWeight: "600 !important",
  },
  amountcss: {
    color: " #707070",
    fontSize: "14px",
    fontWeight: "400 !important",
  },

  textFeilds: {
    "&.MuiOutlinedInput - root": {
      border: "1.24051px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "6px !important",
    },
  },
  boxCard: {
    cursor: "pointer",
    width: "290px",
    height: "179px",
    background: "#FFFFFF",
    border: "1px solid #000000",
  },
  addNew: {
    color: "#000",
    textAlign: "center",
    paddingTop: "28%",
  },
  dialogBox: {
    "& .MuiDialog-paperScrollPaper": {
      top: "0px",
      maxWidth: "375px",
      width: "100%",
      maxHeight: "575px",
      height: "100%",
      borderRadius: "20px",
    },
  },
  newCard: {
    textAlign: "center",
    color: "#7B2CBF",
    fontSize: "18px",
    paddingTop: "35px",
  },
  TextBox: {
    "& .MuiInputBase-input": {
      padding: "18px !important",
      height: "30px",
      borderRadius: "8px",
      border: "1px solid #E8ECF4",
      background: " #F7F8F9",
      color: "#242424",
      fontSize: "15px",
      fontWeight: "500 !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "& .MuiOutlinedInput-input::placeholder": {
      color: "#707070",
      fontSize: "15px",
      fontWeight: "400 !important",
      opactiy: "0.5",
    },

    "& input:-webkit-autofill": {
      '-webkit-text-fill-color': '#333 !important',
    },
},

  textFieldDate: {
    border: "1px solid grey",
    borderRadius: "6px",
  },

  btnContinue: {
    background: "#FF6B35",
    width: "100%",
    height: "54px",
    color: "#242424",
    fontSize: "16px",
    fontWeight: "600 !important",
  },

  couponerrmsg: {
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "#f44336",
  },
  locationGrid: {
    paddingTop: "19px",
    justifyContent: "left",
    display: "flex",
  },

  imageContainer: {
    width: "100%",
    maxWidth: "200px",
  },

  leftGridItem: {
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    height: "100%",

    "@media(max-width:1000px)": {
      flexBasis: '100%',
      maxWidth: '100%',
    }
  },
  leftBoxShadow: {
    display: "flex",
    gap: "20px",
    flexDirection: "column",
    padding: '14px',
  },

  rightGridItem: {


    "@media(max-width:1000px)": {
      flexBasis: '100%',
      maxWidth: '100%',
    }
  },

  boxShadow: {
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
    padding: '14px',
  },

  productCard: {
    display: "flex",
    gap: "20px",
    borderBottom: "1px solid rgba(112, 112, 112, 0.3)",
  },
  taxContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  horizontalRow: {
    border: "1px solid #707070",
    opacity: "0.3",
    marginTop: "10px",
  },

  totalContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    "& p": {
      color: "#242424",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },

  postingFeesContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  totalPaymentContainer: {
    width: "100%",
    maxWidth: "230px",
    marginLeft: "auto",
  },

  nameLocationAndPrice: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  nameAndDetailsContainer: {
    width: "100%",
  },
  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400 !important",
  },
  currencyText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400 !important",
  },
  descriptionContainer: {
    marginTop: "20px",
  },
  paymentDetailsText: {
    color: "#8B5CF6",
    fontSize: "24px",
    fontWeight: "600 !important",
  },
  radioButton: {
    appearance: "none",
    width: "20px",
    height: "20px",
    border: "1px solid #8B5CF6",
    borderRadius: "50%",
    cursor: 'pointer',
    margin: '0',
    marginLeft:'10px',

    '&::before': {
      content: '""',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#FF6B35',
      display: 'block',
    },
    '&:checked::before': {
      display: 'block',
    },
  },

  radioButtonSecond: {
    appearance: "none",
    width: "20px",
    height: "20px",
    border: "1px solid #8B5CF6",
    borderRadius: "50%",
    cursor: 'pointer',
    margin: '0',
    marginLeft:'10px',

    '&::before': {
      content: '""',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#FF6B35',
      display: 'none',
    },
    '&:checked::before': {
      display: 'none',
    },

  },

  secureCheckout: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",

    "& p": {
      color: "#707070",
      fontSize: "14px",
      fontWeight: "400 !important",
    },
  },
  buttonAndTextContainer: {
    marginTop: "20px",
  },
  textfieldlabel: {
    color: "#242424",
    fontSize: "16px",
    fontWeight: "400 !important",
  },
  bottomTextContainer: {
    marginTop: "20px",
  },
}));
const PaymentAds = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [paymentType] = useState("coupon");
  const [value, setValue] = useState("coupon");
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [imageFront, setImageFront] = useState("");
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [couponData, setCouponData] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [couponloader, setCouponLoader] = useState(false);
  const [couponerror, setCouponError] = useState("");
  const [showFullBody, setShowFullBody] = useState(false);

  const handleClickViewMore = () => {
    setShowFullBody(!showFullBody);
  };

  // eslint-disable-next-line no-unused-vars
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) { };
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const getPaymentPOST = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.checkoutProduct,
        headers: {
          token: token,
        },
        params: {
          productId: localStorage.getItem("productId"),
        },
      });

      if (res.data.responseCode === 200) {
        setData(res.data.result);
        setProductImage(res.data.result.productImage[0]);
      } else {
    
      }
    } catch (error) {
      
    }
  };

  const couponPOST = async () => {
    const token = localStorage.getItem("token");
    if (!(coupon === null || coupon === "")) {
      setCouponLoader(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.applyCoupon,
          headers: {
            token: token,
          },
          params: {
            productId: localStorage.getItem("productId"),
            CouponCode: coupon,
          },
        });

        if (res.data.responseCode === 200) {
          setCouponError("");
          setCouponData(res.data.result);
          toast.success(res.data.responseMessage);
          setCouponLoader(false);
          history.push("/");
        } else {
          setCouponLoader(false);
          toast.error(res?.data?.responseMessage);
        }
      } catch (error) {
        setCouponLoader(false);
        toast.error(error?.response?.data?.responseMessage);
      }
    } else {
      setCouponError("Please enter the coupon");
    }
  };
  useEffect(() => {
    getPaymentPOST();
  }, []);

  const handleFormSubmit = () => { };

  return (
    <Page title={"Settings"}>
      <Box className={classes.bannerbox}>
        <Grid container>
          <Grid item lg={6} md={6}>
            {" "}
            <Box style={{ cursor: "pointer" }}>
              <Typography className={classes.heading}>
                <Typography component="span" className={classes.heading} style={{ cursor: "pointer" }} onClick={() => {
                  history.push("/")
                }}> Home </Typography> {'>'} Post ads {'>'} Billing
              </Typography>
              <div className={classes.border}></div>
            </Box>
          </Grid>

        </Grid>

        <Grid container className={classes.contentDiv}>
          <Grid item xs={12} sm={12} md={8} className={classes.leftGridItem}>
            <Box className={classes.leftBoxShadow}>


              <Box className={classes.productCard}>
                <Box className={classes.imageContainer}>
                  <img
                    className="itemImage"
                    src={productImage}
                    alt="Product"
                  ></img>
                </Box>

                <Box className={classes.nameAndDetailsContainer}>
                  <Box className={classes.nameLocationAndPrice}>
                    <Box className={classes.nameAndLocationContainer}>
                      <Typography className={classes.prodheading}>
                        {data?.productName
                          ? data?.productName.length > 50
                            ? data?.productName.slice(0, 50) + "..."
                            : data?.productName
                          : "--"}
                      </Typography>

                      <Typography className={classes.location}>
                        {data.location}
                      </Typography>
                    </Box>
                    <Box className={classes.priceContainer} >
                      <Typography className={classes.priceText}>price  currency</Typography>
                      <Typography className={classes.price}>
                        {data.price ? data.price : "--"}
                        {data.currency ? data.currency : "--"}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box className={classes.descriptionContainer}>
                    <Typography className={classes.description}>
                      {data.description &&
                        data.description.length > 50
                        ? showFullBody
                          ? data.description
                          : data.description.slice(0, 50) +
                          "..."
                        : data.description || "--"}
                      {data.description &&
                        data.description.length > 50 && (
                          <Button
                            style={{
                              color: showFullBody
                                ? "#004e63"
                                : "#8B5CF6",
                              //border: showFullCategoryName ? '1px solid red' : '1px solid blue',
                            }}
                            className={classes.ViewMoreLink}
                            onClick={handleClickViewMore}
                          >
                            {showFullBody
                              ? "View Less"
                              : "View More"}
                          </Button>
                        )}
                      {/* {data.description
                      ? data.description.length > 50
                        ? data.description.slice(0, 50) + "..."
                        : data.description
                      : "--"} */}
                    </Typography>
                  </Box>
                </Box>

              </Box>

              <Box className={classes.totalPaymentContainer}>
                <Box className={classes.postingFeesContainer}>
                  <Typography className={classes.typomainpayment}>
                    Posting Fees :
                  </Typography>

                  <Typography className={classes.typomainpayment}>
                    {data.postingFees}
                    {data.currency ? data.currency : "--"}
                  </Typography>
                </Box>

                <Box className={classes.taxContainer}>
                  <Typography className={classes.typomainpayment}>
                    Tax :
                  </Typography>

                  <Typography className={classes.typomainpayment}>
                    {data.tax}
                    {data.currency ? data.currency : "--"}
                  </Typography>
                </Box>

                <Box className={classes.horizontalRow}></Box>

                <Box className={classes.totalContainer}>
                  <Typography>Total(Tax Incl) :</Typography>

                  <Typography>
                  {data.price ? data.price : "--"}
                  {data.currency ? data.currency : "--"}</Typography>
                </Box>
              </Box>
            </Box>

          </Grid>

          <Grid item xs={12} sm={12} md={4} className={classes.rightGridItem}>
            <Box className={classes.boxShadow}>



              <Box className={classes.paymentDeatilsContainer}>
                <Typography className={classes.paymentDetailsText}>
                  Payment Details
                </Typography>
              </Box>

              <Box className={classes.paymentMethodContainer}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="payment"
                    name="payment"
                    value={value}
                    onChange={handleChange}
                    className={classes.radioClass}
                  >
                    <FormControlLabel
                      value="iban"
                      // control={<Radio className={classes.radioButton} />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButtonSecond} />}
                      label="IBAN"
                      className={classes.typomethod}
                    // onClick={() => {
                    //   setPaymentFirst(false);
                    //   setPaymentSecond(false);
                    //   setPaymentThird(false);
                    //   setOpen(false);
                    //   setPaymentType("iban");
                    // }}
                    />
                    <FormControlLabel
                      value="mastercard"
                      // control={<Radio className={classes.radioButton} />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButtonSecond} />}
                      label="Mastercard/Visa card"
                      className={classes.typomethod}
                    // onClick={() => {
                    //   setPaymentFirst(false);
                    //   setPaymentSecond(false);
                    //   setPaymentThird(false);
                    //   setPaymentType("mastercard");
                    // }}
                    />
                    <FormControlLabel
                      value="coupon"
                      // control={<Radio className={classes.radioButton} />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButton} />}
                      label="Coupon Code"
                      className={classes.typomethod}
                    // onClick={() => {
                    //   setPaymentFirst(false);
                    //   setPaymentSecond(false);
                    //   setPaymentThird(true);
                    //   setPaymentType("coupon");
                    // }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>



              {open && (
                <Box className={classes.masterCardDetails}>
                  <Box>
                    <Typography className={classes.newCard}>
                      Add new card
                    </Typography>
                  </Box>
                  <Box>
                    <Formik
                      onSubmit={(values) => handleFormSubmit(values)}
                      // initialValues={formInitialSchema}
                      //  initialValues={{
                      //    email: "",
                      //    password: "",
                      //  }}

                      initialStatus={{
                        success: false,
                        successMsg: "",
                      }}
                      validationSchema={yep.object().shape({
                        adharNo: yep
                          .string()
                          .required("Please enter your phone number")
                          // .matches(
                          //   /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                          //   "Must be a valid mobile"
                          // )
                          .max(13, "Should not exceeds 13 digits")
                          .min(9, "Must be only 9 digits"),
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
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              style={{ paddingTop: "30px" }}
                            >
                              <Typography className={classes.textfieldlabel}>
                                Cardholder Name{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                id="card "
                                size="small"
                                placeholder="Enter the name on the card"
                                inputProps={{ maxLength: 256 }}
                                // value={values.name}
                                name="card"
                                className="textFeilds"
                                error={Boolean(touched.card && errors.card)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                InputProps={{
                                  className: classes.TextBox,
                                }}
                              />
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.card && errors.card}
                              </FormHelperText>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                              <Typography className={classes.textfieldlabel}>
                                Card Number<span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                id="name "
                                size="small"
                                placeholder="Enter the 16-digit number"
                                inputProps={{ maxLength: 256 }}
                                // value={values.name}
                                name="name"
                                className="textFeilds"
                                error={Boolean(touched.name && errors.name)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                InputProps={{
                                  className: classes.TextBox,
                                }}
                              />
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.name && errors.name}
                              </FormHelperText>
                            </Grid>

                            <Grid
                              container
                              spacing={2}
                              style={{ paddingTop: "30px" }}
                            >
                              <Grid item lg={6}>
                                <TextField
                                  id="date"
                                  type="date"
                                  defaultValue="2017-05-24"
                                  className={classes.textFieldDate}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item lg={6}>
                                <TextField
                                  id="date"
                                  type="date"
                                  defaultValue="2017-05-24"
                                  className={classes.textFieldDate}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              md={12}
                              lg={12}
                              style={{ paddingTop: "30px" }}
                            >
                              <Typography className={classes.textfieldlabel}>
                                Security Code
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                id="cvv "
                                size="small"
                                placeholder="Enter the CVV (4 digit code)"
                                inputProps={{ maxLength: 256 }}
                                // value={values.name}
                                name="cvv"
                                className="textFeilds"
                                error={Boolean(touched.cvv && errors.cvv)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                InputProps={{
                                  className: classes.TextBox,
                                }}
                              />
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.cvv && errors.cvv}
                              </FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                              <Box className={classes.SubmitBtnBox} mt={2}>
                                <Button
                                  type="submit"
                                  className={classes.submitButton}
                                //disabled={isloading}
                                // onClick={() => history.push("/dashboard")}
                                >
                                  Add Card
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Box>
              )}

              <Box className={classes.paymentTypeContainer}>
                {paymentType === "iban" && (
                  <Grid container style={{ gap: "1.5rem" }}>
                    <Grid item xs={12} md={12}>
                      <Typography className={classes.specific}>
                        Recipient's IBAN (Organization) <span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Enter recipient’s IBAN number"
                        fullWidth
                        id="name "
                        size="small"
                        inputProps={{ maxLength: 256 }}
                        name="name"
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography className={classes.specific}>
                        Sender’s IBAN (Yours) <span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        placeholder="Please enter your IBAN number"
                        id="name "
                        size="small"
                        inputProps={{ maxLength: 256 }}
                        name="name"
                        className="textFeilds"
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography className={classes.specific}>
                        Amount<span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        placeholder="Please Enter Amount"
                        id="name "
                        size="small"
                        inputProps={{ maxLength: 256 }}
                        name="name"
                        className="textFeilds"
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}

                {paymentType === "mastercard" && (
                  <Grid container style={{ gap: "1.5rem" }}>

                    <Grid item lg={4}>
                      {!open && (
                        <Box
                          className={classes.boxCard}
                          onClick={() => setOpen(true)}
                        >
                          <Typography className={classes.addNew}>
                            + Add New Card
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item lg={4}></Grid>
                  </Grid>
                )}

                {paymentType === "coupon" && (
                  <Grid container style={{ gap: "1.5rem" }}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography className={classes.specific}>
                        Enter Coupon Code
                      </Typography>
                      <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Enter Coupon Code"
                        fullWidth
                        id="name "
                        size="small"
                        inputProps={{ pattern: "[A-Z0-9]{1,}", maxLength: 8 }}
                        name="name"
                        className="textFeilds"
                        //onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                        }}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          if (!(e.target.value.trim() === "")) {
                            setCouponError("");
                          }
                        }}
                      />
                      <Box>
                        {couponerror ? (
                          <>
                            {" "}
                            <span className={classes.couponerrmsg}>
                              {couponerror}
                            </span>{" "}
                          </>
                        ) : null}
                      </Box>
                    </Grid>
                  </Grid>
                )}

              </Box>

              <Box className={classes.buttonAndTextContainer}>
                <Button
                  className={classes.btnContinue}
                  disable={couponloader}
                  onClick={() => couponPOST()}
                >
                  Purchase {couponloader && <ButtonCircularProgress />}{" "}
                </Button>

                <Box className={classes.secureCheckout}>
                  <img src="images/secure-lock.svg" alt="Lock" />
                  <Typography>Secure Checkout</Typography>
                </Box>
              </Box>
            </Box>

            <Box className={classes.bottomTextContainer}>
              <Typography className={classes.amountcss}>
                *Amount to be paid by the user for posting the <br></br> advertisement.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default PaymentAds;
