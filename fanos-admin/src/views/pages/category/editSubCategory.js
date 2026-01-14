  import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { Link, useHistory, useLocation } from "react-router-dom";
import { url } from "../../../config/APICongig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Axios from "axios";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import ApiConfig from "src/config/APICongig";
import { DropzoneArea } from "material-ui-dropzone";
import { Category } from "@material-ui/icons";
// import the required components and modules here
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  TextBox: {
    borderRadius: "10px",
    height: "47px",
    background: theme.palette.background.taf,
    padding: "0px 11px",
    width: "50%",
    border: "1px solid #413b3b",
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
  buttonbox: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    background: "#0C576C",
    borderRadius: "10px",
    width: "50%",
    height: "57px",
    marginTop: "8px",
  },
  dropZoneArea: {
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
      maxHeight: "300px",
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
  buttonRemove: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "15px",
    textAlign: "center",
    color: "#FFFFFF",
    background: "#0C576C",
  },

  inputDiv: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    marginBottom: "5px",
  },
  redText: {
    color: "#ff3e3e",
  },
  gridBtn: {
    display: "flex",
    justifyContent: "center",
  },
}));

const EditSubCategory = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(props?.location?.state.id);
  const [categoryID, setcategoryID] = useState(
    props?.location?.state?.categoryID
  );
  const [categoryName, setcategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [subCategoryimage, setSubCategoryImage] = useState(null);
  const [editCategoryName, seteditCategoryName] = useState("");

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

  const RoutBack = () => {
    history.push("/sub-category-management");
  };
  const getSubCategoryById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.subCategoryDetails,
        headers: {
          token: token,
        },
        params: {
          subCategoryId: id,
        },
      });
      if (res.data.responseCode === 200) {
        setId(id);
        const name = res?.data?.result?.subCategoryName;
        const image = res?.data?.result?.subCategoryImage;
        seteditCategoryName(name);
        setImage(image);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getSubCategoryById(id);
  }, []);

  let formData = new FormData();

  const handleFormSubmit = async () => {
    setLoader(true);
    formData.append("subCategoryId", id);
  
    // Check if a new image is selected
    if (subCategoryimage) {
      formData.append("subCategoryImage", subCategoryimage);
    }
    formData.append("subCategoryName", editCategoryName);
  
    if (editCategoryName === "") {
      toast.error("Please enter the subcategory name.");
      setLoader(false);
    } else {
      try {
        const res = await Axios({
          method: "PUT",
          url: ApiConfig.updateSubCategory,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: formData,
        });
        if (res.data.responseCode === 200) {
          setLoader(false);
          toast.success("Category successfully edited");
          history.push("/sub-category-management");
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  };
  
  //

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container className="d-flex justify-space-between">
            <Typography variant="h4">Edit SubCategory</Typography>
          </Grid>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <div>
                  <div
                    className={
                      subCategoryimage == null || subCategoryimage == ""  ? null : classes.dropZoneArea
                    }
                  >
                    {!image && (
                      <DropzoneArea
                        maxFileSize="40000000"
                        filesLimit="1"
                        acceptedFiles={["image/*"]}
                        file={subCategoryimage}
                        onDrop={(files) =>
                          getBase64(files[0], (result) => {
                            setSubCategoryImage(files[0]);
                          })
                        }
                        onDelete={()=>{
                          setSubCategoryImage(null)
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      paddingTop: "20px",
                    }}
                  >
                    {image && (
                      <div className="image-preview">
                        <img
                          style={{
                            maxWidth: "400px",
                            maxHeight: "300px",
                          }}
                          src={image}
                          alt="Selected"
                        />
                      </div>
                    )}
                    {image && (
                      <>
                        <div>
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            className={classes.buttonRemove}
                            onClick={() => setImage(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Grid item style={{ marginBottom: "10px", marginTop: ".5rem" }}>
                  <label className={classes.label}>
                    Sub Category Name:
                    <span className={classes.redText}>*</span>
                  </label>
                  <div className={classes.inputDiv}>
                    <input
                      placeholder={
                        editCategoryName
                          ? editCategoryName
                          : "Enter Category Name"
                      }
                      value={editCategoryName}
                      className={classes.TextBox}
                      name="categoryName"
                      maxLength={36}
                      onChange={(e) => seteditCategoryName(e.target.value)}
                    />
                  </div>
                </Grid>

                <Grid align="center" className={classes.gridBtn}>
                  <Grid item xs={3} md={3} align="center">
                    {" "}
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleFormSubmit()}
                      className={classes.buttonbox}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item xs={3} md={3} align="center">
                    {" "}
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={RoutBack}
                      fullWidth
                      className={classes.buttonbox}
                    >
                      Back
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default EditSubCategory;
