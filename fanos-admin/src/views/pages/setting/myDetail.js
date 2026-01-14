import {
  Box,
  Grid,
  FormHelperText,
  FormControl,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import './style.css'
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { DropzoneArea } from "material-ui-dropzone";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  label: {
    color: "#242424",
    fontSize: "16px",
    fontWeight: "500 !important",
  },
  TextBoxPhone:{
    "& .react-tel-input":{
      padding: "18px !important",
      height: "30px !important",
      borderRadius: "8px",
      border: "1px solid #E8ECF4",
      background: " #F7F8F9",
      color:'#242424',
      fontSize: "15px",
      fontWeight: "500 !important",
    }
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
  
  addressButton: {
    background: "#D39B2D",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "172px",
    height: "38px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
  },
  textPhoneInput: {
    "&.special-label": {
      display: "none",
    },
  },
 
  dropZoneArea: {
    display:'flex',
    gap:'20px',
    "& .MuiGrid-container": {
      display: "block !important",
    },
    "& .MuiGrid-grid-xs-4": {
      maxWidth: "100%",
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none",
    },
    "& .MuiDropzonePreviewList-image": {
      height: "170px",
      maxHeight: "170px",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      top: "31px",
      right: "35px",
      width: "40px",
      height: "40px",
      opacity: 0,
      position: "absolute",
      transition: ".5s ease",
    },
    "& .MuiTypography-h5": {
      fontSize: "14px !important",
      color: "#000 !important",
    },
  },

 
  dropZoneNone: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
    height: "100%",

    "& .MuiDropzoneArea-textContainer": {
      padding: "10px",
    },
    "& .MuiDropzoneArea-root": {
      borderRadius: "17px",
      width:'fit-content !important'
    },
  },
  prevImg: {
    width: "150px",
    height: "150px",
  
    borderRadius:'50%'
  },
 
  buttonRemove: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "15px",
    textAlign: "center",
    color: "#FFFFFF",
    background: "#0C576C",
    border: "none",
    borderRadius: "5px",
    padding: "6px",
    maxWidth: "75px",
  },
  btnFlex: {
    display: "flex",
    justifyContent: "end",
  },
  phoneInpt: {
    "& .form-control ": {
      "& ::placeholder": {
     
        color: "red !important",
      },
    },
    "& ::placeholder": {
     
      color: "grey !important",
    },

  
  },
  Name: {
    color: "#333333 !important",
    fontFamily: "Poppins",
    fontWeight: "900",
    fontSize: "32px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px",
    },
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "168px",
    height: "auto",
    gap: "10px",
  },

  imageContainer: {
    width: "100%",
    height: "100%",
    maxHeight: "168px",
  },
  SubmitBtnBox:{
    display:'flex',
    justifyContent:'flex-end',
  },

  titlePage:{
    padding:'0 20px',
  },

  bannerbox:{
    padding:'0 20px',
  },

}));
export default function () {
  const classes = useStyles();
  const [isloading, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [countryCode, setCountryCode] = useState(profileData?.countryCode);
  const [profileImage64, setProfileImage64] = useState("");
  const [profilePicPrev, setProfilePicPrev] = useState("");
  const [profilePicError, setProfilePicError] = useState("");
  const [updatePic, setUpdatePic] = useState(false);
  const [defaultImg , setDefaultImg] =useState("images/profilePic.svg")
  const history = useHistory();

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
     
    };
  };

  const handleImageSelect = (event) => {
    const file = event[0];

    setProfileImage64(file);
  };
  const handleDeleteFirst = () => {
    setProfileImage64(""); 
  };
  var initialSchema = {
    name: profileData.name,
    mobileNumber: profileData.mobileNumber ? profileData.mobileNumber : "",
    email: profileData.email ? profileData.email : "",
    location: profileData.location ? profileData.location : "",
  };

  const getProfile = async () => {
    const res = await Axios({
      method: "GET",
      url: ApiConfig.viewMyProfile,
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    if (res.data?.responseCode == 200) {
      setProfileData(res?.data?.result);
      setProfilePicPrev(res?.data?.result?.profilePic);
    } else {
    }
  };

  // POST API
  let formData = new FormData();

  const handleFormSubmit = async (values) => {
    formData.append("name", values.name);
    formData.append("email", values.email);

    formData.append("countryCode", countryCode);

    formData.append("mobileNumber", values.mobileNumber);

    formData.append("location", values.location);
    formData.append("profilePic",profileImage64 ? profileImage64 : profilePicPrev);
    if (profileImage64 == "" && profilePicPrev == "") {
     // setProfilePicError("This Field Required");
    } else {
      setLoader(true);
      setProfilePicError("");
      try {
        const res = await Axios({
          method: "PUT",
          url: ApiConfig.updateProfile,
          headers: {
            token: localStorage.getItem("token"),
          },
          data: formData,
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          history.push("/");
          setLoader(false);
          getProfile();
        } else {
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
      }
    }
  };
  const formikRef = useRef();
  useEffect(() => {
    getProfile();
  }, []);

  const handleRemoveImage = () => {
    setProfilePicPrev("");
  };
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("name", profileData.name);
      formikRef.current.setFieldValue("email", profileData.email);
      formikRef.current.setFieldValue("mobileNumber", profileData.mobileNumber);
      formikRef.current.setFieldValue("location", profileData.location);
    }
  }, [profileData.name]);

  const handleDeleteSecond = () => {
    setProfileImage64("");
  };
  return (
    <Page title={"Settings"} className={classes.titlePage}>
      <Box className={classes.bannerbox}>
        <Formik
          onSubmit={(values) => handleFormSubmit(values)}
          initialValues={initialSchema}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          innerRef={formikRef}
          validationSchema={yep.object().shape({
            mobileNumber: yep
              .string()
              .required("Please enter your phone number")
              .max(13, "Should not exceeds 13 digits")
              .min(10, "Must be only 10 digits"),
            name: yep
              .string()
              .required("Please enter your name")
              .min(2, "Please enter at least 2 characters")
              .max(256, "You can enter only 35 characters"),
              //.matches(
                //^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
                //"Only alphabets and whitespaces are allowed for this field number are not. "
              //),
            email: yep
              .string()
              .email(
                "You have entered an invalid email address. Please try again"
              )
              .required("Please enter your email address")
              .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
            location: yep.string().required("Please enter your Location"),
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
                <Grid item xs={12} sm={12} md={12}>
                  <div
                    className={
                      profileImage64 === ""
                        ? classes.dropZoneNone
                        : classes.dropZoneArea
                    }
                  > 
                    {profilePicPrev ? (
                      <div className={classes.profileContainer}>
                        <div className={classes.imageContainer}>
                          
                          <img
                            src={profilePicPrev}
                            alt="img"
                            className={classes.prevImg}
                          />
                        </div>

                        <div className={classes.btnFlex}>
                          <Button
                            type="submit"
                            variant="contained"
                            className={classes.buttonRemove}
                            onClick={handleRemoveImage}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      updatePic === false ? (
                      <div className={classes.profileContainer}>
                         <div className={classes.imageContainer}>
                          
                           <img
                             src={defaultImg}
                             alt="img"
                             className={classes.prevImg}
                           />
                         </div>

                         <div className={classes.btnFlex}>
                           <Button
                             type="submit"
                             variant="contained"
                            className={classes.buttonRemove}
                            onClick={()=>{setUpdatePic(true)
                              setDefaultImg('')
                            }}
                           >
                            Upload
                          </Button>
                        </div>
                       </div>
                      ):(
                        <Box style={{width:'200px', height:'200px'}}>

                          <DropzoneArea
                          maxFileSize="40000000"
                          filesLimit="1"
                          className={classes.dropZoneNone}
                          acceptedFiles={["image/*"]}
                          files={profileImage64}
                          onDrop={(files) => {
                            getBase64(files[0], (result) => {
                              setProfileImage64(result);
                            });
                          }}
                          onDelete={handleDeleteSecond}
                        />
                        </Box>
                      )
                    )}
                   
                    <Typography
                      className={classes.Name}
                      style={{ color: "#333333" }}
                    >
                      {profileData.name <= 15
                        ? profileData?.name.slice(0, 16) + "..."
                        : profileData?.name}
                    </Typography>
                  </div>

                  <Box>
                    {profilePicError ? (
                      <>
                        <span style={{ color: "#f44336", fontSize: "12px" }}>
                          {profilePicError}
                        </span>{" "}
                      </>
                    ) : null}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className={classes.label}>
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    type="text"
                    placeholder="Enter your name"
                    variant="outlined"
                    fullWidth
                    id="name"
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.name}
                    name="name"
                    className={classes.textBox}
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
                        Mobile Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <PhoneInput
                      
                        placeholder="Enter mobile number"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        inputClass="custom-phone-input" 
                        error={Boolean(
                          touched.mobileNumber && errors.mobileNumber
                        )}
                        onBlur={handleBlur}
                        onChange={(phone, e) => {
                          setCountryCode(e.dialCode);
                          setFieldValue("mobileNumber", phone);
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
                        {touched.mobileNumber && errors.mobileNumber}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className={classes.label}>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    type="text"
                    placeholder="Enter your email address"
                    variant="outlined"
                    fullWidth
                    id="email "
                    size="small"
                    disabled
                    inputProps={{ maxLength: 256 }}
                    value={values.email}
                    name="email"
                    className={classes.textBox}
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

                <Grid item xs={12} md={6}>
                  <label className={classes.label}>
                    Location <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    type="text"
                    placeholder='Enter location'
                    variant="outlined"
                    fullWidth
                    id="location "
                    size="small"
                    inputProps={{ maxLength: 256 }}
                    value={values.location}
                    name="location"
                    className={classes.textBox}
                    error={Boolean(touched.location && errors.location)}
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
                    {touched.location && errors.location}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Box className={classes.SubmitBtnBox} mt={2}>
                    <Button
                      type="submit"
                      className={classes.submitButton}
                      disabled={isloading}
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
