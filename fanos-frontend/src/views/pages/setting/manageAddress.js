import {
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  TextField,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import * as yep from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import './style.css'
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
  contentBox: {
    maxHeight: "145px",
    height: "100%",
    background: "#7B2CBF",
    borderRadius: "5px",
    marginTop: "17px",
  },
  submitButton: {
    width: "100%",
    height: "55px",
    background: "#FF6B35",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#FFFFFF",
    marginTop: "135px",
  },
  submitButton2: {
    background: "#FF6B35",
    width: "100%",
    maxWidth: "329px",
    height: "57px",
    borderRadius: "6px",
    color: "#242424",
    fontSize: "16px",
    fontWeight: "600",
  },

  flexGrid: {
    textAlign: "right",
  },

  checkIcon: {
    display: "flex",
    justifyContent: "right",
    paddingBottom: "36px",
  },
  EditDeleteGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "right",
    padding: "20px 0 0 0",
  },
  editButtonStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.155556px",
    color: "#FFFFFF",
    cursor: "pointer",
    background: "#FF6B35",
    borderRadius: "3px",
  },
  deleteButtonStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.155556px",
    color: "#FFFFFF !important",
    cursor: "pointer",
    background: "#FF0000",
    borderRadius: "3px",
  },
  textLeft: {
    // maxWidth: "100px",
    width: "100%",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#FFFFFF",
    "@media (max-width: 1020px)": {
      fontSize: "14px",
    },
    "@media (max-width: 500px)": {
      fontSize: "10px",
      lineHeight: "20px",
    },
    "@media (max-width: 350px)": {
      fontSize: "10px",
      lineHeight: "17px",
    },
  },
  homeText: {
    background: "#fff",
    borderRadius: "5px",
    maxWidth: "64px",
    width: "100%",
    height: "27px",
    padding: "2px",
    textAlign: "center",

    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "27px",
    letterSpacing: "-0.155556px",
    color: "#FF6B35",
    "@media (max-width: 1020px)": {
      fontSize: "14px",
      padding: "0px",
    },
    "@media (max-width: 500px)": {
      fontSize: "12px",
      padding: "0px",
    },
  },

  dialogEdit: {
    "& .MuiDialog-paper": {
      maxWidth: "1200px !important",
      width: "auto",
      top: "0px",
      height: "fit-content",
      borderRadius: "10px",
    },
  },
  SubmitBtn: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  label: {
    color: "#242424",
    fontSize: "16px",
    fontWeight: "500 !important",
  },
  textFeilds: {
    "& .MuiOutlinedInput-root": {
      border: "0.2px solid #fff",
    },
  },
  selectTextField: {
    "& .MuiSelect-outlined": {
      padding: "18px !important",
      height: "30px",
      borderRadius: "8px",
      border: "1px solid #E8ECF4",
      background: " #F7F8F9",
      color: "#242424 !important",
      fontSize: "15px",
      fontWeight: "500 !important",
      opacity: "0.5",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "none !important",
      border: "none",
    },

    ".MuiSelect-select:focus": {
      backgroundColor: "none !important",
    },
  },

  addressButtonSelected: {
    color: "#FFFFFF",
    width: "100%",
    height: "38px",
    fontSize: "14px",
    maxWidth: "172px",
    background: "#FF6B35",
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
    border: "2px solid #FF6B35",
    fontStyle: "normal",
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "15px",
    borderRadius: "5px",
  },
  outerDiv: {
    // width: "fit-content",
    top: "0px",
    // height: "fit-content",
    padding: "2rem",
    background: "rgb(12, 87, 108)",
  },
  title: {
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  para: {
    textAlign: "center",
    paddingBottom: "20px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "26.5513px",
    lineHeight: "40px",
    color: "#FFFFFF",
    [theme.breakpoints.up("xs")]: {
      fontSize: "15.55px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "19.55px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "22.55px",
    },
  },
  btnDivision: {
    float: "center",
    display: "flex",
    marginTop: "1rem",
    justifyContent: "space-around",
  },
  backBtn: {
    color: "white",
    background: "#FF6B35",
    padding: "8px 60px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    [theme.breakpoints.up("xs")]: {
      padding: "6px 30px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "8px 60px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "8px 60px",
    },
  },

  typomethod: {
    margin: "0",
    display: "flex",
    justifyContent: "right",
    marginRight: "-10px",
    marginTop: "-6px",
  },

  editBox: { padding: "40px", background: "#8B5CF6" },

  AddAddressbox: {
    padding: "40px",
    // background: "rgb(12, 87, 108)",
    // maxWidth: "700px",
    // width:'100%',
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

    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#000 !important",
    },
  },

  menuItemstyle: {
    color: "black",
    fontSize: "15px",
    fontWeight: "400 !important",
   
  },

  bannerboxMain:{
    padding:'10px 20px',
  },

}));

