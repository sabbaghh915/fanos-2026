
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
    height: "57px",
    marginTop: "8px",
    maxWidth: "200px",
    width: "100%",
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
    gap: "20px",
  },
  search: {
    backgroundColor: "transparent",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c4c4c4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c4c4c4",
      },
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [id, setId] = useState(props?.location?.state);
  const [editCategoryName, seteditCategoryName] = useState("");
  const [editCategoryImage, seteditCategoryImage] = useState(null);
  const [productImageSecond, setProductImageSecond] = useState(null);
  const [categoryName, setCategoryName] = useState("");

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
    setProductImageSecond("");
  };

  const formInitialSchema = {
    Type: "",
    Name: "",
  };

  const RoutBack = () => {
    history.push("/category-management");
  };

  const getUserById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewCategory,
        headers: {
          token: token,
        },
        params: {
          categoryId: id,
        },
      });

      if (res.data.responseCode === 200) {
        setId(id);
        const name = res?.data?.result?.categoryName;
        const image = res?.data?.result?.categoryImage;
        seteditCategoryName(name);
        seteditCategoryImage(image);
        setProductImageSecond(image);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserById(id);
  }, []);

  const handleRemove = () => {
    seteditCategoryImage("");
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("categoryId", id);
    formData.append("categoryImage", productImageSecond);
    formData.append("categoryName", categoryName);

    if (productImageSecond == null || categoryName == "") {
      toast.error("Category Image and Name can't be empty");
      setIsLoading(false);
    } else {
      try {
        setIsLoading(false);
        const res = await Axios({
          method: "PUT",
          url: ApiConfig.updateCategory,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: formData,
        });

        if (res.data.responseCode === 200) {
          setHistoryData(res.data.result);
          setIsLoading(false);
          toast.success("Category successfully edited");
          history.push("/category-management");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Page title={"Dashboard"}>
      <Box className={classes.bannerbox}>
        <Box className={classes.mainbox}>
          <Grid container item xs={12} className="d-flex justify-space-between">
            <Typography variant="h4">Edit Category</Typography>
          </Grid>
          <Formik
            onSubmit={(values) => handleFormSubmit(values)}
            initialValues={formInitialSchema}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yup.object().shape({
              categoryName: yup
                .string()
                .required("Please enter description")
                .max(30, "Category Name must not exceed 30 character"),
            })}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              values,
              setFieldValue,
            }) => (
              <form
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Box>
                  <Grid container item xs={12}>
                    <Grid item xs={12}>
                      <div>
                        <div
                          className={
                            productImageSecond === "" || productImageSecond == null ? null
                              : classes.dropZoneArea
                          }
                        >
                          {editCategoryImage ? (
                            <div
                              style={{
                                display: "grid",
                                justifyContent: "center",
                                paddingTop: "20px",
                                gap:"15px"
                              }}
                            >
                              <img
                                src={editCategoryImage}
                                style={{
                                  maxWidth: "400px",
                                  maxHeight: "300px",
                                }}
                              />

                              <Button
                                type="submit"
                                variant="contained"
                                className={classes.buttonRemove}
                                onClick={()=>{seteditCategoryImage(null)}}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <DropzoneArea
                              maxFileSize="40000000"
                              filesLimit="1"
                              acceptedFiles={["image/*"]}
                              files={productImageSecond}
                              onDrop={(files) => {
                                getBase64(files[0], (result) => {
                                  setProductImageSecond(files[0]);
                                });
                              }}
                              onDelete={handleDeleteSecond}
                            />
                          )}
                        </div>
                      </div>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{ marginBottom: "10px", marginTop: ".5rem" }}
                    >
                      <label className={classes.label}>
                        Category Name:{" "}
                        <span className={classes.redText}>*</span>
                      </label>
                      <div className={classes.inputDiv}>
                        <input
                          placeholder={
                            editCategoryName
                              ? editCategoryName
                              : "Enter Category Name"
                          }
                          value={categoryName}
                          className={`${classes.TextBox} ${classes.search}`}
                          maxLength={36}
                          varient="outlined"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setCategoryName(e.target.value);
                          }}
                        />
                      </div>
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", fontFamily: "Poppins" }}
                      >
                        {touched.categoryName && errors.categoryName}
                      </FormHelperText>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      align="center"
                      className={classes.gridBtn}
                    >
                      {" "}
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleFormSubmit}
                        className={classes.buttonbox}
                      >
                        Update {isLoading ? <ButtonCircularProgress /> : ""}
                      </Button>{" "}
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={RoutBack}
                        className={classes.buttonbox}
                      >
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Page>
  );
}
