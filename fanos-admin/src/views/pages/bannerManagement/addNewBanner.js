import { Typography, Box, Grid, TextField, Button, FormHelperText } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer, } from "react-toastify";
import * as yep from "yup";

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
  outerGrid: {
    border: "1px solid #333",
    padding: "2rem",
    borderRadius: "10px",
  },
  buttonbox: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "22px",
    //textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "30%",
    height: "57px",
    marginTop: "24px",
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
  colorbox1: {
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
      height: "100%",
      maxHeight:'300px'
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
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [roleId, setRoleId] = useState({});
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [loader, setLoader] = useState(false);
  const [profileImage64, setProfileImage64] = useState();
  const [profileImage, setProfileImage] = useState(null);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };

    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };                                   ///

  const formInitialSchema = {
    title: "",
    text: "",
    description: "",
  };

  const handleBack = () => {
    history.push("/banner-management");
  };
  let formData = new FormData();

  const handleFormSubmit = async (values) => {
    setLoader(true);
    formData.append('img', profileImage);
    try {
      console.log("ProfileImage64", profileImage64);
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addBanner,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: formData,
      });                         

      if (res.data.responseCode === 200) {
        setLoader(false);
        toast.success(res.data.responseMessage);
        history.push("/banner-management");
      } else if (res.data.responseCode === 500) {
        setLoader(false);
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

  const handleImageSelect = (event) => {
    console.log(event[0])
    const file = event[0];
    setProfileImage(file);
  };
  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Add New Banner</Typography>
          </Grid>

          <Box>
            <Grid item xs={12} className={classes.outerGrid}>
              <Grid item xs={12} className={classes.colorbox}>
                <Box
                  mt={2}
                  className={
                    profileImage == null ? classes.colorbox : classes.colorbox1
                  }
                >
                  <DropzoneArea
                    id="profileImage"
                    maxFileSize="40000000"
                    files={profileImage64}
                    filesLimit="1"
                    style={{
                      marginTop: "-78px",
                      marginLeft: "20px",
                    }}
                    acceptedFiles={["image/*"]}
                    // onDrop={(files) =>
                    //   getBase64(files[0], (result) => {
                    //     console.log(result, "result");
                    //     setProfileImage64(result);
                    //   })
                    // }
                    onChange={(event) =>
                      handleImageSelect(event)
                    }
                  />
                </Box>
              </Grid>
              <Box style={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}>
                <Button
                  type="submit"
                  className={classes.buttonbox}
                  onClick={() => handleFormSubmit()}
                >
                  SAVE
                </Button>


                <Button
                  variant="contained"
                  fullWidth
                  className={classes.buttonbox}
                  onClick={() => handleBack()}
                >
                  Back
                </Button>
              </Box>

            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
