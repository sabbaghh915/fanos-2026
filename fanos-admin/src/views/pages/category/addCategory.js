import { Typography, Box, Grid, TextField, Button, FormHelperText } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { DropzoneArea } from "material-ui-dropzone";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Axios from "axios";
import ApiConfig from "src/config/APICongig";
import { toast, ToastContainer } from "react-toastify";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

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

  dropZoneArea: {
    "& .MuiGrid-container": {
      display: "block !important"
    },
    "& .MuiGrid-grid-xs-4": {
      maxWidth: "100%"
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none"
    },
    "& .MuiDropzonePreviewList-image": {
      height: "100%",
      maxHeight:'300px'
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block"
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
      color: "#000 !important"
    }
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

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [profileImage64, setProfileImage64] = useState("");
  const [addName,setAddName]= useState("")

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const handleDeleteSecond = () => {
    setProfileImage64("");
  };
  const formInitialSchema = {
    companyname: "",
    title: "",
    description: "",
  };

  const handleBack = () => {
    history.push("/category-management");
  };

  const handleFormSubmit = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("categoryName", addName);
    formData.append("categoryImage", profileImage64);
    formData.append("categoryType", "PRODUCT");
    try {
      if (!profileImage64 || addName === "") {
        toast.error("Category Image and Name can't be empty");
      } else {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.addCategory,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: formData,
        });
        if (res.data.responseCode === 200) {
          setLoader(false);
          toast.success("Category added successfully");
          setTimeout(() => {
            history.push("/category-management");
          }, 1000);
        }  else {
          // toast.warn(res.data.message);
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      }
    }
  };

  return (
    <Page title={"Create-Roles"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Add Category</Typography>
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
                .max(25)
                .required("Please enter company name."),
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
                    <Box
                      mt={2}
                    >
                      <div
                        className={
                          profileImage64 === "" ? "" : classes.dropZoneArea
                        }
                      >
                        <DropzoneArea
                          maxFileSize="40000000"
                          filesLimit="1"
                          acceptedFiles={["image/*"]}
                          files={profileImage64}
                          onDrop={(files) =>
                            getBase64(files[0], (result) => {
                              setProfileImage64(files[0]);
                            })
                          }
                          onDelete={handleDeleteSecond}
                        />

                      </div>
                  <Box>
                    <label className={classes.label}>
                      Category Name <span className={classes.redText}>*</span>
                    </label>
                    <TextField
                      placeholder="Company Name"
                      type="text"
                      variant="outlined"
                      fullWidth
                      id="role"
                      value={addName}
                      size="small"
                      name="companyname"
                      inputProps={{ maxLength: 45 }}
                      className={`${classes.search} textFeilds`}
                      onChange={(e)=>{setAddName(e.target.value)}}
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
                  <Box mt={4}>
                    <Grid container spacing={2} style={{ alignItems: "center" }}>
                      <Grid item sm={6} xs={12} align="center">
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          className={classes.tableButton}
                          onClick={handleFormSubmit}
                        >
                          Save {loader ? <ButtonCircularProgress /> : ""}
                        </Button>
                      </Grid>
                      <Grid item sm={6} xs={12} align="center">
                        <Button
                          variant="contained"
                          fullWidth
                          style={{ background: "red" }}
                          className={classes.tableButton}
                          onClick={() => handleBack()}
                        >
                          Cancel
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
