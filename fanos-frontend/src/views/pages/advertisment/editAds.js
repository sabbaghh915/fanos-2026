import {
  Box,
  Grid,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
  Link,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { DropzoneArea } from "material-ui-dropzone";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CustomeDropzoneIcon from "src/component/customeDropzoneIcon";
import CustomeDropzoneIconSmall from "src/component/customeDropzoneIconSmall";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  mainbox: {
    paddingTop: "15px",
    paddingBottom: "95px",
  },
  bookDiv: {
    background: "#BF9C76",
    height: "348px",
    paddingLeft: "47px",
    paddingRight: "47px",
  },
  bannerImage: {
    height: "348px",
  },
  buyTicket: {
    background: "transparent",
    border: "1px solid #853600",
    borderRadius: "5px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "49px",
    color: "#843300",
  },
  mainHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "64px",
    lineHeight: "68px",
    color: "#76452C",
    paddingTop: "36px",
  },
  subHeading: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "70px",
    color: "#FFFFFF",
  },
  search: {
    fontSize: "20px",
    color: "#000",
  },
  createads: {
    color: '#8B5CF6',
    fontFamily: 'Poppins',
    fontSize: '16.183px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '10.697px',
  },
  label: {
    color: '#8B5CF6',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '125%',
  },

  buttonUpdate: {
    background: "#FF6B35",
    color: "#000",
    width: '50%',
    fontSize: '16px',
    fontWeight: '600 !important',
    marginTop: '20px',
    fontFamily: 'Poppins',
  },

  FromTable1: {

  },
  updateGrid: {
    paddingTop: "30px",
  },
  TextBox: {
    background: '#F7F8F9',
    color: '#8B5CF6 !important',
    "& .MuiInputBase-input": {
      color: "#8B5CF6 !important",

    },
    "& input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense":
    {
      color: "#8B5CF6 !important",
    },
    "& input:-webkit-autofill": {
      "-webkit-text-fill-color": "#8B5CF6 !important",
    },
    "& .name": {
      color: '#8B5CF6 !important'
    }
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
      height: "170px",
      maxHeight: "170px",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      display: "block",
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

  forminput: {
    "& .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      color: "#8B5CF6 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: '#F7F8F9',
    },
  },
  dropzonemui: {
    height: '600px',
    fontSize: "16px",
    "@media (max-width:960px)": {
      height: '300px',

    },
    "& .MuiTypography-h5": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
      },
    },
    "& .MuiDropzoneArea-root": {
      width: "100%",
      border: "1px solid #5d5656 !important",
      cursor: "pointer",
      overflow: "hidden",
      padding: "10px",
      position: "relative",
      // boxSizing: "border-box",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "100% !important",
      borderColor: "rgba(0, 0, 0, 0.12)",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },
  },

  dropzonemui1: {
    height: '100%',
    fontSize: "16px",
    "& .MuiTypography-h5": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "16px",
      },
    },
    "& .MuiDropzoneArea-root": {
      width: "100%",
      height:'100%',
      maxWidth:'173px',
      maxHeight:'153px',
      border: "1px dashed #707070 !important",
      cursor: "pointer",
      overflow: "hidden",
      padding: "10px",
      position: "relative",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: "#707070",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },

    "& .MuiDropzoneArea-text": {
      margin: '0',
      color: "#8B5CF6 !important",
      fontSize: "16px !important",
      fontWeight: "500 !important",

    },

    "& .MuiDropzoneArea-textContainer": {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },

  gridBox: {

    marginTop: "20px",

    "@media (min-width: 320px) and (max-width: 600px)": {
      width: "100%",
    },
  },
  btnFlex: {
    display: "flex",
    justifyContent: "center",
  },
  buttonRemove: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "15px",
    textAlign: "center",
    color: "#FFFFFF",
    background: "#8B5CF6",
    border: "none",
    borderRadius: "5px",
    padding: "6px",
    maxWidth: "75px",
  },
  productImg: {
    borderRadius: "20px",
    minHeight: "152px",
  },
  subProductImg: {
    height: '100%',
    objectFit: 'fill',
    width: '100%',
    borderRadius: '27px'
  },
  subImgBox: {
    display: 'flex',
    flexDirection: 'column',
    gap:'10px',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: "173px",
    maxHeight: "153px",
  },
  mainImgBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-betweem',
    maxHeight: '600px',
    gap: '15px',
    height: '100%'
  },
  formBox: {
    background: '#F5F5F5',
    padding: '20px',
    borderRadius: '6px'
  },
  icon: {
    color: '#003847 !important'
  },
  SelectCategoryItem: {
    "&.MuiMenuItem-root": {
      fontFamily: "Poppins !important",
      fontSize: "16px",
      color: "#8B5CF6",
      fontWeight: "400",
    },
  },

}));