const ManageAddress = function (props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isloading, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [allValues, setAllValues] = useState({});
  const [addressId, setAddressId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteByID, setDeleteId] = useState();
  const [homeSelected, setHomeSelected] = useState("");
  const [homeSelectedPost] = useState("HOME");
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [countryType, setCountryType] = useState("");

  const handleAddress = () => {
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
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

  // GET ADDRESS API
  const getAddresses = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getAddress,
        headers: {
          token: token,
        },
      });

      if (res.data.responseCode === 200) {
        setData(res.data.result);
      }
    } catch (error) {}
  };

  // ADD ADDRESS API
  const AddAddresses = async (values) => {

    // setLoader(true);
    const token = localStorage.getItem("token");
    let addAddressData = {
      name: values.name,
      countryCode: countryCode,
      mobileNumber: values.phoneNo,
      addressType: homeSelectedPost,
      addressLine1: values.address1,
      addressLine2: values.address2,
      city: values.city,
      state: values.State,
      country: values.country,
      pincode: values.zipcode,
    };
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addAddress,
        headers: {
          token: token,
        },
        data: addAddressData,
      });

      if (res.data.responseCode === 200) {
        setLoader(false);
        toast.success(res.data.responseMessage);

        handleEditClose();
        getAddresses();
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // EDIT ADDRESS API
  const handleEditFormSubmit = async (values) => {
    setLoader(true);
    const token = localStorage.getItem("token");
    let editeddata = {
      _id: addressId,
      name: values.name,
      countryCode: countryCode,
      mobileNumber: values.phoneNo,
      addressType: homeSelected,
      addressLine1: values.address1,
      addressLine2: values.address2,
      city: values.city,
      state: values.State,
      country: values.country,
      pincode: values.zipcode.toString(),
    };
    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.updateAddress,
        headers: {
          token: token,
        },
        data: editeddata,
      });
      if (res.data.responseCode === 200) {
        setLoader(false);
        toast.success(res.data.responseMessage);

        handleCloseEditAddress();
        getAddresses();
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  // DELETE ADDRESS API
  const deleteId = async (id) => {
    setLoader(true);

    try {
      const res = await Axios({
        method: "DELETE",
        url: ApiConfig.deleteAddress,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          addressId: id,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success("Deleted Successfully.");
        getAddresses();
        setOpenDelete(false);
        setLoader(false);
      }
    } catch (error) {}
  };
  const handleCloseDeletePopup = () => {
    setOpenDelete(false);
  };
  const handleDeletePopup = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };

  const handleGetCountry = async () => {
    try {
      const res = await Axios.get(`${ApiConfig.getCountry}`, {
        method: "GET",
      });

      if (res?.data?.message === "Successfully retrieved countries") {
        setCountry(res.data.data);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    getAddresses();
    handleGetCountry();
  }, []);
  useEffect(() => {
    handleGetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <>
      <Page title={"Settings"}>
        <Box className={classes.bannerboxMain}>
          <Box>
            {/* <Typography className={classes.heading}>Manage address</Typography> */}
            <div className={classes.border}></div>
          </Box>

          {data?.map((value) => {
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
                          onClick={() => {}}
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
                        <Button
                          className={classes.deleteButtonStyle}
                          style={{ color: "#cc011f" }}
                          onClick={() => handleDeletePopup(value._id)}
                        >
                          Delete
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
              }}
            >
              {" "}
              Add New +
            </Typography>
          </div>
        </Box>
      </Page>

      {/* Add Dialog */}

      <Dialog
        open={open}
        onClose={handleEditClose}
        className={classes.dialogEdit}
      >
        <Box className={classes.AddAddressbox}>
          <Page title={"Settings"}>
            <Box className={classes.bannerbox}>
              <Formik
                onSubmit={(values) => AddAddresses(values)}
                initialValues={{
                  name: "",
                  phoneNo: "",
                  address1: "",
                  address2: "",
                  city: "",
                  zipcode: "",
                  country: "",
                  State: "",
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
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address1: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address2: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  city: yep.string().required("Please enter your city"),

                  zipcode: yep
                    .string()
                    .required("Please enter the zipcode")
                    .max(6, "Should not exceeds 6 digits"),
                  country: yep.string().required("Please select the country"),
                  State: yep.string().required("Please select the state"),
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
                          Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder="Enter Name"
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
                            }}
                          >
                            <label className={classes.label}>
                              Mobile Number{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <PhoneInput
                              style={{ marginTop: "11px" }}
                              country={"in"}
                              name="phoneNo"
                              inputClass="custom-phone-input" 
                              placeholder="Enter Mobile Number"
                              value={values.mobileNumber}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
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

                      {/* <Grid item xs={12}>
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
                      </Grid> */}

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Address Line 1 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder="Enter Address"
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

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Address Line 2 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder="Enter Address"
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
                          <label className={classes.label}>
                            Country<span style={{ color: "red" }}>*</span>
                          </label>
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
                          <label className={classes.label}>
                            State<span style={{ color: "red" }}>*</span>
                          </label>
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
                          placeholder="Enter City"
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
                          placeholder="Enter Zipcode"
                          fullWidth
                          id="zipcode"
                          size="small"
                          inputProps={{ maxLength: 10 }}
                          value={values.zipcode}
                          name="zipcode"
                          className={classes.textFeilds}
                          error={Boolean(touched.zipcode && errors.zipcode)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // onInput={(e) => {
                          //   e.target.value = Math.max(
                          //     0,
                          //     parseInt(e.target.value)
                          //   )
                          //     .toString()
                          //     .slice(0, 6);
                          // }}
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
                            disabled={isloading}
                            // onClick={() => history.push("/dashboard")}
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
        </Box>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditAddress}
        className={classes.dialogEdit}
      >
        <Box
          style={{ padding: "40px"}}
        >
          <Page title={"Settings"}>
            <Box className={classes.bannerbox}>
              <Formik
                onSubmit={(values) => handleEditFormSubmit(values)}
                initialValues={{
                  name: allValues?.name,
                  phoneNo: allValues?.mobileNumber,
                  address1: allValues?.addressLine1,
                  address2: allValues?.addressLine2,
                  city: allValues?.city,
                  zipcode: allValues?.pincode,
                  country: allValues?.country,
                  State: allValues?.state,
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
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address1: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  address2: yep
                    .string()
                    .required("Please enter your address")
                    .min(2, "Please enter at least 2 characters")
                    .max(256, "")
                    .matches(
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                      "Only alphabets and whitespaces are allowed for this field number are not. "
                    ),

                  city: yep.string().required("Please enter your city"),
                  zipcode: yep
                    .string()
                    .required("Please enter the zipcode")
                    .max(6, "Should not exceeds 6 digits"),
                  country: yep.string().required("Please select the country"),
                  State: yep.string().required("Please select the state"),
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
                         Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder='Enter Name'
                          fullWidth
                          id="name"
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
                            <TextField
                              // country={"in"}
                              // country={allValues?.countryCode}
                              name="phoneNo"
                              placeholder='Enter Mobile Number'
                              id="phoneNo"

                              value={values.phoneNo}
                              error={Boolean(touched.phoneNo && errors.phoneNo)}
                              onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("phoneNo", phone);
                              }}
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

                      {/* <Grid item xs={12}>
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
                      </Grid> */}

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Address Line 1 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          
                          variant="outlined"
                          placeholder='Enter Address'
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

                      <Grid item xs={12} md={6}>
                        <label className={classes.label}>
                          Address Line 2 <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          type="text"
                          variant="outlined"
                          placeholder='Enter Address'
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
                          placeholder='Enter Address'
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
                          // onInput={(e) => {
                          //   e.target.value = Math.max(
                          //     0,
                          //     parseInt(e.target.value)
                          //   )
                          //     .toString()
                          //     .slice(0, 6);
                          // }}
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
                            disabled={isloading}
                            // onClick={() => history.push("/dashboard")}
                          >
                            Edit
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
        </Box>
      </Dialog>

      {/* Delete Dialog */}
      {openDelete && (
        <Dialog
          open={openDelete}
          onClose={handleCloseDeletePopup}
          className={classes.dialogEdit}
        >
          <Box className={classes.outerDiv}>
            {/* <h1 className={classes.title}>Confirmation</h1> */}
            <p className={classes.para}>
              Are you sure you want to delete this Address?
            </p>
            <div className={classes.btnDivision}>
              <div
                className={classes.backBtn}
                onClick={() => deleteId(deleteByID)}
                disabled={isloading}

                // onClick={() => handleCloseDeletePopup()}
              >
                YES {isloading && <ButtonCircularProgress />}
              </div>
              <div
                className={classes.backBtn}
                onClick={() => handleCloseDeletePopup()}
              >
                NO
              </div>
            </div>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default ManageAddress;
