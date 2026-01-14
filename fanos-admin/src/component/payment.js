import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Dialog,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { DropzoneArea } from "material-ui-dropzone";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  bannerbox: {
    padding: "50px",

    // [theme.breakpoints.down("sm")]: {
    //   padding: "45px 21px 0px 34px",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   padding: "20px",
    // },
  },

  heading2: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "25px",
    color: "#0C576C",
  },
  headingPayment: {
    fontFamily: "Poppins !important",
    fontWeight: "900 !important",
    fontSize: "28px",
    lineHeight: "27px",
    color: "#0C576C",
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

  leftBoxShadow:{
    display: "flex",
    gap: "20px",
    flexDirection: "column",
    padding:'14px',
  },

  productCard: {
    display: "flex",
    gap: "20px",
    borderBottom: "1px solid rgba(112, 112, 112, 0.3)",
  },

  imageContainer: {
    width: "100%",
    maxWidth: "200px",
  },

  nameAndDetailsContainer: {
    width: "100%",
  },

  nameLocationAndPrice: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: '20px'
  },

  imgDiv: {
    width: "100%",
    maxWidth: "197px",
    maxHeight: "177px",
    height: "100%",
    borderRadius: "7.88px",
    padding: "0 !important",
    "& .itemImage": {
      width: "100%",
      maxWidth: "197px",
      maxHeight: "177px",
      height: "100%",
    },
  },
  heading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "38px",
    color: "#0C576C",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  price: {
    color: "#D39B2D",
    fontSize: "24px",
    fontWeight: "600 !important",
    whiteSpace: 'nowrap'
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
  divEight: {
    background: "#04191F",
    width: "96%",
    maxWidth: "742px",
    height: "96%",
    borderRadius: "5px",
    padding: "10px",
    height: "100%",
    maxHeight: "10.9em",
    "@media (min-width:820px) and (max-width:960px)": {
      maxWidth: "881px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      maxHeight: "none",
    },
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
    color: "#fff",
    fontSize: "16px",
    paddingLeft: "10px",
  },
  typomethod: {
    color: "#D39B2D",
    fontSize: "13px",
    paddingLeft: "10px",
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
    width: "96%",
    height: "100%",
    maxHeight: "177px",
    left: "766px",
    top: "347px",
    padding: "10px",
    background: "#04191F",
    borderRadius: "5px",
    overflow: "scroll",
    height: "100%",
    maxHeight: "10.9em",
  },
  borderDiv: {
    borderBottom: "2px solid #fff",
  },
  postGrid: {
    paddingTop: "10px",
  },

  btnContinue: {
    background: "#D39B2D",
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
  contentBox: {
    maxHeight: "145px",
    height: "auto",
    background: "#04191F",
    borderRadius: "5px",
    marginTop: "17px",
  },
  dialogBox: {
    "& .MuiDialog-paperWidthSm": {
      width: "500px",
      height: "auto",
      padding: "15px !important",
      borderRadius: "10px",
      top: "0px",
    },
  },
  textLeft: {
    color: "#fff",
  },
  homeText: {
    background: "#fff",
    color: "#D39B2D",
    borderRadius: "5px",
    maxWidth: "64px",
    width: "100%",
    height: "27px",
    padding: "5px",
    textAlign: "center",
  },
  dialogEdit: {
    "& .MuiDialog-paper": {
      width: "1200px !important",
      top: "0px",
      height: "fit-content",
      borderRadius: "10px",
    },
  },
  label: {
    marginTop: "0px",
    color: "#fff",
  },
  textFeilds: {
    "& .MuiOutlinedInput-root": {
      border: "0.2px solid #fff",
    },
  },
  addressButtonSelected: {
    color: "#FFFFFF",
    width: "100%",
    height: "38px",
    fontSize: "14px",
    maxWidth: "172px",
    background: "#D39B2D",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "15px",
    borderRadius: "5px",
  },
  addressButton: {
    color: "#FFFFFF",
    width: "100%",
    height: "38px",
    fontSize: "14px",
    maxWidth: "172px",
    background: "transparent",
    border: "2px solid #D39B2D",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "15px",
    borderRadius: "5px",
  },
  submitButton2: {
    background: "#D39B2D",
    width: "100%",
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
  },

  TextBoxA: {
    "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
    {
      color: "#000 !important",
    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#000 !important",
    },
  },
  couponerrmsg: {
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "#f44336",
  },
  couponTextField: {
    width: "95%",
  },
  paymentGridHeading: {
    paddingTop: "20px",
  },
  customFormControlLabelRoot: {
    marginLeft: "0",
    marginTop: "0",
    marginBottom:'10px',

    "& .MuiFormControlLabel-root":{
      display:'flex !important',
      alignItems:'center !important',
      gap:'10px !important',
    },

  },

  selectTextField: {
    "& .MuiSelect-outlined": {
      border: "0.2px solid #fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "none !important",
      border: "none",
    },
    ".MuiSelect-select:focus": {
      backgroundColor: "none !important",
    },
  },
  dialogContent: {
    "& .MuiDialog-paperWidthSm": {
      borderRadius: "11px",
      background: "#0C576C",
      width: "100%",
      maxWidth: "400px",
    },
  },
  deleteBox: {
    padding: "10px 30px 26px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutTypoHeading: {
    marginTop: "10px",
    textAlign: "center",
    color: "#D39B2D",
    fontSize: "21.009px",
    fontWeight: "600",
  },
  logoutTypo: {
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "21.009px",
  },

  typomethod: {
    color: "#242424",
    fontSize: "16px",
    fontWeight: "400 !important",
    marginLeft:'10px',

    "& .MuiTypography-body1": {
      color: "#242424",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },

  gridButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },

  priceText: {
    color: "#707070",
    fontSize: "12px",
    fontWeight: "400 !important",
  },

  descriptionContainer: {
    marginTop: "20px",
  },

  totalPaymentContainer: {
    width: "100%",
    maxWidth: "230px",
    marginLeft: "auto",
  },

  rightGridItem: {
    "@media(max-width:1000px)": {
      flexBasis: '100%',
      maxWidth: '100%',
    }
  },

  boxShadow:{
    padding:'12px',
    borderRadius: "7.794px",
    background: "#FFF",
    boxShadow:
      "0px 0px 1.15416px 0px rgba(9, 30, 66, 0.30), 0px 11.54162px 20.77491px 0px rgba(9, 30, 66, 0.15)",
  },

  subTotalContainer: {
    widht: "100%",
    display: "flex",
    justifyContent: "space-between",
    "& p": {
      color: "#707070",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },

  deliveryContainer: {
    widht: "100%",
    display: "flex",
    justifyContent: "space-between",

    "& p": {
      color: "#707070",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },

  totalContainer: {
    widht: "100%",
    display: "flex",
    justifyContent: "space-between",

    "& p": {
      color: "#242424",
      fontSize: "16px",
      fontWeight: "400 !important",
    },
  },

  horizontalRow: {
    border: "1px solid #707070",
    opacity: "0.3",
    marginTop: "10px",
  },

  paymentDetailsText: {
    color: "#0C576C",
    fontSize: "24px",
    fontWeight: " 600 !imporatant",
  },

  radioButton: {
    appearance: "none",
    width: "20px",
    height: "20px",
    border: "1px solid #0C576C",
    borderRadius: "50%",
    cursor:'pointer',
    margin:'0',

    '&::before': {
      content: '""',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '12px', 
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#D39B2D',
      display: 'block',
    },
    '&:checked::before': {
      display: 'block',
    },
  },

  radioButtonSecond:{
    appearance: "none",
    width: "20px",
    height: "20px",
    border: "1px solid #0C576C",
    borderRadius: "50%",
    cursor:'pointer',
    margin:'0',

    '&::before': {
      content: '""',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '10px', // Size of the inner dot
      height: '10px', // Size of the inner dot
      borderRadius: '50%',
      backgroundColor: 'gold', // Filled dot color
      display: 'none',
    },
    '&:checked::before': {
      display: 'block',
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

  bottomTextContainer: {
    marginTop: "20px",
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
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();

  const [paymentType, setPaymentType] = useState("coupon");
  const [value, setValue] = useState("coupon");
  const [imageFront, setImageFront] = useState("");
  const [open, setOpen] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [viewProduct, setViewProduct] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [allValues, setAllValues] = useState({});
  const [homeSelected, setHomeSelected] = useState("");
  const [homeSelectedPost, setHomeSelectedPost] = useState("HOME");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [addressId, setAddressId] = useState("");
  const [openAddress, setOpenAddress] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [addressline, setAddressLine] = useState([]);
  const [pincodeIndex, setPincodeIndex] = useState([]);
  const [loader, setLoader] = useState(false);
  const [couponloader, setCouponLoader] = useState(false);
  const [couponerror, setCouponError] = useState("");
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [countryType, setCountryType] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [showFullBody, setShowFullBody] = useState(false);

  const handleClickViewMore = () => {
    setShowFullBody(!showFullBody);
  };

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
  const handleEditAddress = (ID, type, value) => {
    setOpenEditDialog(true);
    setAddressId(ID);
    setCountryCode(allValues?.countryCode);
    setHomeSelected(value.addressType);
    setAllValues(value);
  };
  const handleCloseEditAddress = () => {
    setOpenEditDialog(false);
  };

  const handleEditClose = () => {
    setOpenAddress(false);
  };
  const handleAddress = () => {
    setOpenAddress(true);
  };

  const closeSuccessHandle = () => {
    setOpenSuccess(false);
  };
  const handleEditFormSubmit = async (values) => {
    setLoader(true);
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.updateAddress,
        headers: {
          token: token,
        },
        data: {
          _id: addressId,
          name: values.name,
          countryCode: countryCode,
          mobileNumber: values.phoneNo,
          addressType: homeSelected,
          addressLine1: values.address1,
          addressLine2: values.address2,
          city: values.city,
          state: values.state,
          pincode: values.zipcode.toString(),
        },
      });
      if (res.data.responseCode == 200) {
        toast.success(res.data.responseMessage);
        handleCloseEditAddress();
        getAllAddressList();
        setInterval(() => {
          history.push("/payment");
        }, 5000);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.response.data.responseMessage);
      setLoader(false);
    }
  };

  const getProductCheckout = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.updateCheckout,
        headers: {
          token: token,
        },
        params: {
          productId: sessionStorage.getItem("idPay"),
        },
      });

      if (res.data.responseCode == 200) {
        setStatusData(res.data.result);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const viewProductPayment = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewProduct,
        params: {
          productId: sessionStorage.getItem("idPay"),
        },
      });

      if (res.data.responseCode == 200) {
        setViewProduct(res.data.result);
        setProductImage(res.data.result.productImage[0]);
      }
    } catch (error) { }
  };

  const getAllAddressList = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getAddressList,
        headers: {
          token: token,
        },
      });
   
      if (res.data.responseCode == 200) {
        setAddressList(res.data?.result);
        setAddressLine(res.data?.result[0].addressLine1);
        setPincodeIndex(res.data?.result[0].pincode);
      } else {
   
      }
    } catch (error) {
  
    }
  };

  const checkoutOrderAPI = async () => {
    const token = localStorage.getItem("token");
    if (!(coupon == null || coupon == "")) {
      setCouponLoader(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.checkoutOrder,
          headers: {
            token: token,
          },
          params: {
            productId: sessionStorage.getItem("idPay"),
            shippingAddressId: localStorage.getItem("shipId"),
            paymentMethod: "COUPONCODE",
            couponCode: coupon,
          },
        });

        if (res.data.responseCode == 200) {
          setOpenSuccess(true);
          setCouponError("");
          setTimeout(() => {
            history.push("/");
          }, 3000);
          toast.success(res.data.responseMessage);
          setCouponLoader(false);
        } else {
          toast.error(res.data.responseMessage);
          setCouponLoader(false);
        }
      } catch (error) {
        setCouponLoader(false);
        if (
          error.response.data.responseMessage ==
          '"shippingAddressId" is required'
        )
          toast.error("Please add shipping address.");
        else {
          toast.error(error.response.data.responseMessage);
        }
      }
    } else {
      setCouponError("Enter coupon code");
    }
  };

  const AddAddresses = async (values) => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addAddress,
        headers: {
          token: token,
        },
        data: {
          name: values.name,
          countryCode: countryCode,
          mobileNumber: values.phoneNo,
          addressType: homeSelectedPost,
          addressLine1: values.address1,
          addressLine2: values.address2,
          city: values.city,
          state: values.state,
          pincode: values.zipcode,
        },
      });

      if (res.data.responseCode == 200) {
        setLoader(false);

        toast.success(res.data.responseMessage);
        // setIsLoading(false);
        handleEditClose();
        getAllAddressList();
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.responseMessage);
    }
  };

  useEffect(() => {
    getProductCheckout();
    viewProductPayment();
    getAllAddressList();
  }, []);
  const handleGetCountry = async () => {
    try {
      const res = await Axios.get(`${ApiConfig.getCountry}`, {
        method: "GET",
      });

      if (res?.data?.message == "Successfully retrieved countries") {
        setCountry(res.data.data);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    handleGetCountry();
  }, []);
  useEffect(() => {
    handleGetState();
  }, [countryType]);

  const handleGetState = async () => {
    try {
      const res = await Axios.get(`${ApiConfig.getstates}/${countryType}`, {
        method: "GET",
      });
      if (res?.status === 200) {
        setState(res.data.data);
      }
    } catch (error) {
  
    }
  };

  {
    addressList.map((value) => {
      localStorage.setItem("shipId", value._id);
    });
  }

  return (
    <>
      <Page title={"Settings"}>
        <Box className={classes.bannerbox}>
          <Grid container alignItems="center">
            <Box style={{ marginTop: "5px" }}></Box>&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box style={{ cursor: "pointer" }}>
                <Typography
                  className={classes.heading}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Home&nbsp;&gt;&nbsp;
                  {viewProduct?.productName
                    ? viewProduct?.productName.length > 20
                      ? viewProduct?.productName.slice(0, 20) + "..."
                      : viewProduct?.productName
                    : "--"}
                  &nbsp;&gt;&nbsp;Hatchback Billing
                </Typography>
                <div className={classes.border}></div>
              </Box>
            </Grid>
          </Grid>

          <Grid container className={classes.contentDiv}>
            <Grid item xs={12} md={8} className={classes.leftGridItem}>
              <Box className={classes.leftBoxShadow}>

            
              <Box className={classes.productCard}>
                <Box className={classes.imageContainer}>
                  <img
                    className="itemImage"
                    src={productImage}
                    alt="No image"
                  ></img>
                </Box>

                <Box className={classes.nameAndDetailsContainer}>
                  <Box className={classes.nameLocationAndPrice}>
                    <Box className={classes.nameAndLocationContainer}>
                      <Typography className={classes.heading2}>
                        {viewProduct?.productName
                          ? viewProduct?.productName?.length > 60
                            ? viewProduct?.productName
                            : viewProduct?.productName
                          : "--"}
                      </Typography>
                      <Typography className={classes.location}>
                        {viewProduct.location ? viewProduct.location : "--"}
                      </Typography>
                    </Box>

                    <Box className={classes.priceContainer}>
                      <Typography className={classes.priceText}>
                        Price
                      </Typography>
                      <Typography className={classes.price}>
                         {viewProduct.price ? viewProduct.price : "--"}{viewProduct.currency ? viewProduct.currency : "--"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={classes.descriptionContainer}>
                    <Typography className={classes.description}>
                      {viewProduct?.description &&
                        viewProduct?.description.length > 50
                        ? showFullBody
                          ? viewProduct?.description
                          : viewProduct?.description.slice(0, 50) +
                          "..."
                        : viewProduct?.description || "--"}

                      {viewProduct?.description &&
                        viewProduct?.description.length > 50 && (
                          <Button
                            style={{
                              color: showFullBody
                                ? "#004e63"
                                : "#0C576C",
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

                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className={classes.totalPaymentContainer}>
                <Box className={classes.subTotalContainer}>
                  <Typography className={classes.typomainpayment}>
                    Sub Total:
                  </Typography>

                  <Typography className={classes.typomainpayment}>
                    {statusData.subTotal ? statusData.subTotal : "--"}{viewProduct.currency ? viewProduct.currency : "--"}
                  </Typography>
                </Box>
                <Box className={classes.deliveryContainer}>
                  <Typography className={classes.typomainpayment}>
                    Delivery:
                  </Typography>
                  <Typography className={classes.typomainpayment}>
                    {" "}
                    {statusData.deliveryCharge
                      ? statusData.deliveryCharge
                      : "--"}{viewProduct.currency ? viewProduct.currency : "--"}
                  </Typography>
                </Box>

                <Box className={classes.horizontalRow}></Box>

                <Box className={classes.totalContainer}>
                  <Typography className={classes.typomainpayment}>
                    Total Amount:
                  </Typography>

                  <Typography className={classes.typomainpayment}>
                    {" "}
                    {statusData.totalPaymentAmount
                      ? statusData.totalPaymentAmount
                      : "--"}{viewProduct.currency ? viewProduct.currency : "--"}
                  </Typography>
                </Box>
              </Box>

              </Box>

            </Grid>

            <Grid item xs={12} md={4} className={classes.rightGridItem}>
              <Box className={classes.boxShadow}>

      
              <Box className={classes.paymentDetailsContainer}>
                <Typography className={classes.paymentDetailsText}>
                  Payment Details
                </Typography>
              </Box>

              <Box className={classes.paymentMethodContainer}>
                <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
                  <RadioGroup
                    aria-label="payment"
                    name="payment"
                    value={value}
                    onChange={handleChange}
                    className={classes.radioClass}
                  >
                    <FormControlLabel
                      value="iban"
                      // control={<Radio color='primary'  className={classes.radioButton}  />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButtonSecond} />}
                      disabled={true}
                      className={classes.customFormControlLabelRoot}
                      label={<span className={classes.typomethod}>IBAN</span>}
                    // onClick={() => {
                    //   setPaymentType("iban");
                    // }}
                    />
                    <FormControlLabel
                      value="mastercard"
                      // control={<Radio color='primary'  className={classes.radioButton} />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButtonSecond} />}
                      className={classes.customFormControlLabelRoot}
                      label={
                        <span className={classes.typomethod}>
                          Mastercard/Visa card
                        </span>
                      }
                      disabled={true}
                    // onClick={() => {
                    //   setPaymentType("mastercard");
                    // }}
                    />
                    <FormControlLabel
                      value="coupon"
                      // control={<Radio  color='primary' className={classes.radioButton} />}
                      control={<input type="radio" name="paymentMethod" className={classes.radioButton} />}
                      className={classes.customFormControlLabelRoot}
                      label={
                        <span className={classes.typomethod}>Coupon Code</span>
                      }
                      onClick={() => {
                        setPaymentType("coupon");
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box className={classes.paymentTypeContainer}>
                {paymentType == "iban" && (
                  <Grid container style={{ gap: "1.5rem" }}>
                    <Grid item xs={12} md={12}>
                      <Typography className={classes.specific}>
                        Recipient's IBAN (Organization)
                        <span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        placeholder="Please Enter Recipient's IBAN Number"
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
                        Sender’s IBAN (Yours)
                        <span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Please Enter Your IBAN Number "
                        fullWidth
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

                    <Grid item md={12} xs={12}>
                      <Typography className={classes.specific}>
                        Amount<span style={{ color: "red" }}>*</span>
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Please Enter Amount"
                        fullWidth
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

                {paymentType == "mastercard" && (
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

                {paymentType == "coupon" && (
                  <Grid container style={{ gap: "1.5rem" }}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography className={classes.specific}>
                        Enter Coupon Code
                      </Typography>

                      <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        id="name "
                        size="small"
                        inputProps={{ maxLength: 8 }}
                        placeholder="Please Enter Coupon Code"
                        name="name"
                        InputProps={{
                          className: classes.TextBox,
                        }}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          if (!(e.target.value.trim() == "")) {
                            setCouponError("");
                          }
                        }}
                      />

                      <Box>
                        {" "}
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
                  type="submit"
                  disabled={couponloader}
                  onClick={() => checkoutOrderAPI()}
                >
                  Purchase {couponloader && <ButtonCircularProgress />}
                </Button>
                <Box className={classes.secureCheckout}>
                  <img src="images/secure-lock.svg" alt="lock image" />
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



          {/* <Grid container className={classes.paymentGrid} spacing={2}>
            <Grid item lg={3} md={3} xs={12} style={{ paddingBottom: "5px" }}>
              <Box className={classes.paymentBox}>
                <Grid container>
                  <Grid>
                    <Typography className={classes.typomain}>
                      Shipping address
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.postGrid}>
                  <Grid item lg={6}>
                    <Typography className={classes.typomainpayment}>
                      {addressline ? addressline.slice(0, 30) + "..." : "--"}
                      &nbsp;&nbsp;&nbsp; {pincodeIndex ? pincodeIndex : "--"}
                    </Typography>
                  </Grid>
                  <Grid item lg={6}></Grid>
                </Grid>
                <Grid container className={classes.postGrid}></Grid>

                <Grid container className={classes.postGrid}>
                  <Grid item lg={6} style={{ paddingLeft: "10px" }}>
                    <Typography
                      className={classes.typomainpayment}
                      onClick={() => setOpen(true)}
                      style={{
                        border: "2px solid #D39B2D",
                        width: "80px",
                        cursor: "pointer",
                      }}
                    >
                      Change
                    </Typography>
                  </Grid>
                  <Grid item lg={6}></Grid>
                </Grid>
              </Box>
                    </Grid> */}

          {open && (
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              className={classes.dialogBox}
            >
              {addressList?.map((value) => {
                return (
                  <>
                    <Box className={classes.contentBox}>
                      <Grid
                        container
                        style={{
                          padding: "20px",
                          height: "100%",
                          maxHeight: "10rem",
                        }}
                      >
                        <Grid item xs={4} md={3}>
                          <Typography className={classes.textLeft}>
                            {value.name.length > 15
                              ? value?.name.slice(0, 15) + "..."
                              : value?.name}
                            <br />
                            {value.addressLine1.length > 15
                              ? value?.addressLine1.slice(0, 15) + "..."
                              : value?.addressLine1}
                            <br />
                            {value.city.length > 10
                              ? value?.city.slice(0, 10) + "..."
                              : value?.city}
                            {", "}
                            {value.state.length > 12
                              ? value?.state.slice(0, 12) + "..."
                              : value?.state}
                            <br />
                            {value.pincode}
                            <br />
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={6}>
                          <Typography className={classes.homeText}>
                            {value.addressType}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} md={3} className={classes.flexGrid}>
                          <Grid item lg={12}>
                            <FormControlLabel
                              value="Checked"
                              control={<Radio />}
                              className={classes.typomethod}
                              style={{ paddingLeft: "22px" }}
                              onClick={() => { }}
                            />
                          </Grid>
                          <Grid className={classes.EditDeleteGrid}>
                            <Button
                              className={classes.editButtonStyle}
                              onClick={() =>
                                handleEditAddress(
                                  value._id,
                                  value.addressType,
                                  value
                                )
                              }
                            >
                              Edit
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                );
              })}

              <div className={classes.contentBox}>
                <Typography
                  onClick={() => handleAddress(true)}
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  {" "}
                  Add New +
                </Typography>
              </div>
            </Dialog>
          )}
        </Box>
      </Page>

      <Dialog
        open={openAddress}
        onClose={handleEditClose}
        className={classes.dialogEdit}
      >
        <Box style={{ padding: "40px", background: "#0C576C" }}>
          <Page title={"Settings"}>
            <Box className={classes.bannerboxAdd}>
              <Formik
                onSubmit={(values) => AddAddresses(values)}
                //initialValues={formInitialSchema}
                initialValues={{
                  name: "",
                  phoneNo: "",
                  address1: "",
                  address2: "",
                  city: "",
                  State: "",
                  country: "",
                  zipcode: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  phoneNo: yep
                    .string()
                    .required("Please enter your phone number")

                    .max(13, "Should not exceeds 13 digits")
                    .min(9, "Must be only 9 digits"),

                  name: yep
                    .string()
                    .required("Please enter your name")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "You can enter only 35 characters")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address1: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address2: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  city: yep.string().required("Please enter your city"),

                  country: yep.string().required("Please select the country"),
                  State: yep.string().required("Please select the state"),

                  zipcode: yep
                    .string()
                    .required("Please enter the zipcode")
                    .max(6, "Should not exceeds 6 digits"),
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
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Full Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          // id="name"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.name}
                          name="name"
                          className={classes.textFeilds}
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
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "-9px",
                              // marginBottom: "17px",
                            }}
                          >
                            <label
                              className={classes.label}
                              style={{ marginBottom: "4px" }}
                            >
                              Mobile Number{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <PhoneInput
                              style={{ marginTop: "11px" }}
                              name="phoneNo"
                              inputStyle={{
                                background: "transparent",
                                color: "#FFFFFF",
                                border: "1px solid #FFFFFF",
                                height: "44px",
                                borderRadius: "10px",
                                width: "98%",
                              }}
                              value={values.mobileNumber}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
                              className="textPhoneInput"
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
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            {" "}
                            <label className={classes.label}>
                              Type of Address
                            </label>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelectedPost("HOME");
                              }}
                              className={
                                homeSelectedPost === "HOME"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Home
                            </Button>{" "}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelectedPost("WORK");
                              }}
                              className={
                                homeSelectedPost === "WORK"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Work
                            </Button>{" "}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelectedPost("OTHER");
                              }}
                              className={
                                homeSelectedPost === "OTHER"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Other
                            </Button>{" "}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <label className={classes.label}>
                          Address Line 1 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          id="address1"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.address1}
                          name="address1"
                          className={classes.textFeilds}
                          error={Boolean(touched.address1 && errors.address1)}
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
                          {touched.address1 && errors.address1}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <label className={classes.label}>
                          Address Line 2 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          id="address2"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.address2}
                          name="address2"
                          className={classes.textFeilds}
                          error={Boolean(touched.address2 && errors.address2)}
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
                          {touched.address2 && errors.address2}
                        </FormHelperText>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>Country</label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="country"
                              name="country"
                              displayEmpty
                              className={classes.selectTextField}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              onChange={(e) => {
                                handleChange(e);
                                setCountryType(e.target.value);
                              }}
                              onBlur={handleBlur}
                              value={values.country}
                              error={touched.country && Boolean(errors.country)}
                            >
                              <MenuItem
                                value=""
                                className={classes.menuItemstyle}
                              >
                                Select Country
                              </MenuItem>
                              {country.map((value) => (
                                <MenuItem
                                  key={value.countryId}
                                  value={value.countryId}
                                  className={classes.menuItemstyle}
                                >
                                  {value.countryName}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.country && errors.country}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>State</label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="State"
                              name="State"
                              displayEmpty
                              className={classes.selectTextField}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.State}
                              error={touched.State && Boolean(errors.State)}
                            >
                              <MenuItem
                                value=""
                                className={classes.menuItemstyle}
                              >
                                Select State
                              </MenuItem>
                              {state.map((value) => (
                                <MenuItem
                                  key={value.state}
                                  value={value.state}
                                  className={classes.menuItemstyle}
                                >
                                  {value.state}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.State && errors.State}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          City <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          id="city"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.city}
                          name="city"
                          className={classes.textFeilds}
                          error={Boolean(touched.city && errors.city)}
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
                          {touched.city && errors.city}
                        </FormHelperText>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Zipcode <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          id="zipcode"
                          size="small"
                          inputProps={{ maxLength: 6 }}
                          value={values.zipcode}
                          name="zipcode"
                          className={classes.textFeilds}
                          error={Boolean(touched.zipcode && errors.zipcode)}
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
                          {touched.zipcode && errors.zipcode}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.SubmitBtn}>
                          <Button
                            type="submit"
                            className={classes.submitButton2}
                            disabled={loader}
                          >
                            Add Address
                            {loader && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Page>
        </Box>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditAddress}
        className={classes.dialogEdit}
      >
        <Box style={{ padding: "40px", background: "#0C576C" }}>
          <Page title={"Settings"}>
            <Box className={classes.bannerboxEdit}>
              <Formik
                onSubmit={(values) => handleEditFormSubmit(values)}
                initialValues={{
                  name: allValues?.name,
                  phoneNo: allValues?.mobileNumber,
                  address1: allValues?.addressLine1,
                  address2: allValues?.addressLine2,
                  city: allValues?.city,
                  country: allValues?.country,
                  State: allValues?.state,
                  zipcode: allValues?.pincode,
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  phoneNo: yep
                    .string()
                    .required("Please enter your phone number")

                    .max(13, "Should not exceeds 13 digits")
                    .min(9, "Must be only 9 digits"),

                  name: yep
                    .string()
                    .required("Please enter your name")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "You can enter only 35 characters")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address1: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address2: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  city: yep.string().required("Please enter your city"),

                  country: yep.string().required("Please select the country"),
                  State: yep.string().required("Please select the state"),

                  zipcode: yep
                    .string()
                    .required("Please enter the zipcode")
                    .max(6, "Should not exceeds 6 digits"),
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
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Full Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          placeholder=""
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.name}
                          name="name"
                          className={classes.textFeilds}
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
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <Box
                            style={{
                              width: "100%",
                              marginTop: "-9px",
                            }}
                          >
                            <label
                              className={classes.label}
                              style={{ marginBottom: "4px" }}
                            >
                              Mobile Number{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <PhoneInput
                              style={{ marginTop: "11px" }}
                              // country={"in"}
                              placeholder=""
                              name="phoneNo"
                              inputStyle={{
                                background: "transparent",
                                color: "#FFFFFF",
                                border: "1px solid #FFFFFF",
                                height: "44px",
                                borderRadius: "10px",
                                width: "98%",
                              }}
                              value={values.phoneNo}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
                              className="textPhoneInput"
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
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12}>
                            {" "}
                            <label className={classes.label}>
                              Type of Address
                            </label>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelected("HOME");
                              }}
                              className={
                                homeSelected === "HOME"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Home
                            </Button>{" "}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelected("WORK");
                              }}
                              className={
                                homeSelected === "WORK"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Work
                            </Button>{" "}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            {" "}
                            <Button
                              onClick={() => {
                                setHomeSelected("OTHER");
                              }}
                              className={
                                homeSelected === "OTHER"
                                  ? classes.addressButtonSelected
                                  : classes.addressButton
                              }
                            >
                              Other
                            </Button>{" "}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <label className={classes.label}>
                          Address Line 1 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          id="address1"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.address1}
                          name="address1"
                          className={classes.textFeilds}
                          error={Boolean(touched.address1 && errors.address1)}
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
                          {touched.address1 && errors.address1}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <label className={classes.label}>
                          Address Line 2 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder=""
                          fullWidth
                          id="address2"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.address2}
                          name="address2"
                          className={classes.textFeilds}
                          error={Boolean(touched.address2 && errors.address2)}
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
                          {touched.address2 && errors.address2}
                        </FormHelperText>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>Country</label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="country"
                              name="country"
                              displayEmpty
                              className={classes.selectTextField}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              onChange={(e) => {
                                handleChange(e);
                                setCountryType(e.target.value);
                              }}
                              onBlur={handleBlur}
                              value={values.country}
                              error={touched.country && Boolean(errors.country)}
                            >
                              <MenuItem
                                value=""
                                className={classes.menuItemstyle}
                              >
                                Select Country
                              </MenuItem>
                              {country.map((value) => (
                                <MenuItem
                                  key={value.countryId}
                                  value={value.countryId}
                                  className={classes.menuItemstyle}
                                >
                                  {value.countryName}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.country && errors.country}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>State</label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="State"
                              name="State"
                              displayEmpty
                              className={classes.selectTextField}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.State}
                              error={touched.State && Boolean(errors.State)}
                            >
                              <MenuItem
                                value=""
                                className={classes.menuItemstyle}
                              >
                                Select State
                              </MenuItem>
                              {state.map((value) => (
                                <MenuItem
                                  key={value.state}
                                  value={value.state}
                                  className={classes.menuItemstyle}
                                >
                                  {value.state}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText
                              error
                              style={{
                                fontSize: "12px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {touched.State && errors.State}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          City <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder=""
                          fullWidth
                          id="city"
                          size="small"
                          inputProps={{ maxLength: 256 }}
                          value={values.city}
                          name="city"
                          className={classes.textFeilds}
                          error={Boolean(touched.city && errors.city)}
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
                          {touched.city && errors.city}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Zipcode <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          fullWidth
                          placeholder=""
                          id="zipcode"
                          size="small"
                          inputProps={{ maxLength: 6 }}
                          value={values.zipcode}
                          name="zipcode"
                          className={classes.textFeilds}
                          error={Boolean(touched.zipcode && errors.zipcode)}
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
                          {touched.zipcode && errors.zipcode}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.SubmitBtn}>
                          <Button
                            type="submit"
                            className={classes.submitButton2}
                          >
                            Edit Address
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Page>
        </Box>
      </Dialog>

      <Dialog
        open={openSuccess}
        onClose={closeSuccessHandle}
        className={classes.dialogContent}
      >
        <Box className={classes.deleteBox}>
          <div>
            <img src="/images/newThankYou.png" alt="" />
          </div>
          <Typography className={classes.logoutTypoHeading}>
            Your Order is Complete!
          </Typography>
          <Typography
            className={classes.logoutTypo}
            style={{
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            You will be receiving a confirmation email with order details.
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