const EditAds = function (props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [subcurrentvalue, setSubCurrentValue] = useState("");
  const [productImageFirst, setProductImageFirst] = useState(null);
  const [productImageSecond, setProductImageSecond] = useState(null);
  const [productImageThird, setProductImageThird] = useState(null);
  const [productImageFourth, setProductImageFourth] = useState(null);
  const [productImageFive, setProductImageFive] = useState(null);

  const [productImageFirstURL, setProductImageFirstURL] = useState(null);
  const [productImageSecondURL, setProductImageSecondURL] = useState(null);
  const [productImageThirdURL, setProductImageThirdURL] = useState(null);
  const [productImageFourthURL, setProductImageFourthURL] = useState(null);
  const [productImageFiveURL, setProductImageFiveURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const [subData, setSubData] = useState([]);
  const [category, setCategory] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [categoryFromProduct, setCategoryFromProduct] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [subcategoryFromProduct, setSubCategoryFromProduct] = useState("");


  useEffect(() => {
    let productImgs = props?.location?.state?.data?.productImage
      ? props?.location?.state?.data?.productImage
      : [];
    productImgs.map((value, key) => {
      return (
        <>
          {key === 0 ? setProductImageFirstURL(value) : null}
          {key === 1 ? setProductImageSecondURL(value) : null}
          {key === 2 ? setProductImageThirdURL(value) : null}
          {key === 3 ? setProductImageFourthURL(value) : null}
          {key === 4 ? setProductImageFiveURL(value) : null}
        </>
      );
    });
  }, [props?.location?.state?.data?.productImage]);



  const propsData = location.state.data._id;
  const propsName = location.state.data.productName;

  const categoryIdFromProduct = location.state.data.categoryId._id;
  const subcategoryIdFromProduct = location.state.data.subCategoryId._id;


  const propsLocation = location.state.data.location;
  const propsPrice = location.state.data.price;
  const propscurrency = location.state.data.currency;
  const propsDescription = location.state.data.description;
  const propsCategoryID = location.state.data.categoryId;
  const propssubCategoryId = location.state.data.subCategoryId;
  // eslint-disable-next-line no-unused-vars
  const propsCity = location.state.data.city;

  const handleDeleteSecond = () => {
    setProductImageSecond(""); // or setProductImageSecond('');
  };

  const handleDeleteFirst = () => {
    setProductImageFirst(null);
  };
  const handleDeleteThird = () => {
    setProductImageThird(null);
  };
  const handleDeleteFourth = () => {
    setProductImageFourth(null);
  };
  const handleDeleteFive = () => {
    setProductImageFive(null);
  };



  //this is to be done tommarrow

  let formInitialSchema; // Declare the variable before the conditional

  if (propsCategoryID && propssubCategoryId) {
    formInitialSchema = {
      name: propsName,
      description: propsDescription,
      category: categoryIdFromProduct || propsCategoryID,
      subcategory: subcategoryIdFromProduct || propssubCategoryId,
      price: propsPrice,
      currency: propscurrency,
      location: propsLocation

    };
  } else {
    formInitialSchema = {
      name: propsName,
      description: propsDescription,
      category: categoryIdFromProduct || propsCategoryID,
      subcategory: subcategoryIdFromProduct || propssubCategoryId,
      price: propsPrice,
      currency: propscurrency,
      location: propsLocation

    };
  }


  let formData = new FormData();



  const handleFormSubmit = async (values) => {
    formData.append("productId", propsData.toString());
    formData.append("productName", values.name);
    formData.append("description", values.description);
    formData.append("categoryId", values.category);
    formData.append("subCategoryId", values.subcategory);
    formData.append("price", values.price.toString());
    formData.append("currency", values.currency);
    formData.append("location", values.location);
    formData.append(
      "productImage1",
      productImageFirstURL === null ? productImageFirst : productImageFirstURL
    );
    formData.append(
      "productImage2",
      productImageSecondURL === null
        ? productImageSecond
        : productImageSecondURL
    );
    formData.append(
      "productImage3",
      productImageThirdURL === null ? productImageThird : productImageThirdURL
    );
    formData.append(
      "productImage4",
      productImageFourthURL === null
        ? productImageFourth
        : productImageFourthURL
    );
    formData.append(
      "productImage5",
      productImageFiveURL === null ? productImageFive : productImageFiveURL
    );

    if (
      (productImageFirst === undefined && productImageFirstURL === null) ===
      false &&
      (productImageSecond === undefined && productImageSecondURL === null) ===
      false &&
      (productImageThird === undefined && productImageThirdURL === null) === false
    ) {
      const token = localStorage.getItem("token");
      setLoader(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.updateProduct,
          headers: {
            token: token,
          },
          data: formData,
        });
        if (res.data.responseCode === 200) {
          setLoader(false);
          toast.success(res.data.responseMessage);
          history.push({
            pathname: "/payment-ads",
            state: { id: res.data.result._id },
          });
          localStorage.setItem("productId", res.data.result._id);
          history.push("/ads");
        } else {
          setLoader(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.responseMessage);
      }
    } else {
      toast.error("Please upload the first three images");
    }
  };

  const getCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.listCategory,
        params: {
          type: "PRODUCT",
        },
      });

      if (res.data.responseCode === 200) {
        setCategory(res.data.result.docs);

      } else {
   
      }
    } catch (error) {
 
    }
  };

  const getSubCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.subCategory,
        params: {
          categoryId: subcurrentvalue,
        },
      });

      if (res.data?.responseCode === 200) {
        setSubData(res?.data?.result?.docs);

      } else {
   
      }
    } catch (error) {
 
    }
  };
  const getcurrency = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.addProduct,
        params: {
         currency: subcurrentvalue
        },
      });

      if (res.data.responseCode === 200) {
        setSubData(res.data.result.docs);
      } else {
      }
    } catch (error) { }
  };
  const handleImageSelect = (event) => {
    const file = event[0];
    setProductImageFirst(file);
  };

  const handleImageSelectSecond = (event) => {
    const file = event[0];

    setProductImageSecond(file);
  };
  const handleImageSelectThird = (event) => {
    const file = event[0];

    setProductImageThird(file);
  };
  const handleImageSelectFourth = (event) => {
    const file = event[0];

    setProductImageFourth(file);
  };
  const handleImageSelectFive = (event) => {
    const file = event[0];
    setProductImageFive(file);
  };

  useEffect(() => {
    getSubCategory();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIdFromProduct, subcategoryIdFromProduct]);

  useEffect(() => {
    getSubCategory();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcurrentvalue, categoryIdFromProduct, subcategoryIdFromProduct]);

  useEffect(() => {
    getcurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcurrentvalue]);

  return (
    <div>
      <Page title={"home"}>
        <Box className={classes.bannerbox}>
          <Box className={classes.mainbox}>
            <Formik
              onSubmit={(values) => handleFormSubmit(values)}
              initialValues={formInitialSchema}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                name: yep.string().required("Product name is required."),
                description: yep.string().required("Description required."),
                category: yep.string().required("Category required."),
                subcategory: yep.string().required("SubCategory name is required."),
                price: yep.string().max(16).required("price required."),
                currency: yep.string().required("Currency required."),
                location: yep.string().max(16).required("location required.")

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
                  <Grid item lg={12} className={classes.createads} >
                    <Link className={classes.createads} to='/'>Home</Link> {" "}{">"}{" "}
                    Edit Ads
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      style={{ paddingTop: "30px" }}
                    >
                      <Box >
                        {" "}
                        {productImageFirstURL === null ||
                          productImageFirstURL === undefined ? (
                          <div
                            className={
                              productImageFirst === undefined
                                ? classes.dropzonemui
                                : classes.dropZoneArea
                            }
                          >
                            <DropzoneArea
                              maxFileSize="40000000"
                              className={classes.dropzonemui}
                              filesLimit="1"
                              style={{
                                marginTop: "48px",
                                marginLeft: "20px",
                              }}
                              acceptedFiles={["image/*"]}
                              onChange={(e) => handleImageSelect(e)}
                              onDelete={handleDeleteFirst}
                              Icon={CustomeDropzoneIcon}
                              dropzoneText="Upload Image"
                            />
                          </div>
                        ) : (
                          <>
                            <Box className={classes.mainImgBox}>
                              {" "}
                              <img
                                src={productImageFirstURL}
                                alt="img"
                                className={classes.productImg}
                              />
                              <div className={classes.btnFlex}>
                                <Button
                                  onClick={() => setProductImageFirstURL(null)}
                                  variant="contained"
                                  className={classes.buttonRemove}
                                // onClick={handleRemoveImage}
                                >
                                  Remove
                                </Button>
                              </div>
                            </Box>
                          </>
                        )}
                      </Box>

                      <Grid container spacing={2} className={classes.gridBox}>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                          {productImageSecondURL === null ||
                            productImageSecondURL === undefined ? (
                            <div
                              className={
                                productImageSecond === undefined
                                  ? classes.dropzonemui1
                                  : classes.dropZoneArea
                              }
                            >
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                className={classes.dropzonemui1}
                                style={{
                                  marginTop: "48px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onChange={(e) => handleImageSelectSecond(e)}
                                onDelete={handleDeleteSecond}
                                Icon={CustomeDropzoneIconSmall}
                                dropzoneText="Upload Image"


                              />
                            </div>
                          ) : (
                            <>
                              <Box className={classes.subImgBox}>
                                {" "}
                                <img
                                  src={productImageSecondURL}
                                  alt="img"
                                  className={classes.subProductImg}
                                />
                                <div className={classes.btnFlex}>
                                  <Button
                                    variant="contained"
                                    className={classes.buttonRemove}
                                    onClick={() =>
                                      setProductImageSecondURL(null)
                                    }
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Box>
                            </>
                          )}
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                          {productImageThirdURL === null ||
                            productImageThirdURL === undefined ? (
                            <div
                              className={
                                productImageThird === undefined
                                  ? classes.dropzonemui1
                                  : classes.dropZoneArea
                              }
                            >
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                className={classes.dropzonemui1}
                                style={{
                                  marginTop: "48px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onChange={(e) => handleImageSelectThird(e)}
                                onDelete={handleDeleteThird}
                                Icon={CustomeDropzoneIconSmall}
                                dropzoneText="Upload Image"
                              />
                            </div>
                          ) : (
                            <>
                              {" "}
                              <Box className={classes.subImgBox}>
                                {" "}
                                <img
                                  src={productImageThirdURL}
                                  alt="img"
                                  className={classes.subProductImg}
                                />
                                <div className={classes.btnFlex}>
                                  <Button
                                    onClick={() =>
                                      setProductImageThirdURL(null)
                                    }
                                    variant="contained"
                                    className={classes.buttonRemove}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Box>
                            </>
                          )}
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                          {productImageFourthURL === null ||
                            productImageFourthURL === undefined ? (
                            <div
                              className={
                                productImageFourth === undefined
                                  ? classes.dropzonemui1
                                  : classes.dropZoneArea
                              }
                            >
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                className={classes.dropzonemui1}
                                style={{
                                  marginTop: "48px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onChange={(e) => handleImageSelectFourth(e)}
                                onDelete={handleDeleteFourth}
                                Icon={CustomeDropzoneIconSmall}
                                dropzoneText="Upload Image"
                              />
                            </div>
                          ) : (
                            <>
                              <Box className={classes.subImgBox}>
                                <img
                                  src={productImageFourthURL}
                                  alt="img"
                                  className={classes.subProductImg}
                                />
                                <div className={classes.btnFlex}>
                                  <Button
                                    onClick={() =>
                                      setProductImageFourthURL(null)
                                    }
                                    variant="contained"
                                    className={classes.buttonRemove}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Box>
                            </>
                          )}
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} xs={6}>
                          {productImageFiveURL === null ||
                            productImageFiveURL === undefined ? (
                            <div
                              className={
                                productImageFive === undefined
                                  ? classes.dropzonemui1
                                  : classes.dropZoneArea
                              }
                            >
                              <DropzoneArea
                                maxFileSize="40000000"
                                filesLimit="1"
                                className={classes.dropzonemui1}
                                style={{
                                  marginTop: "48px",
                                  marginLeft: "20px",
                                }}
                                acceptedFiles={["image/*"]}
                                onChange={(e) => handleImageSelectFive(e)}
                                onDelete={handleDeleteFive}
                                Icon={CustomeDropzoneIconSmall}
                                dropzoneText="Upload Image"
                              />
                            </div>
                          ) : (
                            <Box className={classes.subImgBox}>
                              <img
                                src={productImageFiveURL}
                                alt="img"
                                className={classes.subProductImg}
                              />
                              <div className={classes.btnFlex}>
                                <Button
                                  variant="contained"
                                  className={classes.buttonRemove}
                                  onClick={() => setProductImageFiveURL(null)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </Box>
                          )}
                        </Grid>
                      </Grid>

                      <Grid container className={classes.gridBox}>

                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      style={{ paddingTop: "30px" }}
                    >
                      <Box className={classes.formBox}>
                        <Box className={classes.FromTable1}>
                          <label className={classes.label}>Select Category <span style={{ color: 'red' }}>*</span>
                          </label>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.forminput}
                          >
                            <Select
                              margin="dense"
                              id="category"
                              name="category"
                              className={classes.SelectCategory}
                              inputProps={{
                                classes: {
                                  icon: classes.icon,
                                },
                              }}
                              placeholder={propsCategoryID}
                              onChange={handleChange}
                              value={values.category}
                              onBlur={() => {
                                setSubCurrentValue(values.category);
                              }}
                              onFocus={() => {
                                setSubCurrentValue(values.category);
                              }}
                            >
                              {category.map((values) => {
                                return (
                                  <MenuItem
                                    className={classes.SelectCategoryItem}
                                    value={values._id}
                                    key={values._id}
                                  >
                                    {values.categoryName.length > 50
                                      ? values?.categoryName.slice(0, 50) + "..."
                                      : values?.categoryName}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                            <FormHelperText
                              error
                              style={{ fontSize: "12px", fontFamily: "Poppins" }}
                            >
                              {touched.category && errors.category}
                            </FormHelperText>
                          </FormControl>
                        </Box>

                        <Grid item xs={12}>
                          <Box className={classes.FromTable1}>
                            <label className={classes.label}>
                              Select Sub-Category<span style={{ color: 'red' }}>*</span>
                            </label>
                            <FormControl
                              variant="outlined"
                              fullWidth
                              className={classes.forminput}
                            >
                              <Select
                                margin="dense"
                                name="subcategory"
                                id="subcategory"
                                className={classes.SelectCategory}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                  },
                                }}
                                onChange={handleChange}
                                value={values.subcategory}
                                onBlur={handleBlur}
                              >
                                {subData.map((values) => {
                                  return (
                                    <MenuItem
                                      value={values._id}
                                      key={values._id}
                                      className={classes.SelectCategoryItem}
                                    >
                                      {values.subCategoryName > 50
                                        ? values.subCategoryName.slice(0, 50) +
                                        "..."
                                        : values.subCategoryName}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <FormHelperText
                                error
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {touched.subcategory && errors.subcategory}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>Product Name <span style={{ color: 'red' }}>*</span></label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth

                            size="small"
                            inputProps={{ maxLength: 256 }}
                            value={values.name}
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
                            style={{ fontSize: "12px", fontFamily: "Poppins" }}
                          >
                            {touched.name && errors.name}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12} lg={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>Description <span style={{ color: 'red' }}>*</span></label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            id="description"
                            size="small"
                            multiline
                            rows={3}
                            inputProps={{ maxLength: 3000 }}
                            value={values.description}
                            name="description"
                            className="textFeilds"

                            error={Boolean(
                              touched.description && errors.description
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            InputProps={{
                              className: classes.TextBox,
                              style: { padding: '0px' },
                            }}
                          />
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", fontFamily: "Poppins" }}
                          >
                            {touched.description && errors.description}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12} lg={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>Price <span style={{ color: 'red' }}>*</span></label>
                          <TextField
                            variant="outlined"
                            type="number"
                            fullWidth
                            id="price"
                            size="small"
                            inputProps={{
                              max: 20000,
                              step: 0.01,
                            }}
                            value={values.price}
                            name="price"
                            className="textFields"
                            error={Boolean(touched.price && errors.price)}
                            onBlur={handleBlur}
                            onChange={(event) => {
                              const enteredPrice = event.target.value;
                              const cleanedPrice = enteredPrice
                                .replace(/[^0-9.]/g, "")
                                .slice(0, 5);
                              handleChange({
                                target: {
                                  value: cleanedPrice,
                                  name: "price",
                                },
                              });
                            }}
                            InputProps={{
                              className: classes.TextBox,
                            }}
                          />
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", fontFamily: "Poppins" }}
                          >
                            {touched.price && errors.price}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12}>
                          <Box className={classes.FromTable1}>
                            <label className={classes.label}>
                            currency{" "}
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

                        <Grid item xs={12} lg={12} style={{ paddingTop: "10px" }}>
                          <label className={classes.label}>Location <span style={{ color: 'red' }}>*</span></label>
                          <TextField
                            type="text"
                            variant="outlined"
                            fullWidth
                            id="location"
                            size="small"
                            inputProps={{ maxLength: 16 }}
                            value={values.location}
                            name="location"
                            className="textFeilds"
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


                        <Grid lg={12} md={12} sm={12} xs={12} align='end'>
                          <Button
                            className={classes.buttonUpdate}
                            type="submit"
                            disabled={loader}
                          >
                            Update
                            {loader && <ButtonCircularProgress />}
                          </Button>
                        </Grid>
                      </Box>
                    </Grid>

                  </Grid>

                  <Grid className={classes.updateGrid}>

                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Page>
    </div >
  );
};

export default EditAds;
